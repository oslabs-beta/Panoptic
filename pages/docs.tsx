import type { NextPage } from 'next';
import Nav from './components/Nav';
import styles from '../styles/Docs.module.scss';
import { useState } from 'react';
import React from 'react';

const Docs: NextPage = (props): JSX.Element => {
  
  return (
    <div id={styles.docsPage}>
      <Nav /> 
      <div className={styles.docsContainer}>
        <h2 className={styles.sectionTitle}>About</h2>
        <p className={styles.sectionText}>
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
          dolor. 
        </p>
        <h2 className={styles.sectionTitle}>Panoptic without Github</h2>
        <p className={styles.sectionText}>
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
          dolor. 
        </p>
        <h2 className={styles.sectionTitle}>Panoptic with Github</h2>
        <p className={styles.sectionText}>
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
          dolor. 
        </p>
        <h2 className={styles.sectionTitle}>Understanding Metrics</h2>
        <p className={styles.sectionText}>
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
          dolor. 
        </p>
      </div>
    </div>
  );
};

export default Docs;
