'use client';
import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useWatchContractEvent, usePublicClient, useChainId } from 'wagmi';
import { getContract } from 'viem';
import { config } from '@/config/wallet-config';
import { TOKEN_ADDRESS } from '@/config/const';
import { myTokenAbi } from '@/lib/abi';

import { Loading } from '@/components/loading-icon';
import { NFTImage } from '@/components/nft-image';
import { Dialog, DialogContent } from '@/components/ui/dialog';
export interface NFTInfo {
  image: string;
  name: string;
}
interface MintProcessModalProps {
  transactionHash: `0x${string}` | undefined;
  onClose?: () => void;
}

export const MintProcessModal: React.FC<MintProcessModalProps> = ({
  transactionHash,
  onClose,
}) => {
  const [tokenId, setTokenId] = useState<bigint | undefined>(undefined);
  const [image, setImage] = useState<string>('');
  const chainId = useChainId();
  const publicClient = usePublicClient({
    config: config,
    chainId: chainId as any,
  });
  const contract = getContract({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    client: {
      public: publicClient,
    },
  });

  /**
   * 监听铸造函数的事件
   */
  useWatchContractEvent({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    eventName: 'Transfer',
    onLogs(logs) {
      console.log(logs, 'Transfer');
      if (logs && transactionHash && logs.length > 0) {
        const { transactionHash: logTransactionHash, args } = logs[0];
        if (transactionHash === logTransactionHash) {
          setTokenId(args.tokenId);
        }
      }
    },
  });

  /**
   * 监听 MetadataUpdate 事件
   */
  useWatchContractEvent({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    eventName: 'MetadataUpdate',
    onLogs: (logs) => {
      console.log(logs, 'MetadataUpdate');
      if (logs && logs.length > 0) {
        const { args } = logs[0];
        if (args._tokenId === tokenId) {
          onFinally();
        }
      }
    },
  });

  const onFinally = async () => {
    const URI: string = await getURI(tokenId!);
    const info: NFTInfo = await fetchURI(URI);
    console.log(info, 'info');
    setImage(info.image);
  };

  /**
   * 获取URI
   */
  const getURI = async (id: bigint): Promise<string> => {
    const URI = await contract.read.tokenURI([id]);
    return URI;
  };

  /**
   * 获取NFT信息
   * @param URI
   * @returns
   */
  const fetchURI = async (URI: string): Promise<any> => {
    const data = await fetch(URI);
    return data.json();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      {!image ? (
        <DialogContent className="flex items-center justify-center sm:max-w-[425px] h-48">
          <Loading />
        </DialogContent>
      ) : (
        <DialogContent>
          <NFTImage image={image} name={'NFT'} />
        </DialogContent>
      )}
    </Dialog>
  );
};
