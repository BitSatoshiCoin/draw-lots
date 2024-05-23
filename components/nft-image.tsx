'use client';
import { cn } from '@/lib/utils';
import React from 'react';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { Loading } from '@/components/loading-icon';

interface NFTImageProps {
  image?: string;
  name?: string;
  className?: string;
  style?: React.CSSProperties;
  ratio?: number;
}
export const NFTImage: React.FC<NFTImageProps> = ({
  image,
  name,
  className,
  style = {},
  ratio,
}) => {
  const classes = cn('', className);
  return (
    <AspectRatio ratio={ratio ? ratio : 9 / 18}>
      {!image ? (
        <div className="absoult w-full h-full flex items-center justify-center">
          <Loading />
        </div>
      ) : (
        <img
          src={image || ''}
          alt={name || ''}
          style={{
            ...style,
          }}
          className={classes}
        />
      )}
    </AspectRatio>
  );
};
