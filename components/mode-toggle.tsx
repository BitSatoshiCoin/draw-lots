'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';
// 亮色主题
export const THEME_LIGHT = 'light';
// 暗色主题
export const THEME_DRAK = 'dark';

export function ModeToggle({ className }: { className?: string }) {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      className={className}
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme == THEME_LIGHT ? THEME_DRAK : THEME_LIGHT)}
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
