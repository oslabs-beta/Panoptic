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
      <div>
        Panoptic Social Media:{' '}
        <Text mb='3'>
          <Link href='https://github.com/oslabs-beta/Panoptic' isExternal color='blue.500'>
            Github
          </Link>
          &nbsp;&nbsp;&nbsp;
          <Link href='https://www.linkedin.com/company/panopticapp/' isExternal color='blue.500'>
          LinkedIn
          </Link>
        </Text>
      </div>
      <Text opacity='0.5'>Open-Source Project - Built with Next.js</Text>
    </Flex>
  );
};

export default Footer;
