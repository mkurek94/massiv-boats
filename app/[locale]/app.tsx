'use client';

import React from "react";
import { Container } from "@/components/container/Container";
import { Footer } from "@/components/footer/Footer";
import { Navbar } from "@/components/navbar/Navbar";
import { ToasterProvider } from "@/providers/toast-provider";
import { SessionProvider } from "next-auth/react";

interface AppProps {
    children: React.ReactNode;
    locale: string;
}

export const App: React.FC<AppProps> = ({children, locale}) => {
  return (
    <SessionProvider>
      <ToasterProvider />
      <Navbar />
      <Container>{children}</Container>
      <Footer locale={locale} />
    </SessionProvider>
  );
};
