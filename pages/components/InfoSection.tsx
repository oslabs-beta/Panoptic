import React from 'react';
import { Flex, Spacer, Text, Box, Heading } from '@chakra-ui/react';
// import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  //   const [isLargerThan48] = useMediaQuery('(min-width: 48em)');

  const array = [
    {
      title: 'LightHouse Info',
      info: 'Some lighthouse info',
    },
    {
      title: 'Github Info',
      info: 'how we used Github so far',
    },
    {
      title: 'Visual Reporting',
      info: 'What reports they can expect',
    },
  ];

  return (
    <Flex
    //   minH='70vh'
    //   alignItems='center'
    //   justifyContent='space-between'
    //   w='full'
    //   py='16'
    //   bg={'black'}
    //   px={isLargerThan48 ? '16' : '6'}
    //   flexWrap='wrap'
    //   flexDirection={isLargerThan48 ? 'row' : 'column'}
    >
      {array.map((arr) => (
        <>
          <Box
            height='300px'
            width='400px'
            bg='blackAlpha.200'
            // width={isLargerThan48 ? '32%' : 'full'}
            shadow='md'
            p='6'
            m='6'
            // alignItems='center'
            // justifyContent='center'
            borderRadius='md'
            // flexDirection='column'
            textAlign='center'
            // mb={isLargerThan48 ? '0' : '4'}
            border='1px solid #C4DDFF'
            color='#276CF4'
            boxShadow='xl'
          >
            {/* <Icon as={arr.icon} boxSize={14} color='blue.600' mb='5' /> */}
            <Heading size='lg' textShadow='1px 1px black'>
              {arr.title}
            </Heading>
            <Text>{arr.info}</Text>
          </Box>
          <Spacer />
        </>
      ))}
    </Flex>
  );
};

export default AboutUs;
