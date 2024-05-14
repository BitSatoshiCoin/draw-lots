'use client';
import React from 'react';

import { injected } from 'wagmi/connectors';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useConnect } from 'wagmi';
interface ConnectWalletModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
export const ConnectWalletModal: React.FC<ConnectWalletModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const { connect } = useConnect();

  const handleClick = () => {
    connect({ connector: injected() });
    onOpenChange();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>温馨提示</DialogTitle>
        </DialogHeader>
        请先连接钱包！
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            取消
          </Button>
          <Button type="submit" onClick={handleClick}>
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
