'use client';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

interface MintResultProps {}
export const MintResult: React.FC<MintResultProps> = ({}) => {
  const node = document.createElement('div');
  document.body.appendChild(node);
  useEffect(() => {
    return () => {
      document.body.removeChild(node);
    };
  }, []);
  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen">111</div>,
    node
  );
};
