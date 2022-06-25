import styles from '../../styles/Docs.module.scss';
import type { NextPage } from 'next';
import { Heading, VStack } from '@chakra-ui/react';

const UsingApp: NextPage = (props): JSX.Element => {
  return (
    <div id={styles.docsContainer}>
      <VStack>
        <Heading>Stuff</Heading>

        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vitae
          lacus sit amet mi fermentum gravida. Nunc eget mi eros. Aliquam
          sodales sapien vel sapien sagittis imperdiet. Vivamus posuere erat at
          purus imperdiet, non sollicitudin ex commodo. Donec felis magna,
          pellentesque id vulputate at, fringilla et eros. In fermentum
          ultricies felis, a bibendum nisi laoreet ut. Pellentesque congue eget
          eros ac pharetra. Pellentesque blandit, metus id ornare fringilla,
          nisl felis efficitur eros, ac sagittis eros enim vel massa. Praesent
          posuere nunc elementum, consectetur libero ac, dictum velit. Proin
          pellentesque, metus id auctor placerat, eros justo commodo justo,
          mattis gravida nulla leo eget dui. Aenean interdum dolor et erat
          sagittis tristique. Pellentesque imperdiet mattis ipsum id lacinia.
          Phasellus non eleifend lacus, at elementum libero. Donec vel tristique
          dolor. <br />
          <br />
          Vivamus gravida mi in massa accumsan, in pretium quam vestibulum.
          Proin nec est venenatis, laoreet odio non, posuere sapien. Aenean vel
          tempus dui, sit amet accumsan mi. Vestibulum lacinia felis erat, id
          dapibus risus ultricies ac. Fusce dapibus nulla at nunc efficitur
          dictum. Cras eget mi ornare, molestie magna quis, euismod lorem.
          Aenean at mattis nunc. Quisque a urna lectus. Phasellus at tortor a
          ipsum eleifend vehicula ut at magna. Etiam ut risus sodales, finibus
          odio quis, venenatis neque. Morbi ac velit congue, feugiat metus sed,
          vestibulum nulla. Quisque eget tempus ex. Morbi quis scelerisque
          risus. Mauris tincidunt iaculis odio. Nunc at pulvinar urna. Cras
          interdum lacus a justo pharetra pulvinar. Maecenas accumsan sem et
          velit dictum, dapibus interdum felis convallis. Proin non condimentum
          diam, a dignissim diam. Pellentesque pretium lectus id nisl auctor
          convallis. <br />
          <br />
          Fusce eu interdum orci. Suspendisse potenti. Etiam pellentesque, velit
          at pulvinar imperdiet, nisi lacus viverra neque, sed venenatis tortor
          metus id libero. Duis a erat nibh. In non porta mi, in luctus purus.
          Donec tincidunt, urna vitae dignissim egestas, elit nisl consequat ex,
          vitae consequat arcu elit quis tellus. Etiam porttitor libero risus,
          quis eleifend sapien mollis semper. Sed at eros a arcu sodales
          iaculis. Mauris ultricies rhoncus congue. Vestibulum luctus eu arcu ac
          consectetur. Vestibulum tortor lacus, lacinia a sem vel, semper mattis
          nunc. Fusce et mollis urna, nec molestie orci. Nullam vel enim sed
          nunc accumsan laoreet vel ac dui. Nulla facilisi. Duis vitae laoreet
          libero. Sed at mauris mollis, rhoncus massa in, auctor arcu. Ut
          finibus pharetra eleifend. Sed id purus a mauris commodo porttitor.
          Mauris ac risus et ex viverra vulputate. Vivamus id urna quis sapien
          ornare volutpat vitae id magna. Vestibulum facilisis ipsum vel mattis
          imperdiet. Orci varius natoque penatibus et magnis dis parturient
          montes, nascetur ridiculus mus. Ut vel faucibus leo, id posuere ante.
          Suspendisse aliquet orci ut quam tempor euismod.
        </p>
      </VStack>
    </div>
  );
};

export default UsingApp;
