'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { useAccount, useChainId, usePublicClient } from 'wagmi';
import { config } from '@/config/wallet-config';
import { getContract } from 'viem';
import { myTokenAbi } from '@/lib/abi';
import { TOKEN_ADDRESS } from '@/config/const';
import { Loading } from '@/components/loading-icon';
export interface Attribute {
  trait_type: string;
  value: string;
}
export interface NFTInfo {
  attributes: Attribute[];
  description: string;
  image: string;
  name: string;
}
interface NFTCardProps {
  tokenId: bigint;
}
export const NFTCard: React.FC<NFTCardProps> = ({ tokenId }) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [nftInfo, setNftInfo] = useState<NFTInfo | null>(null);
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
    if (tokenId !== undefined) {
      initData();
    }
  }, [tokenId]);

  const initData = async () => {
    const URI = await readNFTInfo(tokenId);
    const NFTData = await fetchURI(URI);
    console.log(NFTData, 'NFTData');
    setNftInfo(NFTData);
    setLoading(false);
  };

  const readNFTInfo = async (id: bigint): Promise<string> => {
    const URI = await contract.read.tokenURI([id]);
    return URI;
  };

  const fetchURI = async (URI: string): Promise<any> => {
    const data = await fetch(URI);

    return data.json();
  };

  return (
    <Card className="relative">
      <CardContent className="p-0">
        <AspectRatio ratio={9 / 9} className="bg-muted">
          {loading ? (
            <div className="absoult w-full h-full flex items-center justify-center">
              <Loading />
            </div>
          ) : (
            <img
              src={nftInfo?.image || ''}
              alt={nftInfo?.name || ''}
              style={{
                transition: 'transform 0.5s ease-in-out',
              }}
              className="hover:-translate-y-4"
            />
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex"></CardFooter>
    </Card>
  );
};
