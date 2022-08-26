import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ExternalLinkIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import {Link as ReactLink} from "react-router-dom"

const ForgotPassword = () => {
  const [email, setEmail] = useState("")
  const [issubmitted, setIssubmitted] = useState(false)
  const handleSubmit = async (e) => {
    e.preventDefault()
    // on submit code here
    console.log("form submitted")
    if(email === ""){
      alert("please enter your email")
    }
    else{
      console.log("entered else block")
      setIssubmitted(true)
    }
  
  }

  if(issubmitted) {

    return (
      <Flex
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap="1em" w="md" p="1em">
        <Flex gap="0.5em" alignItems="center" justifyContent="center" flexDirection="column">
          <Heading>Check your email</Heading>
          <Text opacity="50%" textAlign="center">
           We sent a password reset link to {email}
          </Text>
        </Flex>
        <Text color="GrayText">Didn't receive the email?<Link as={ReactLink} to="#" color="black" fontWeight="medium" textDecoration="">Click to resend</Link></Text>
      </VStack>
    </Flex>
    )

  } else{

  return (

<Flex
      as="form"
      onSubmit={handleSubmit}
      // minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap="1em" w="md" p="1em">
        <Flex alignSelf="start" gap="0.5em" flexDirection="column">
          <Heading>Forgot Password?</Heading>
          <Text opacity="50%">
            Enter email associated with your thematick account to get reset instructions
          </Text>
        </Flex>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            isRequired
            bg="white"
          />
        </FormControl>
        <Button type="submit" fontWeight="medium" bg="brand.100" w="full">
          Reset Password
        </Button>
        <Text color="GrayText">Back to <Link as={ReactLink} to="/signin" color="black" fontWeight="medium" textDecoration="">Sign In<ExternalLinkIcon /></Link></Text>
      </VStack>
    </Flex>
  )
  }
}

export default ForgotPassword
