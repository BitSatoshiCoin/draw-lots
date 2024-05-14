'use client';
import { Button } from '@/components/ui/button';
import { getContract } from 'viem';
import {
  usePublicClient,
  useWalletClient,
  useAccount,
  useConnectors,
} from 'wagmi';
import { TOKEN_ADDRESS } from '@/config/const';
import { myTokenAbi } from '@/lib/abi';
import { useChainId, useClient } from 'wagmi';
import { getPublicClient, getChainId } from '@wagmi/core';
import { config } from '@/config/wallet-config';
import { useConnections } from 'wagmi';
export default function Page() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { data: walletClient } = useWalletClient({
    config,
    chainId: chainId as any,
  });
  // const client = usePublicClient({
  //   config,
  //   chainId: chainId as any,
  // });
  const client = getPublicClient(config, {
    chainId: chainId as any,
  });

  const contract = getContract({
    address: TOKEN_ADDRESS,
    abi: myTokenAbi,
    // 1a. Insert a single client

    client: {
      public: client,
      wallet: walletClient,
    },
  });

  const handleClick = async () => {
    contract.write.safeMint([address as `0x${string}`]);
    // const res = await contract.read.hasEnoughPointsToMint([
    //   address as `0x${string}`,
    // ]);

    // console.log(res, 'res');
  };
  return <Button onClick={handleClick}>测试</Button>;
}
