import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  Box,
  Button,
  Heading,
  HStack,
  Text,
} from "@chakra-ui/react";
import ForgotPassword from './ForgotPassword'

const Signin = () => {
    const { onOpen, isOpen, onClose } = useDisclosure();

    const [input, setInput] = useState('')
    const [password,  setPassword] = useState('')

    const handleInputChange = (e) => setInput(e.target.value)
    const handlePasswordChange = (e) => setPassword(e.target.value)
    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`${input} logged in`)
    }
    let isError
    let isPasswordError
    if(input === ""){
        isError = true;
    }
    if(password.length < 6){
       isPasswordError = true;
    }
    

  return (
    <>
    <Button
    fontSize="1rem"
    bg="brand.100"
    color="white"
    fontWeight="normal"
    size={{ base: "sm", md: "md" }}
    borderRadius={5}
    onClick={onOpen}
  >
    Sign In
  </Button>
    <Modal isOpen={isOpen} onClose={onClose}>
    <ModalOverlay />
    <ModalContent>
        <ModalHeader>
            <ModalCloseButton />
        </ModalHeader>
        <ModalBody>
        <Box bg='white' pb="2em" px="1em">
    <Heading mb='0.5em'>Sign In</Heading>
    <form onSubmit={handleSubmit}>
        <FormControl isInvalid={isError} isRequired>
            <FormLabel>email</FormLabel>
            <Input 
            type='email'
            value={input}
            onChange={handleInputChange} 
            bg="white"
            placeholder='enter your email'
            />
            {isError && <FormErrorMessage>Email is invalid</FormErrorMessage>}
        </FormControl>
        <FormControl isInvalid={isPasswordError} isRequired mt='0.5em'>
            <FormLabel>password</FormLabel>
            <Input 
            type='password'
            value={password}
            onChange={handlePasswordChange}
            />
            {isPasswordError && <FormErrorMessage>Password must be 6 character or longer</FormErrorMessage>}
        </FormControl>
        <ForgotPassword />
        <Button 
        bg='brand.100'
        color='white'
        fontWeight='normal'
        type='submit'
        mt='1em'
        w='100%'
        >Sign In</Button>
    </form>
    <HStack mt='1em'>
    <Text opacity='50%' fontSize='sm'>New to Thematick?</Text><Button variant='link' fontWeight='medium' color='black' fontSize='sm'>Sign up now</Button>
    </HStack>
    </Box>  
        </ModalBody>
    </ModalContent>
</Modal>
</>
  )
}

export default Signin