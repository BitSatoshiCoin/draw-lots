'use client';
import { Button } from '@/components/ui/button';
import { clsx } from 'clsx';
import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';

const navigation = [
  { name: 'drawDivinationLot', href: '/' },
  { name: 'myDivinationLot', href: '/collection' },
];

export function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('Basic');
  const pathName = usePathname();
  const router = useRouter();

  const isCurrentPath = (path: string) => {
    let newPathName = pathName.replace(`/${locale}`, '');
    if (!newPathName && path === '/') return true;
    if (path == '/') return false;
    return newPathName.startsWith(path);
  };
  return navigation.map((item, index) => (
    <Button
      key={index}
      className={clsx(
        'relative light:text-neutral-700/90 text-base font-bold',
        { 'text-slate-500': !isCurrentPath(item.href) }
      )}
      variant="ghost"
      onClick={() => {
        router.push(item.href);
      }}
    >
      {t(item.name)}
    </Button>
  ));
}
