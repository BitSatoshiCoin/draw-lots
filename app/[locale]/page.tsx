import { RequestSignature } from '@/components/request-signature/index';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function Home({
  params: { locale },
}: Readonly<{
  params: { locale: string };
}>) {
  console.log(locale);

  const messages = useMessages();
  return (
    <div className="mx-auto w-96">
      <NextIntlClientProvider
        messages={{
          Basic: messages.Basic,
        }}
      >
        <RequestSignature locale={locale} />
      </NextIntlClientProvider>
    </div>
  );
}
