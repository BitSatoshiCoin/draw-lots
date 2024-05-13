import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * 简写地址，只保留前6后4
 * @param address 
 * @returns 
 */
export function abbreviateAddress(address: string): string {
  // 判断是否为有效的地址
  if (!address || address.length <= 10) {
    return address;
  }

  // 取前六个字符（包括0x）和最后四个字符
  const firstSix = address.substring(0, 6);
  const lastIndex = address.length - 4;
  const lastFour = address.substring(lastIndex);

  // 返回结果
  return `${firstSix}...${lastFour}`;
}

/**
 * 判断是不是今天
 * @param timestamp 时间戳
 * @returns 
 */
export function isToday(timestamp : number) : boolean {
  const today = new Date(); // 获取当前时间
  const someDate = new Date(timestamp); // 将传入的时间戳转换为Date对象

  return someDate.getDate() === today.getDate() &&
         someDate.getMonth() === today.getMonth() &&
         someDate.getFullYear() === today.getFullYear();
}