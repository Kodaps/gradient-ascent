'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";
import AltLinkProvider from './AltLinkProvider';
import { Session } from 'next-auth';
import { AltLinkContext } from './AltLinkProvider';



export interface ProvidersProps {
  children: React.ReactNode,
  session: Session|null
}

const Providers = ({ children, session}: ProvidersProps) => (

  <ThemeProvider attribute="class" defaultTheme='system' enableSystem disableTransitionOnChange>
    <AltLinkProvider>
      <SessionProvider session={session}>
      {children}
      </SessionProvider>
    </AltLinkProvider>
  </ThemeProvider>
);

export default Providers;
