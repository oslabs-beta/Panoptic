// import React from 'react'
import Link from 'next/link';
import styles from '../../styles/Sidenav.module.scss';
import Image from 'next/image';
import logoPic from '../../assets/PanLogo.png';
// import { Show, Hide } from '@chakra-ui/react'
import axios from 'axios';
import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  useDisclosure,
  Button,
} from '@chakra-ui/react';
import { HamburgerIcon } from '@chakra-ui/icons';
import { useState, useEffect } from 'react';

function Sidenav(props: any): JSX.Element {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <nav className={styles.Sidenav}>
      <Button className={styles.burgerIcon} colorScheme='blue' onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.logo} borderBottomWidth='2px'>
            <div className={styles.imageContainer}>
              <Link className={styles.logoLink} href='/'>
                <a>
                  <Image
                    className={styles.logoPic}
                    alt='Panoptic Logo'
                    src={logoPic}
                  />
                </a>
              </Link>
            </div>
          </DrawerHeader>
          <DrawerBody className={styles.drawerBody}>
            {/* <h2>{props.user.username}</h2> */}
            {/* <Image
              src={`${props.user.github['profilePic']}`}
              alt={'user profile pic'}
              width={80}
              height={80}
            /> */}
            <a className={`${styles.link} /dashboard`} href='/dashboard'>
              Dashboard
            </a>
            <a
              className={`${styles.link} /repoendpoints`}
              href='/repoendpoints'
            >
              Link Your Github Repo
            </a>
            <a className={`${styles.link} /manager`} href='/manager'>
              Manage Endpoints
            </a>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </nav>
  );
}

export default Sidenav;
