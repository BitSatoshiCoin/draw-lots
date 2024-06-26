import './globals.css';

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { WagmiProvider } from '@/components/wagmi-provider';
import { ThemeProvider } from '@/components/theme-provider';
import { SiteHeader } from '@/components/site-header';
import { cn } from '@/lib/utils';
import { locales } from '@/config/locale-config';
import { Toaster } from '@/components/ui/toaster';
import { SiteThemeBg } from '@/components/site-theme-bg';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

// 构建时静态生成路由
// export async function generateStaticParams() {
//   return locales.map((locale) => ({ locale }));
// }

export default function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={cn([
          inter.className,
          'min-w-full',
          'min-h-screen',
          'relative',
          'overflow-scroll',
        ])}
      >
        <WagmiProvider locale={locale}>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <SiteThemeBg />
            <div className="mx-auto min-h-full flex flex-col">
              <SiteHeader locale={locale} />
              <main className="pt-6 grow">{children}</main>
            </div>
            <Toaster />
          </ThemeProvider>
        </WagmiProvider>
      </body>
    </html>
  );
}
