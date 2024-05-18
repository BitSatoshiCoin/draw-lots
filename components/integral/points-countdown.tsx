'use client';
import React, { useState, useEffect } from 'react';

function formatTime(seconds: number) {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours;
  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds =
    remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds;

  // 如果没有小时，则只显示分和秒
  if (hours <= 0) {
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

interface PointsCountDownProps {
  second: number;
  onFinish: () => void;
}

export const PointsCountDown: React.FC<PointsCountDownProps> = ({
  second,
  onFinish,
}) => {
  const [restSecond, setRestSecond] = useState<number>(second);
  useEffect(() => {
    const timer = setInterval(() => {
      setRestSecond((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timer);
          onFinish();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return <>{formatTime(restSecond)}</>;
};
