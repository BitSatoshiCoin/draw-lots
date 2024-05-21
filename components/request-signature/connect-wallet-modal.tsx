'use client';
import React from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('Basic');
  const { connect } = useConnect();

  const handleClick = () => {
    connect({ connector: injected() });
    onOpenChange();
  };
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('friendlyReminder')}</DialogTitle>
        </DialogHeader>
        {t('pleaseConnectWalletFirst')}
        <DialogFooter>
          <Button variant="outline" onClick={onOpenChange}>
            {t('cancel')}
          </Button>
          <Button type="submit" onClick={handleClick}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
