import styles from '../../styles/Docs.module.scss';
import { FC } from 'react';
import { Heading, VStack } from '@chakra-ui/react';

const UsingMetrics: FC = (props): JSX.Element => {
  return (
    <div id={styles.docsContainer}>
      <VStack>
        <VStack>
          <Heading size='2xl' color='#266ef6'>After Running an Audit</Heading>
          <br />
          <p>
            After you run an audit you are greeted with quite a bit of data. Lighthouse breaks this down into four categories:
          </p>
          <br />
          <Heading size='lg'>Primary Categories</Heading>
          <p>
            <br />
            Performance - is a measure of how long it takes a website to load, and is timed at several different events including when the first images and text appear, last images and text appear, time before the page is interactive, and many others.
            <br />
            <br />
            Accessibility - shows how easily accessable your website is by the average person, as well as how someone with a disability could navigate the page. It checks if you have followed the ARIA recommendations and that everything on the page is easily readbable by someone using a screen reader.
            <br />
            <br />
            Best Practices - checks the application against recommended coding practices. Including website security, efficiency, and up to date coding libraries/dependencies.
            <br />
            <br />
            SEO - ensures your application is showing up in search results for related entities. Checks data on the page on first page load, if the page is legible, makes sure links are valid and have descriptive text surrounding them, among other things.
          </p>
          <br />
          {/* <Heading size='lg'>Additional Performance Metrics</Heading>
          <br />
          <p>
            The performance category is further broken down into an additional six cetegories:
            <br />
            First Contentful Paint - measures how long it takes the browser to render the first piece of DOm content after a user navigates to your page. Images, non-white canvas elements, and SVGs on are considered DOM content, anything inside an iframe is not included.
            <br />
            Largest Contentful Paint - reports the render time of the 
          </p> */}
        </VStack>
      </VStack>
    </div>
  );
};

export default UsingMetrics;
