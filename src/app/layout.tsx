import './globals.css';

import { Montserrat } from 'next/font/google';
import localFont from 'next/font/local';
import Script from 'next/script';

import { Footer, Header } from '@/components/common';
import Providers from '@/provider/Provider';

import type { Metadata } from 'next';

const montserrat = Montserrat({ subsets: ['latin'], display: 'swap', variable: '--font-montserrat' });

const myFont = localFont({
  src: './fonts/PretendardVariable.woff2',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Project 13.7',
  description: 'Generated by create next app',
  icons: {
    icon: '/logo/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Script type="text/javascript" src="https://static.nid.naver.com/js/naveridlogin_js_sdk_2.0.0.js" charSet="utf-8"></Script>
      </head>
      <body className={`${myFont.className} ${montserrat.variable} flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </Providers>
        <div id="modal-portal"></div>
      </body>
    </html>
  );
}
