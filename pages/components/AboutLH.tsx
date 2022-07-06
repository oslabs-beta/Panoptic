import styles from '../../styles/Docs.module.scss';
import React, { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

const AboutLH:FC = (props): JSX.Element => {
  return (
    <div id={styles.docsContainer}>
      <VStack>
        <VStack>
          <Heading size='2xl' color='#266ef6'>What is Google Lighthouse</Heading>
          <br />
          <p>
            <em>Google Lighthouse</em> is an open-source tool for running technical website audits. It creates a browser environment, and visits a selected endpoint just as any user would, and along the way collects data on key metrics including <strong>Performance, Accessibility, Best Practices, and SEO</strong>. When Lighthouse finishes running an audit, it can deliver all of the metrics associated on a results page.
          </p>
          <br />
          <Heading size='lg'>How does Panoptic use Lighthouse?</Heading>
          <br />
          <p>
            After a user runs a report with Lighthouse, and the page is exited, that data is lost permanently. If the user wants to store it, they have to do so manually. That is where Panoptic comes in. We take the stress away from having to manually store Lighthouse audits, with the benefit of interactive graphics to give a more in depth look at past reports.
            <br />
            <br />
            The ability to track when and why their performance may have degraded, or skyrocketed assists in the development process. Knowing when these events happen allows Engineers to continue moving their application in the right direction.
          </p>
        </VStack>
      </VStack>
    </div>
  );
};

export default AboutLH;
