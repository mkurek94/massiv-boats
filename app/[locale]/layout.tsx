import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { App } from "./app";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Massiv Boats - Admin Dashboard",
  description: "Massiv Boats - Admin Dashboard",
};

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "pl" }];
}

export default async function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale}>
      <head>
        <title>Massiv boats admin panel</title>
        <meta name="description" content="Inglot Krawczyk - dealer"></meta>
        <link rel="icon" href="/images/inglot-logo.png" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <meta property="og:title" content="Massiv boats admin" />
        <meta property="og:type" content="marine" />
        <meta property="og:image" content="" />
      </head>
      <body className={inter.className}>
          <NextIntlClientProvider locale={locale} messages={messages}>
            <App locale={locale}>
              {children}
            </App>
          </NextIntlClientProvider>
      </body>
    </html>
  );
}
