import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
interface PointsDeficiencyModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}
export const PointsDeficiencyModal: React.FC<PointsDeficiencyModalProps> = ({
  isOpen,
  onOpenChange,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>温馨提示</DialogTitle>
        </DialogHeader>
        积分不足，请签到获取积分！
        <DialogFooter>
          <Button type="submit" onClick={onOpenChange}>
            确认
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
