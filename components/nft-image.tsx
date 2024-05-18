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
}
export const NFTImage: React.FC<NFTImageProps> = ({
  image,
  name,
  className,
  style = {},
}) => {
  const classes = cn('', className);
  return (
    <AspectRatio ratio={9 / 9} className="bg-muted">
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
