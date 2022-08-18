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
      minHeight="100vh"
      alignItems="center"
      justifyContent="center"
    >
      <VStack gap="1em" w="md" p="1em">
        <Flex alignSelf="start" gap="0.5em" flexDirection="column">
          <Heading>Sign In</Heading>
          <Text opacity="50%">
            Welcome Back! Please enter your login details
          </Text>
        </Flex>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            id="email"
            autoComplete="off"
            onChange={(e) => setUser(e.target.value)}
            value={user}
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
          <Link
            as={ReactLink}
            to="/forgotpassword"
            float="right"
            mt="0.2em"
            textDecoration="underline"
            fontSize="sm"
            fontWeight="medium"
          >
            forgot password
          </Link>
        </FormControl>

        <Button type="submit" fontWeight="medium" bg="brand.100" w="full">
          Sign In
        </Button>
        <Text color="GrayText">Don't have an account? <Link as={ReactLink} to="/signup" color="black" fontWeight="medium" textDecoration="">Sign up now <ExternalLinkIcon /></Link></Text>
      </VStack>
    </Flex>
  )
}

export default Signin
