'use client';
import React, { useEffect, useState } from 'react';

import './style.css';
import { cn } from '@/lib/utils';
import { TOKEN_ADDRESS } from '@/config/const';
import { getContract } from 'viem';
import { myTokenAbi } from '@/lib/abi';
import { config } from '@/config/wallet-config';
import {
  useAccount,
  usePublicClient,
  useWalletClient,
  useChainId,
} from 'wagmi';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PointsDeficiencyModal } from './points-deficiency-modal';
import { ConnectWalletModal } from './connect-wallet-modal';
import { MintProcessModal } from './mint-process-modal';

interface RequestSignatureProps {}
export const RequestSignature: React.FC<RequestSignatureProps> = () => {
  const chainId = useChainId();
  const publicClient = usePublicClient({
    config,
    chainId: chainId as any,
  });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [animation, setAnimation] = useState(false);
  const [lastTokenId, setLastTokenId] = useState<bigint | undefined>(undefined);
  const [pointsDeficitModal, setPointsDeficitModal] = useState(false);
  const [coonecyWalletModal, setCoonecyWalletModal] = useState(false);
  const contract = getContract({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    client: { public: publicClient, wallet: walletClient },
  });
  const handlerClick = async () => {
    setLastTokenId(BigInt(2));
    return;
    if (!address) {
      // 提示先连接钱包
      setCoonecyWalletModal(true);
      return;
    }

    // 调用判断积分是否足够函数
    const isEnough = await checkEnoughPoints();
    if (!isEnough) {
      // 提示积分不足
      setPointsDeficitModal(true);
      return false;
    }
    startAnimation();

    try {
      // 创建NFT
      await createNFTRequest();

      // 获取最后一个tokenId
      const tokenId = await getLastTokenid();
      setLastTokenId(tokenId);
      finishAnimation();
    } catch (error) {
      console.log(error, 'errorerror');
      finishAnimation();
      return;
    }
  };

  /**
   * 开始抽签动画
   * @returns
   */
  const startAnimation = () => {
    if (animation) {
      return;
    }
    setAnimation(true);
  };

  /**
   * 结束抽签动画
   */
  const finishAnimation = () => {
    setAnimation(false);
  };

  /**
   * 检查积分是否足够
   * @returns
   */
  const checkEnoughPoints = async (): Promise<boolean> => {
    const res = await contract.read.hasEnoughPointsToMint([
      address as `0x${string}`,
    ]);
    return res;
  };

  /**
   * 铸造NFT
   * @returns
   */

  const createNFTRequest = async () => {
    const res = await (contract as any).write.safeMint([
      address as `0x${string}`,
    ]);
    console.log(res, '铸造函数返回值');
    return res;
  };

  /**
   * 获取当前用户最后一个tokenid
   */
  const getLastTokenid = async (): Promise<bigint> => {
    const tokenids: readonly bigint[] = await queryAllTokendis();
    console.log(tokenids, '获取到的所有tokens');
    if (!tokenids || tokenids.length == 0) {
      throw new Error('not had tokenId');
    }
    return tokenids[tokenids.length - 1];
  };

  /**
   * 获取当前用户所有的tokenids
   * @returns tokenids
   */
  const queryAllTokendis = async (): Promise<readonly bigint[]> => {
    const data = await contract.read.tokensOfOwner([address as `0x${string}`]);
    return data ? data : [];
  };
  return (
    <>
      <Card className="w-full">
        <CardContent className="flex justify-center p-0">
          <AspectRatio ratio={9 / 18} className="relative bg-muted">
            <Image src="/images/bg_1080_1920.jpg" alt="bg" fill />
            {/* 签筒图片 */}
            <div className="absolute bottom-44 left-1/2 -translate-x-1/2">
              <Image
                src="/images/qiantong.png"
                alt="bg"
                width={40}
                height={40}
                className={cn({
                  'shake-animation': animation,
                })}
              />
            </div>
            {/* 立即抽签按钮 */}
            <Button
              className="bg-transparent hover:bg-transparent absolute bottom-28 left-1/2 -translate-x-1/2 w-52"
              onClick={handlerClick}
            ></Button>
          </AspectRatio>
        </CardContent>
      </Card>
      <PointsDeficiencyModal
        isOpen={pointsDeficitModal}
        onOpenChange={() => {
          setPointsDeficitModal(!pointsDeficitModal);
        }}
      />
      <ConnectWalletModal
        isOpen={coonecyWalletModal}
        onOpenChange={() => {
          setCoonecyWalletModal(!coonecyWalletModal);
        }}
      ></ConnectWalletModal>

      <MintProcessModal tokenId={lastTokenId} />
    </>
  );
};
