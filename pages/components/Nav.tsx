import styles from '../../styles/Nav.module.scss';
import { useState, FC, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logoPic from '../../assets/PanLogo.png';
// const Nav: FC = (): JSX.Element => {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  useColorModeValue,
  useDisclosure,
  Img,
  Spacer,
  Center,
  useDimensions,
  useColorMode,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  MoonIcon, 
  SunIcon
} from '@chakra-ui/icons';

const Nav: FC = (): JSX.Element => {
  // FOR MOBILE NAVBAR COLLAPSE
  const { isOpen, onToggle } = useDisclosure();
  // FOR GETTING WIDTH OF COLLAPSE BTN TO MATCH SIGN IN BTN (TO CENTER LOGO)
  const buttonRef = useRef()
  const buttonWidth = useDimensions(buttonRef);
  // READS THEMES
  const { colorMode, toggleColorMode } = useColorMode();

  /************************************  NAVBAR START *********************************/
  return (
    <Box zIndex={100} position='fixed' w='100%'>
      {/************************************  NAVBAR  *********************************/}
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'80px'}
        py={{ base: 2 }}
        px={{ base: 0 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
        justify={{base: 'space-around'}}
        >
        {/************************************  MOBILE NAVBAR COLLAPSER *********************************/}
        <Box
          w={buttonWidth && buttonWidth.borderBox.width}
          display={{ base: 'flex', md: 'none' }}>
          {/************************************  MOBILE NAVBAR COLLAPSE ICON *********************************/}
          <IconButton
            w='100%'
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Box>
        {/************************************  DESKTOP NAV *********************************/}
        <Flex flex={{ base: 1 }} align='center' justify={{ base: 'center', md: 'space-around'}} >
          <Spacer display={{base: 'block', md:'none'}}/>
          {/************************************  PANOPTIC NAV LOGO *********************************/}
          <Center maxW='120px' maxH='120px'>
            <Link href='/'>
              <a>
                <Image src={logoPic} alt='Panoptic Logo'/>
              </a>
            </Link>
          </Center>

          {/************************************  NAV LINKS ON DESKTOP *********************************/}
          <Flex ml={10} display={{ base: 'none', md: 'flex' }}>
            <DesktopNav />
          </Flex>
          {/************************************  SPACER *********************************/}
          <Spacer display={{base: 'block', md:'none'}}/>
          {/************************************  NAVBAR BUTTONS *********************************/}
          <Stack
            display='block'
            direction={'row'}
            spacing={4}>
            {/************************************  NAVBAR BUTTONS: DARK/LIGHT MODE *********************************/}
            <Button display={{base: 'none', md: 'inline-flex'}} position={{base: 'relative', md: 'fixed'}} zIndex='5' top='25%' right='0' bg='#266ef6' color='white' onClick={toggleColorMode}>
              {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            </Button>
            {/************************************  NAVBAR BUTTONS: LOGIN BTN *********************************/}
            <Link href='/login'>
              <Button
                ref={buttonRef}
                as={'a'}
                fontSize={'sm'}
                fontWeight={500}>
                  Sign In
              </Button>
            </Link>
            {/************************************  NAVBAR BUTTONS: SIGNUP BTN *********************************/}
            <Link href='/signup'>
              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'#266ef6'}
                _hover={{
                  bg: '#608fca',
                }}>
                Sign Up
              </Button>
            </Link>
          </Stack>
        </Flex>
      </Flex>
      {/************************************  MOBILE NAVBAR COLLAPSE *********************************/}
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

{/************************************  COMPONENT FOR NAV LINKS ON DESKTOP *********************************/}
const DesktopNav = () => {

  return (
    <Stack direction={'row'} justify={'center'} spacing={5}>
      {/****  LOOP THROUGH NAV ITEMS ARRAY TO RENDER LINK INSIDE BOX ****/}
      {NAV_ITEMS.map((navItem) => (
        <Box cursor='pointer' fontWeight='700' key={navItem.label}>
          <Link href={navItem.href ?? '#'}>
            {navItem.label}   
          </Link>
        </Box>
      ))}
    </Stack>
  );
};

{/************************************  COMPONENT FOR NAV LINKS ON MOBILE *********************************/}
const MobileNav = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      <Button display={{base: 'inline-flex', md: 'none'}} onClick={toggleColorMode}>
        {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
      </Button>
      <Link href='/signup'>
        <Button w='100%'>
          Sign Up
        </Button>
      </Link>
    </Stack>
  );
};

{/************************************  MOBILE NAV LINKS *********************************/}
const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none',
        }}>
        <Link href={href ?? '#'}>
          <Text
            cursor={'pointer'}
            fontWeight={600}
            color={useColorModeValue('gray.600', 'gray.200')}>
            {label}
          </Text>
        </Link>

      </Flex>


    </Stack>
  );
};

interface NavItem {
  label: string;
  subLabel?: string;
  children?: Array<NavItem>;
  href?: string;
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/'
  },
  {
    label: 'Documentation',
    href: '/docs'
  },
  {
    label: 'Demo',
    href: '/demo',
  },
  {
    label: 'Features',
    href: '#Features',
  },
];

export default Nav;