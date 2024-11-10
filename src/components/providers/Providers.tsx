'use client';

import { ThemeProvider } from 'next-themes';
import { SessionProvider } from "next-auth/react";
import AltLinkProvider from '../altlinks/AltLinkProvider';
import { Session } from 'next-auth';



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
