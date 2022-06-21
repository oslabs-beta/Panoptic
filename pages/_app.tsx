import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Header from './components/Nav';
import { SessionProvider } from 'next-auth/react';
import './lineChart/lineChart.css';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      {/* <React.Fragment>
        <Header />
      </React.Fragment> */}
        <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
