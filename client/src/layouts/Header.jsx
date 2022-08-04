import React from 'react'
import { Button, Flex, Avatar, Box, Container} from '@chakra-ui/react'
import { BellIcon } from '@chakra-ui/icons'
import Logo from '../components/Logo'
import Searchbar from '../components/Searchbar'

const Header = () => {

  const isLoggedIn = false 
  return (
    <Box bg='white' boxShadow='sm'>
      <Container maxW='container.xl'>
    <Flex align='center' justify='space-between' p='1em'>
        <Logo/>
        <Searchbar />


    {isLoggedIn === 'true' ? 
        <Flex align='center' justify='center' gap='1rem'>
            <BellIcon w={7} h={7} opacity='50%'/>
            <Avatar 
            size='sm' 
            src={'https://avatars.dicebear.con/api/male/username.svg'} />
        </Flex>
        :
        <Button bg='brand.100' color='white' fontWeight='normal'>Sign In</Button>
}

    </Flex>
    </Container>
    </Box>
  )
}

export default Header