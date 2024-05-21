import React from 'react';
import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
interface PointsDeficiencyModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
export const PointsDeficiencyModal: React.FC<PointsDeficiencyModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  const t = useTranslations('Basic');
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t('friendlyReminder')}</DialogTitle>
        </DialogHeader>
        {t('insufficientPoints')}
        <DialogFooter>
          <Button type="submit" onClick={onOpenChange}>
            {t('confirm')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
