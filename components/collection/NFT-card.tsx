'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useChainId, usePublicClient } from 'wagmi';
import { config } from '@/config/wallet-config';
import { getContract } from 'viem';
import { myTokenAbi } from '@/lib/abi';
import { NFTImage } from '@/components/nft-image';

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
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
    setNftInfo(NFTData);
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
        <NFTImage
          image={nftInfo?.image}
          name={nftInfo?.name}
          style={{
            transition: 'transform 0.5s ease-in-out',
          }}
          className="hover:-translate-y-4"
        />
      </CardContent>
      <CardFooter className="p-0 mt-2 text-center flex">
        {nftInfo?.name}
      </CardFooter>
    </Card>
  );
};
