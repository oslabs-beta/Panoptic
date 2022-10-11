import style from '../../styles/Home.module.scss'
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Spacer,
  Text,
  Box,
  Heading,
  Grid,
} from '@chakra-ui/react';

const FeatSect = () => {
  return (
    <Box id="Features" mt={{base: '90vh', md: '90vh'}} minH='90vh' >
      <Heading>Features</Heading>
      <Tabs fontSize={'24px'} padding='15px 0px'>
        <TabList> 
          <Tab fontSize={{base: '16px', md: '16px', lg: '24px'}}>Visual Reporting</Tab>
          <Tab fontSize={{base: '16px', md: '16px', lg: '24px'}}>Compare Metrics Overtime</Tab>
          <Tab fontSize={{base: '16px', md: '16px', lg: '24px'}}>GitHub Integration</Tab>
        </TabList>

        <TabPanels>
          <TabPanel display='flex' justifyContent={{md: 'space-between'}} flexDirection={{base: 'column', md: 'row'}}>
            <Grid mt={{base: 10, md: 10, lg: 0}}templateColumns={{base: '1fr', lg: '1fr 1fr'}} alignItems='center' gap={10}>
              <Text className={style.featText}>View graphs and gauges that clearly display the key web metrics that are most relevant to the success of your website.</Text>
              <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" />
            </Grid>
          </TabPanel>
          <TabPanel display='flex' justifyContent={{md: 'space-between'}} flexDirection={{base: 'column', md: 'row'}}>
            <Grid mt={{base: 10, md: 10, lg: 0}}templateColumns={{base: '1fr', lg: '1fr 1fr'}} alignItems='center' gap={10}>
              <Text className={style.featText}>View your metrics history over time, allowing you to see the progress or setbacks of your website.</Text>
              <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" />
            </Grid>
          </TabPanel>
          <TabPanel display='flex' justifyContent={{md: 'space-between'}} flexDirection={{base: 'column', md: 'row'}}>
            <Grid mt={{base: 10, md: 10, lg: 0}}templateColumns={{base: '1fr', lg: '1fr 1fr'}} alignItems='center' gap={10}>
              <Text className={style.featText}>Supercharge Panoptic by connecting your Github, and link your repositories to endpoints.</Text>
              <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" />
            </Grid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default FeatSect;
