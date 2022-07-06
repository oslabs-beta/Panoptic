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
    <Box color={'black'}>
      <Heading>Features</Heading>
      <Tabs fontSize={'30px'} variant='soft-rounded' padding='15px 0px'>
        <TabList> 
          <Tab fontSize={'35px'}>Visual Reporting</Tab>
          <Tab fontSize={'35px'}>Compare Metrics Overtime</Tab>
          <Tab fontSize={'35px'}>Github Intergation</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>View graphs and gauges that clearly display the key web metrics that you're looking for.</p>
            <img className={style.homeGifs} src="https://i.gyazo.com/dc2288d131698a0a2680c1de6cfe88dd.gif" alt="Image from Gyazo" width="1000"/>
          </TabPanel>
          <TabPanel>
            <p>View your metrics history over time, allowing you to see the progress or setbacks of your website.</p>
          </TabPanel>
          <TabPanel>
            <p>Supercharge Panoptic by connecting your Github, and link your repositories to endpoints.</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default FeatSect;
