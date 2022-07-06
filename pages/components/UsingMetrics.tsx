import styles from '../../styles/Docs.module.scss';
import { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

const UsingMetrics: FC = (props): JSX.Element => {
  return (
    <div id={styles.docsContainer}>
      <VStack>
        <VStack>
          <Heading size='2xl'>Using Our Application</Heading>
          <br />
          <Heading size='lg'>What is Panoptic?</Heading>
          <br />
          <p>
            <strong>Panoptic</strong> is an open-source website metrics tracking and visualization application, made with developers in mind to create a <em>seamless</em> development experience while <em>optimizing</em> your website.
          </p>
        </VStack>
      </VStack>
    </div>
  );
};

export default UsingMetrics;
