import { useState } from 'react'
import {
    FormControl,
    FormLabel, 
    FormErrorMessage,
    Input,
    Box,
    Button,
    Heading,
    FormHelperText
} from '@chakra-ui/react'

const ForgotpasswordForm = () => {

    const [input, setInput] = useState('')
    

    const handleInputChange = (e) => setInput(e.target.value)
    
    const handleSubmit = (e) => {
        e.preventDefault()
        alert(`${input} logged in`)
    }
    let isError
    
    if(input === ""){
        isError = true;
    }
 

  return (
    <Box bg='white' pb="2em" px="1em">
    <Heading mb='0.5em'>Forgot Password</Heading>
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
            <FormHelperText>Enter email associated with your account to reset your password</FormHelperText>
        </FormControl>
 
        <Button 
        bg='brand.100'
        color='white'
        fontWeight='normal'
        type='submit'
        mt='2em'
        w='100%'
        >Send Email</Button>
    </form>
    </Box>  
  )
}

export default ForgotpasswordForm