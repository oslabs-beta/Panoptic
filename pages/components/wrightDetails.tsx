import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';

const tempObj = {
  title:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at scelerisque elit. Sed finibus massa finibus porta placerat. Pellentesque id dictum risus. Nullam bibendum pharetra. ',
  title2:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at scelerisque elit. Sed finibus massa finibus porta placerat. Pellentesque id dictum risus. Nullam bibendum pharetra. ',
  title3:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at scelerisque elit. Sed finibus massa finibus porta placerat. Pellentesque id dictum risus. Nullam bibendum pharetra. ',
  title4:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed at scelerisque elit. Sed finibus massa finibus porta placerat. Pellentesque id dictum risus. Nullam bibendum pharetra. ',
};

const wrightDetails = (props: any) => {
  const tempArr = [];
  for (let [key, val] of Object.entries(tempObj)) {
    // console.log(key, val);
    let tempItem = (
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              {key}
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>{val}</AccordionPanel>
      </AccordionItem>
    );
    tempArr.push(tempItem);
  }
  return (
    <Accordion defaultIndex={[0]} allowMultiple>
      {tempArr}
    </Accordion>
  );
};

export default wrightDetails;
