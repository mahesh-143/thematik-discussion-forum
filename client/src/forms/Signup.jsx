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
  import { Link as ReactLink } from "react-router-dom"
  
  const Signin = () => {
    const [user, setUser] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorMsg, setErrorMsg] = useState("")
    const [success, setSuccess] = useState(false)
  
    useEffect(() => {
      setErrorMsg("")
    }, [user, password])
  
    const handleSubmit = async (e) => {
      e.preventDefault()
      alert("form submitted")
  
      // try {
      //   setSuccess(true)
      //   alert(success)
      // } catch (error) {
      //   setErrorMsg = "error"
      //   alert(error)
      // }
    }
    return (
      <Flex
        as="form"
        onSubmit={handleSubmit}
        alignItems="center"
        justifyContent="center"
      >
        <VStack gap="1em" w="md" p="1em">
          <Flex alignSelf="start" gap="0.5em" flexDirection="column">
            <Heading>Sign Up</Heading>
            <Text opacity="50%">
              Welcome to Thematick! Please enter your details to create an account
            </Text>
          </Flex>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              id="username"
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              isRequired
              bg="white"
            />
          </FormControl>
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
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              isRequired
              bg="white"
            />
          </FormControl>
  
          <Button type="submit" fontWeight="medium" bg="brand.100" w="full">
            Sign Up
          </Button>
          <Text color="GrayText">Already have an account? <Link as={ReactLink} to="/signin" color="black" fontWeight="medium" textDecoration="">Sign In now <ExternalLinkIcon /></Link></Text>
        </VStack>
      </Flex>
    )
  }
  
  export default Signin
  