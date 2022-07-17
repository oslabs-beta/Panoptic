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
  StylesProvider,
} from '@chakra-ui/react';

const FeatSect = () => {
  return (
    <Box color={'black'} marginTop='3rem'>
      <Heading>Features</Heading>
      <Tabs fontSize={'30px'} variant='soft-rounded' padding='15px 0px'>
        <TabList> 
          <Tab fontSize={'24px'}>Visual Reporting</Tab>
          <Tab fontSize={'24px'}>Compare Metrics Overtime</Tab>
          <Tab fontSize={'24px'}>Github Integration</Tab>
        </TabList>

        <TabPanels>
          <TabPanel display='flex' justifyContent='space-evenly'>
            <p className={style.featText}>View graphs and gauges that clearly display the key web metrics that are most relevant to the success of your website</p>
            <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" width="1000"/>
          </TabPanel>
          <TabPanel display='flex' justifyContent='space-evenly'>
            <p className={style.featText}>View your metrics history over time, allowing you to see the progress or setbacks of your website.</p>
            <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" width="1000"/>
          </TabPanel>
          <TabPanel display='flex' justifyContent='space-evenly'>
            <p className={style.featText}>Supercharge Panoptic by connecting your Github, and link your repositories to endpoints.</p>
            <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" width="1000"/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default FeatSect;
