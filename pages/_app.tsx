import '../styles/globals.css';
import '../styles/chartie.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import '../styles/lineChart.css';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps):JSX.Element {
  return (
    // <SessionProvider session={pageProps.session}>
      <ChakraProvider>
        <Head>
          <title>Panoptic</title>
          <link rel='icon' href='/icons8-watchtower-96.png'/>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>
    // </SessionProvider>
  );
};

export default MyApp;
