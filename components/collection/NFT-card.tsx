import React from 'react';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

interface NFTCardProps {}
export const NFTCard: React.FC<NFTCardProps> = () => {
  return (
    <Card>
      <CardContent>
        <AspectRatio ratio={9 / 16} className="bg-muted bg-white">
          <Image
            src="/images/img_qian.png"
            alt="测试"
            fill
            style={{
              transition: 'transform 0.5s ease-in-out',
            }}
            className="hover:-translate-y-4"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex">
        <div className="flex-1">
          <div className="flex items-end ">
            <div className="text-rose-600 font-bold align-baseline">
              <span className="text-sm">￥</span>
              <span className="text-xl">100</span>
            </div>
            <div className="text-sm line-through text-neutral-400">￥100</div>
          </div>
          <div className="text-sm  text-neutral-400">剩余货量: 100</div>
        </div>
      </CardFooter>
    </Card>
  );
};
