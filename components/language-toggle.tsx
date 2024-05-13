'use client';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import { useRouter, usePathname } from 'next/navigation';

export function LanguageToggle({ locale }: { locale: string }) {
  const router = useRouter();
  const pathName = usePathname();

  const switchLanguage = (value: string) => {
    router.replace(getToPath(value));
  };

  const getToPath = (language: string): string => {
    const pathArr = pathName.split('/');
    pathArr[1] = language;
    return pathArr.join('/');
  };
  return (
    <Select value={locale} onValueChange={switchLanguage}>
      <SelectTrigger className="w-[70px] text-base font-medium">
        <SelectValue placeholder="Language" />
      </SelectTrigger>
      <SelectContent className="text-base font-medium">
        <SelectItem value="en">EN</SelectItem>
        <SelectItem value="zh">ZH</SelectItem>
      </SelectContent>
    </Select>
  );
}
