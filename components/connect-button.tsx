'use client';
import { useAccount, useDisconnect } from 'wagmi';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { ConnectButton as NextConnectButton } from '@rainbow-me/rainbowkit';
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

export function ConnectButton() {
  const t = useTranslations('Basic');
  const { disconnect } = useDisconnect();
  const curAccount = useAccount();

  return (
    <div>
      <NextConnectButton.Custom>
        {({
          account,
          chain,
          openAccountModal,
          openChainModal,
          openConnectModal,
          authenticationStatus,
          mounted,
        }) => {
          // Note: If your app doesn't use authentication, you
          // can remove all 'authenticationStatus' checks
          const ready = mounted && authenticationStatus !== 'loading';
          const connected =
            ready &&
            account &&
            chain &&
            (!authenticationStatus || authenticationStatus === 'authenticated');

          return (
            <div
              {...(!ready && {
                'aria-hidden': true,
                style: {
                  opacity: 0,
                  pointerEvents: 'none',
                  userSelect: 'none',
                },
              })}
            >
              {(() => {
                if (!connected) {
                  return (
                    <Button onClick={openConnectModal} type="button">
                      {t('connectAWallet')}
                    </Button>
                  );
                }

                if (chain.unsupported) {
                  return (
                    <Button onClick={openChainModal} type="button">
                      Wrong network
                    </Button>
                  );
                }
                const connector = curAccount?.connector;

                return (
                  <Button type="button">
                    {connector && connector.icon && (
                      <Image
                        src={connector.icon}
                        alt={connector.name}
                        width={20}
                        height={20}
                        className="mr-1"
                      />
                    )}
                    {account.displayName}
                    <LogOut
                      className="cursor-pointer ml-2"
                      size={32}
                      onClick={() => {
                        disconnect();
                      }}
                    />
                  </Button>
                );
              })()}
            </div>
          );
        }}
      </NextConnectButton.Custom>
    </div>
  );
}
