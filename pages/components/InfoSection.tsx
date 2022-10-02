import React from 'react';
import { Flex, Spacer, Text, Box, Heading } from '@chakra-ui/react';
import style from '../../styles/Home.module.scss'
// import { FaTools, FaHandshake, FaStar } from 'react-icons/fa';

const AboutUs = () => {
  //   const [isLargerThan48] = useMediaQuery('(min-width: 48em)');

  const array = [
    {
      title: 'Technical Website Audits ',
      info: "Discover powerful insights about the strengths and weaknesses of your website, including: Performance, Accessibility, Best Practices, and SEO"

    },
    {
      title: 'Github',
      info: 'Login with Github to link your repositories and websites',
      info1: 'Keep track of audit metrics over a history of commits'
    },
    {
      title: 'Visual Reporting',
      info: 'View your report with gauges, charts, and interactive lists, making it easy to understand the wealth of information from your report',
    },
  ];

  return (
    <Flex
    justifyContent='center'
    >
      {array.map(arr => (
        <div key={`${arr.title}`}>
          <Box
            height='300px'
            width='400px'
            bg='#b2caee'
            shadow='md'
            p='6'
            m='6'
            borderRadius='8px'
            textAlign='center'
            margin='0rem 5%'
            border='1px solid #C4DDFF'
            color='black'
            fontWeight='700'
            boxShadow='xl'
            overflow='auto'
          >
            <Heading size='sm' fontSize='2rem' margin='0 0 2rem 0'>{arr.title}</Heading>
            <Text color='black' fontWeight='400' fontSize='1.35rem' height='fit-content'>
              {arr.info}
              <br></br>
              {arr.info1}
            </Text>
          </Box>
        </div>
      ))}
    </Flex>
  );
};

export default AboutUs;
