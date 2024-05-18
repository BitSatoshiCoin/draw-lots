import { LanguageToggle } from '@/components/language-toggle';
import { ConnectButton } from '@/components/connect-button';
import { ModeToggle } from '@/components/mode-toggle';
import Link from 'next/link';
import { Navigation } from '@/components/navigation';
import { NextIntlClientProvider, useMessages } from 'next-intl';
import { Integral } from '@/components/integral/integral';

function Logo() {
  return (
    <svg
      className="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="27052"
      width="40"
      height="40"
    >
      <path
        d="M839.5 112.2l-1.2-0.3-73.1-15.4c-5.3-0.7-10.7-0.7-16.1 0-35.1-0.8-65.8 23.5-73.1 57.8l-7 31.7-33.2-4.1V73.1C635.7 32.7 603 0 562.6 0h-73.1c-40.4 0-73.1 32.7-73.1 73.1v47.1l-70.4 8c-8.4-32.5-37.5-55.7-71.5-55-4.6-0.7-9.3-0.7-13.9 0L187.4 87c-39.7 7.4-65.9 45.5-58.6 85.3 0 0.1 0 0.2 0.1 0.3l38.2 193.1h-20.6l64.4 579.2c7.7 47.2 49.5 81.1 97.3 79h408.1c47.8 2.1 89.5-31.8 97.3-79L878 365.7h-19.9l36.7-166c8.7-39.4-15.9-78.6-55.3-87.5zM652.9 257.7l-17.2 77.6v-79.7l17.2 2.1zM562.6 73.1v292.5h-73.1V73.1h73.1zM416.3 365.7h-23.9l-31.8-165.6 55.7-6.3v171.9zM204.2 160.2l73.1-13.9 42 219.4h-75l-40.1-205.5zM741 936.9c0 5.9-10.2 13.9-24.9 13.9H308c-14.6 0-24.1-8-24.9-13.9l-54.9-498.1h567.5L741 936.9z m-31.5-571.2l43.2-197.5 73.1 15.4-40.9 182.1h-75.4z"
        p-id="27053"
        fill="#fff"
      ></path>
    </svg>
  );
}

export const SiteHeader = ({ locale }: { locale: string }) => {
  const messages = useMessages();
  return (
    <nav className="flex h-20 justify-between px-12">
      <div className="flex flex-1 items-center ml-5 ">
        <Link href={`/${locale}`} className="flex items-center">
          <Logo />
        </Link>
      </div>

      <div className="flex flex-1 items-center  justify-end gap-x-6">
        <div className="flex items-center mr-14 gap-x-6">
          <NextIntlClientProvider
            messages={{
              Nav: messages.Nav,
            }}
          >
            <Navigation locale={locale} />
          </NextIntlClientProvider>
        </div>

        <Integral />
        {/* <LanguageToggle locale={locale} /> */}
        {/* <ModeToggle /> */}
        <ConnectButton></ConnectButton>
      </div>
    </nav>
  );
};
