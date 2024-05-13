'use client';
import { NFTCard } from '@/components/collection/NFT-card';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const list = [{}, {}, {}, {}];
export default function Page() {
  return (
    <div className="m-auto w-4/5 grid gap-x-8 gap-y-8 grid-cols-4">
      {list.map((item, index) => {
        return <NFTCard key={index} />;
      })}
    </div>
  );
}
