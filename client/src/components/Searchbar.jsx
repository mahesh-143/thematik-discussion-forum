import React from 'react'
import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const Searchbar = () => {
  return (
    <>
    <InputGroup maxWidth='25em' marginInline="1em">
    <Input
      pr='4.5rem'
      placeholder='Search'
      bg='neutral.100'
    />
    <InputRightElement>
    <IconButton aria-label='Search database' icon={<SearchIcon />} variant='transparent' opacity='50%'/>
    </InputRightElement>
  </InputGroup>
  </>
  )
}

export default Searchbar