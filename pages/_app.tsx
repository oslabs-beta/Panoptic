import '../styles/globals.css';
import '../styles/chartie.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import Header from './components/Nav';
import { SessionProvider } from 'next-auth/react';
import '../styles/lineChart.css';
import { CookiesProvider } from 'react-cookie';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>

      {/* <React.Fragment>
        <Header />
      </React.Fragment> */}
      <ChakraProvider>
        <Head>
          <title>Panoptic</title>
          <link rel='icon' href='../assets/PanLogo.png'/>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
