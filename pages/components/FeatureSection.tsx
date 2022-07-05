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
} from '@chakra-ui/react';

const FeatSect = () => {
  return (
    <Box color={'black'}>
      <Heading>Feats</Heading>
      <Tabs fontSize={'30px'} variant='soft-rounded'>
        <TabList>
          <Tab fontSize={'35px'}>Github Intergation</Tab>
          <Tab fontSize={'35px'}>Site Analytics</Tab>
          <Tab fontSize={'35px'}>Comparative Metrics Overtime</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>one!</p>
          </TabPanel>
          <TabPanel>
            <p>two!</p>
          </TabPanel>
          <TabPanel>
            <p>three!</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};
export default FeatSect;
