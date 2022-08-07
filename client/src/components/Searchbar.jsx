import { InputGroup, Input, InputRightElement, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'

const Searchbar = () => {
  return (
    <>
    <InputGroup marginInline="1em" maxWidth='30em' display={{base: 'none', md: 'block'}}>
    <Input
      pr='4.5rem'
      placeholder='Search'
      bg='neutral.100'
      borderRadius={5}
    />
    <InputRightElement>
    <IconButton aria-label='Search database' icon={<SearchIcon />} variant='transparent' opacity='50%'/>
    </InputRightElement>
  </InputGroup>
  </>
  )
}

export default Searchbar