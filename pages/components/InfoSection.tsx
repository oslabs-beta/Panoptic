import React from 'react';
import { Flex, Spacer, Text, Box, Heading, GridItem, Grid } from '@chakra-ui/react';
import style from '../../styles/Home.module.scss'


const AboutUs = () => {

  return (
    <Box position='absolute' w='100%' left='0'>
      <Grid color='white' bg='#3a5985' p={{base: '5%', lg: '10%'}} templateColumns={{base:'1fr', lg: 'repeat(3, 1fr)'}} gap={6} autoFlow="row dense">
        <Flex pt={5} pl={{base: 5, md: 0}} direction={{base: 'row', md: 'column'}} justify='center' align='center' w='100%' bg='#608fca'>
   

            <Text textAlign={'center'}
            lineHeight={1.2}
            fontWeight={800}
            fontSize={{ base: '1xl', sm: '2xl', lg: '3xl' }}>Technical Website Audits</Text>  
            <Text fontSize={{ base: 'l', md: '2xl', lg: 'xl' }} m='10'>Discover powerful insights about the strengths and weaknesses of your website, including: Performance, Accessibility, Best Practices, and SEO.</Text>

        </Flex>
        <Flex pt={5} pl={{base: 5, md: 0}} direction={{base: 'row', md: 'column'}} justify='center' align='center' w='100%' bg='#608fca'>

    
            <Text 
            textAlign={'center'}
            lineHeight={1.2}
            fontWeight={800}
            fontSize={{ base: '1xl', sm: '2xl', lg: '3xl' }}
            >
              Github Integration
            </Text>

            <Text fontSize={{ base: 'l', md: '2xl', lg: 'xl' }} m='10'>Login with Github to link your repositories and websites to keep track of audit metrics over a history of commits.</Text>

        </Flex>
        <Flex pt={5} pl={{base: 5, md: 0}} direction={{base: 'row', md: 'column'}} justify='center' align='center' w='100%' bg='#608fca'>


            <Text textAlign={'center'}
            lineHeight={1.2}
            fontWeight={800}
            fontSize={{ base: '1xl', sm: '2xl', lg: '3xl' }}>Visual Reports</Text>

            <Text fontSize={{ base: 'l', md: '2xl', lg: 'xl' }} m='10'>View your report with gauges, charts, and interactive lists, making it easy to understand the wealth of information from your report.</Text>

        </Flex>
      </Grid>
    </Box>
  );
};

export default AboutUs;
