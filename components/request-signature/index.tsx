'use client';
import React, { useState } from 'react';
import './style.css';
import { cn } from '@/lib/utils';
import { getContract, Client } from 'viem';
import { myTokenAbi } from '@/lib/abi';
import { useAccount, useWalletClient, useChainId, useClient } from 'wagmi';

import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { PointsDeficiencyModal } from './points-deficiency-modal';
import { ConnectWalletModal } from './connect-wallet-modal';
import { MintProcessModal } from './mint-process-modal';

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
interface RequestSignatureProps {}
export const RequestSignature: React.FC<RequestSignatureProps> = () => {
  const chainId = useChainId();
  const client = useClient({
    chainId: chainId as any,
  });
  const { data: walletClient } = useWalletClient();
  const { address } = useAccount();
  const [animation, setAnimation] = useState(false);
  const [transactionHash, setTransactionHash] = useState<
    `0x${string}` | undefined
  >(undefined);
  const [mintProcessModal, setMintProcessModal] = useState(false);
  const [pointsDeficitModal, setPointsDeficitModal] = useState(false);
  const [coonectWalletModal, setCoonectWalletModal] = useState(false);
  const contract = getContract({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    client: { public: client as Client, wallet: walletClient },
  });

  /**
   * 抽签函数
   * @returns
   */
  const handlerClick = async () => {
    // setLastTokenId(lastTokenId ? BigInt(Number(lastTokenId) + 1) : BigInt(1));
    // setMintProcessModal(true);
    // return;
    /**
     * 1. 检查是否连接钱包
     * 2、检查积分是否足够
     * 3、开始动画
     * 4、创建NFT后打开创建进度弹窗
     */
    if (!address) return setCoonectWalletModal(true);
    if (!(await checkEnoughPoints())) return setPointsDeficitModal(true);
    startAnimation();
    try {
      const hash = await createNFTRequest();
      setTransactionHash(hash);
      setMintProcessModal(true);
      finishAnimation();
    } catch (error) {
      console.log(error, 'errorerror');
      finishAnimation();
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

  const createNFTRequest = async (): Promise<`0x${string}`> => {
    return await (contract as any).write.safeMint([address as `0x${string}`]);
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
        isOpen={coonectWalletModal}
        onOpenChange={() => {
          setCoonectWalletModal(!coonectWalletModal);
        }}
      ></ConnectWalletModal>

      {mintProcessModal && (
        <MintProcessModal
          transactionHash={transactionHash}
          onClose={() => {
            setMintProcessModal(false);
          }}
        />
      )}
    </>
  );
};
