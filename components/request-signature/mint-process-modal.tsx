import React, { useState, useEffect } from 'react';

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loading } from '@/components/loading-icon';
interface MintProcessModalProps {
  tokenId?: bigint;
}

export const MintProcessModal: React.FC<MintProcessModalProps> = ({
  tokenId,
}) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (tokenId != undefined) {
      initData();
    }
  }, [tokenId]);

  const initData = () => {
    setOpen(true);
  };

  const handlerOpenChange = () => {
    setOpen(!isOpen);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handlerOpenChange}>
      <DialogContent className="h-56 flex justify-center items-center">
        <Loading />
      </DialogContent>
    </Dialog>
  );
};
