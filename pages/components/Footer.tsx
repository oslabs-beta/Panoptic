import { Flex, Text, Link } from '@chakra-ui/react';
import React from 'react';

const Footer = () => {
  return (
    <Flex
      w='full'
      bg='blackAlpha.50'
      minHeight='10vh'
      flexDirection='column'
      alignItems='center'
      textAlign='center'
      justifyContent='center'
    >
      <Text mb='3'>
        Provided by
        <Link
          href='https://www.linkedin.com/company/panopticapp/'
          isExternal
          color='blue.500'
        >
          {' '}
          M.D.E.A.K
        </Link>
      </Text>
      <Text opacity='0.5'>Open-Source Project - Buit with Next.js</Text>
    </Flex>
  );
};

export default Footer;
