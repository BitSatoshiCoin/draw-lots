import { RequestSignature } from '@/components/request-signature/index';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function Home() {
  const messages = useMessages();
  return (
    <div className="mx-auto w-96">
      <NextIntlClientProvider
        messages={{
          Basic: messages.Basic,
        }}
      >
        <RequestSignature />
      </NextIntlClientProvider>
    </div>
  );
}
