'use client';
import '@rainbow-me/rainbowkit/styles.css';
import { RainbowKitProvider, Locale } from '@rainbow-me/rainbowkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiProvider as NextWagmiProvider } from 'wagmi';
import { config } from '@/config/wallet-config';
const queryClient = new QueryClient();
export function WagmiProvider({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  return (
    <NextWagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider modalSize="compact" locale={locale as Locale}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </NextWagmiProvider>
  );
}
