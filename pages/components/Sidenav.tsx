// import React from 'react'
import Link from 'next/link'
import styles from '../../styles/Sidenav.module.scss'
import { useRouter } from 'next/router';

import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  RadioGroup,
  Stack,
  Radio,
  Button,
} from '@chakra-ui/react'
import { HamburgerIcon } from '@chakra-ui/icons';
import { useState } from 'react'

function Sidenav(props: any): JSX.Element {

  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [currentLink, setCurrentLink] = useState('');
  return (
    <nav className={styles.Sidenav}>
      <Button className={styles.burgerIcon} colorScheme='blue' onClick={onOpen}>
        <HamburgerIcon />
      </Button>
      <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent className={styles.drawerContent}>
          <DrawerHeader className={styles.logo} borderBottomWidth='1px'>Panoptic</DrawerHeader>
          <DrawerBody className={styles.drawerBody}>
            <a className={`${styles.link} /dashboard`} href="/dashboard">Metrics</a>
            <a className={`${styles.link} /repoendpoints`} href="/repoendpoints">Link Your Github Repo</a>
            <a className={`${styles.link} /manager`} href="/manager">Manage Endpoints</a>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </nav>
  )
}
export default Sidenav;