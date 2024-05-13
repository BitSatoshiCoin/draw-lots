'use client';
import React, { useRef, useState } from 'react';
import { useReadContract, useWriteContract, useAccount } from 'wagmi';
import { myTokenAbi } from '@/lib/abi';
import clsx from 'clsx';
import './style.css';
import { TOKEN_ADDRESS } from '@/config/const';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

import { MintResult } from './mint-result';
import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';
const myTokenAddress = '0x6b41ab968a53520741ea6f55c83d66caa1352f4b';

interface RequestSignatureProps {}
export const RequestSignature: React.FC<RequestSignatureProps> = () => {
  const account = useAccount();
  const [animation, setAnimation] = useState(false);
  const [openMintResult, setOpenMintResult] = useState(false);
  const { writeContract, status } = useWriteContract();
  const result = useReadContract({
    abi: myTokenAbi,
    address: myTokenAddress,
    functionName: 'balanceOf',
    args: ['0x81E46565B14bC51B1084F9021518Ee2D32837BBa' as `0x${string}`],
  });

  const handlerClick = async () => {
    // await startAnimation();
    // setOpenMintResult(true);
    createNFTRequest();
  };

  // 开始抽签动画
  const startAnimation = () => {
    return new Promise((resolve, reject) => {
      if (animation) {
        reject(false);
      }
      setAnimation(true);
      setTimeout(() => {
        setAnimation(false);
        resolve(true);
      }, 3000);
    });
  };

  // 发送生成NFT请求功能
  const createNFTRequest = () => {
    const { address } = account;
    if (!address) return;
    writeContract(
      {
        abi: myTokenAbi,
        address: myTokenAddress,
        functionName: 'safeMint',
        args: [],
      },
      {
        onSuccess(data) {
          console.log(data, 'data-suceess');
        },
        onError(error) {
          console.log(error, 'error');
        },
        onSettled(data) {
          console.log(data, 'data');
        },
      }
    );
  };

  const query = () => {
    console.log(result);
  };
  return (
    <>
      <Card className="w-full">
        <CardContent className="flex justify-center p-0">
          <AspectRatio ratio={9 / 18} className="bg-muted bg-white">
            <Image
              src="/images/bg_1080_1920.jpg"
              alt="bg"
              fill
              className="rounded-md"
            />
          </AspectRatio>
        </CardContent>
        {/* <CardFooter>
          {status == 'pending' ? (
            <Button disabled>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button className="w-full" onClick={handlerClick}>
              求灵签
            </Button>
          )}

          <Button onClick={query}>查询</Button>
        </CardFooter> */}
      </Card>
      {openMintResult && <MintResult />}
    </>
  );
};
