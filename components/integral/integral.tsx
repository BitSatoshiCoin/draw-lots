'use client';
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Coins, Info } from 'lucide-react';
import { useWriteContract, useAccount, useReadContract } from 'wagmi';
import { myTokenAbi } from '@/lib/abi';
import { POINTSADDED, DAY_IN_SECONDS } from '@/config/const';
import { PointsCountDown } from './points-countdown';
import { wait } from '@/lib/utils';
import { useTranslations } from 'next-intl';

const TOKEN_ADDRESS = process.env.NEXT_PUBLIC_TOKEN_ADDRESS as `0x${string}`;
interface IntegralProps {}
export const Integral: React.FC<IntegralProps> = () => {
  const t = useTranslations('Basic');
  const [canPoints, setCanPoints] = useState(false); // 是否可以签到
  const [pointsSecond, setPontsSecond] = useState(0);
  const [intehral, setIntegral] = useState(0);
  const { status, address } = useAccount();
  const { writeContract } = useWriteContract();
  const { toast } = useToast();
  /**
   * 读取积分
   */
  const { data: integralData, isSuccess: integralIsucecess } = useReadContract({
    abi: myTokenAbi,
    address: TOKEN_ADDRESS,
    functionName: 'getUserPoints' as any,
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
      console.log(lastPointData, 'lastPointData');
      const lastPointsTime = Number(lastPointData);
      disSecond(lastPointsTime);
    }
  }, [lastPointIsSuccess]);

  /**
   * 处理倒计时时间
   */
  const disSecond = async (lastPointsSecond: number) => {
    const remainTime =
      Math.ceil(new Date().getTime() / 1000) - lastPointsSecond;

    if (remainTime > DAY_IN_SECONDS) {
      setCanPoints(true);
    } else {
      setPontsSecond(DAY_IN_SECONDS - remainTime);
      await wait(100);
      setCanPoints(false);
    }
  };

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
  const pointsSuccess = async () => {
    setCanPoints(false);
    setPontsSecond(DAY_IN_SECONDS);
    setIntegral(intehral + POINTSADDED);
    const { dismiss } = toast({
      title: t('checkInSuccessful'),
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
            <Info /> &nbsp;{t('checkInFailed')}
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
      // <div className="text-slate-500 text-sm flex items-center">
      //   {t('pleaseConnectWallet')}
      //   <Info />
      // </div>
      <></>
    );
  }

  return (
    <div className="flex items-center">
      <div className="mr-2 flex">
        <Coins /> {intehral}
      </div>
      {canPoints ? (
        <Button variant="secondary" onClick={handleClickToPoint}>
          {t('checkIn')}
        </Button>
      ) : (
        <Button variant="outline" className="cursor-no-drop">
          {
            <PointsCountDown
              second={pointsSecond}
              onFinish={() => {
                setCanPoints(true);
              }}
            />
          }
        </Button>
      )}
    </div>
  );
};
