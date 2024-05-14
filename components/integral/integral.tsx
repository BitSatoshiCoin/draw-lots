'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Coins, Info } from 'lucide-react';
import { useWriteContract, useAccount, useReadContract } from 'wagmi';
import { myTokenAbi } from '@/lib/abi';
import { TOKEN_ADDRESS, POINTSADDED } from '@/config/const';
import { isToday } from '@/lib/utils';

interface IntegralProps {}
export const Integral: React.FC<IntegralProps> = () => {
  const [isPoint, setIsPoint] = useState(false);
  const [intehral, setIntegral] = useState(0);
  const { status, address } = useAccount();
  const { writeContract } = useWriteContract();
  const { toast } = useToast();
  /**
   * 读取积分
   */
  const {
    data: integralData,
    isSuccess: integralIsucecess,
    refetch: integralRefetch,
  } = useReadContract({
    abi: myTokenAbi,
    address: TOKEN_ADDRESS,
    functionName: 'getUserPoints',
    args: [address as `0x${string}`],
  });

  /**
   * 读取上次签到时间
   */
  const { data: lastPointData, isSuccess: lastPointIsSuccess } =
    useReadContract({
      abi: myTokenAbi,
      address: TOKEN_ADDRESS,
      functionName: 'lastPointAdditionTime',
      args: [address as `0x${string}`],
    });

  /**
   * 监听积分读取状态
   */
  useEffect(() => {
    if (integralIsucecess && integralData != undefined) {
      setIntegral(Number(integralData));
    }
  }, [integralIsucecess]);

  /**
   * 监听上次签到时间读取状态
   */
  useEffect(() => {
    if (lastPointIsSuccess && lastPointData != undefined) {
      // 这里获取的时间是以秒为单位的，要乘以1000
      const _isToday: boolean = isToday(Number(lastPointData) * 1000);
      setIsPoint(_isToday);
    }
  }, [lastPointIsSuccess]);

  /**
   * 签到
   * @returns
   */
  const handleClickToPoint = () => {
    if (!address) return;
    writeContract(
      {
        abi: myTokenAbi,
        address: TOKEN_ADDRESS,
        functionName: 'addPoints',
        args: [address as `0x${string}`, BigInt(POINTSADDED)],
      },
      {
        onSuccess(data) {
          console.log(data, 'data-suceess');
          // 签到成功函数
          pointsSuccess();
        },
        onError(error) {
          console.log(error, 'error');
          pointsError();
        },
        onSettled(data) {
          console.log(data, 'data');
        },
      }
    );
  };

  /**
   * 签到成功
   */
  const pointsSuccess = () => {
    integralRefetch();
    setIsPoint(true);
    const { dismiss } = toast({
      title: '签到成功',
      description: (
        <div className="flex items-center">
          <Coins /> + {POINTSADDED}
        </div>
      ),
    });
    setTimeout(() => {
      dismiss();
    }, 3000);
  };

  const pointsError = () => {
    const { dismiss } = toast({
      description: (
        <>
          <div className="flex items-center">
            <Info /> &nbsp;签到失败
          </div>
        </>
      ),
    });
    setTimeout(() => {
      dismiss();
    }, 3000);
  };

  if (status !== 'connected') {
    return (
      <div className="text-slate-500 text-sm flex items-center">
        连接钱包后才能签到哦
        <Info />
      </div>
    );
  }

  return (
    <div className="flex items-center">
      <Coins /> {intehral}&nbsp;
      {!isPoint && (
        <Button variant="secondary" onClick={handleClickToPoint}>
          签到
        </Button>
      )}
    </div>
  );
};
