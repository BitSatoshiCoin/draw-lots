'use client';
import { useEffect, useState } from 'react';
import { NFTCard } from '@/components/collection/NFT-card';
import { useAccount, useChainId, usePublicClient } from 'wagmi';
import { config } from '@/config/wallet-config';
import { getContract } from 'viem';
import { myTokenAbi } from '@/lib/abi';

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
export default function Page() {
  const [tokenIds, setTokendIds] = useState<readonly bigint[]>([]);
  const { address } = useAccount();
  const chainId = useChainId();
  const publicClient = usePublicClient({
    config,
    chainId: chainId as any,
  });
  const contract = getContract({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    client: {
      public: publicClient,
    },
  });

  useEffect(() => {
    if (!address) {
      setTokendIds([]);
    } else {
      // 获取页面展示的数据
      initData();
    }
  }, [address]);

  /**
   * 获取页面展示的数据
   */
  const initData = async () => {
    // 获取所有的tokenid
    const tokenIds = await queryAllTokendIds();
    setTokendIds(tokenIds);
  };

  /**
   * 获取当前用户所有的tokenids
   * @returns tokenids
   */
  const queryAllTokendIds = async (): Promise<readonly bigint[]> => {
    const data = await contract.read.tokensOfOwner([address as `0x${string}`]);
    return data ? data : [];
  };
  return (
    <div className="m-auto w-4/5 grid gap-x-8 gap-y-8 grid-cols-4">
      {tokenIds.map((tokenId, index) => {
        return <NFTCard key={index} tokenId={tokenId} />;
      })}
    </div>
  );
}
