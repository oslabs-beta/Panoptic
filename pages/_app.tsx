import '../styles/globals.css';
import '../styles/chartie.scss';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import React from 'react';

import '../styles/lineChart.css';
import { ChakraProvider } from '@chakra-ui/react';

function MyApp({ Component, pageProps }: AppProps):JSX.Element {
  return (

      <ChakraProvider>
        <Head>
          <title>Panoptic</title>
          <link rel='icon' href='/icons8-watchtower-96.png'/>
        </Head>
        <Component {...pageProps} />
      </ChakraProvider>

  );
};

export default MyApp;
