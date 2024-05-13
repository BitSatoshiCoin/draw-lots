'use client';
import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

export function SiteThemeBg() {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <div
      style={{
        backgroundImage:
          theme == 'light'
            ? `url(/images/light-top-bg.jpg)`
            : `url(/bg-dark.svg)`,
        backgroundPosition: 'left top',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
      className="w-full h-full absolute top-0	left-0 -z-50"
    ></div>
  );
}
