import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Link,
  Text,
  VStack,
} from "@chakra-ui/react"
import { ExternalLinkIcon, WarningIcon, CheckCircleIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Link as ReactLink } from "react-router-dom"
import { registerUser } from "../Services/Services"

const Signin = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    setErrorMsg("")
  }, [username, email, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await registerUser({ username, email, password })
      setSuccess(true)
    } catch (err) {
      setErrorMsg(err.message)
    }
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
        {
          success && 
          (
            <Flex
              border="0.5px solid green"
              borderRadius="5"
              color="green"
              p="0.5rem"
              w="full"
              align="center"
              gap="1em"
            >
              <CheckCircleIcon /> <Text>Registartion successfull !! Please verify your email</Text>
            </Flex>
          )
          
        }
        {errorMsg && (
          <Flex
            border="0.5px solid red"
            borderRadius="5"
            color="red"
            p="0.5rem"
            w="full"
            align="center"
            gap="1em"
          >
            <WarningIcon /> <Text>Error : {errorMsg}</Text>
          </Flex>
        )}
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            id="username"
            autoComplete="off"
            onChange={(e) => setUsername(e.target.value)}
            value={username}
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
            pattern="[a-zA-z0-9]{8,}"
            title="Password must be 8"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            isRequired
            bg="white"
          />
          <FormHelperText>Password must be 8 character long</FormHelperText>
        </FormControl>

        <Button type="submit" fontWeight="medium" bg="brand.100" w="full">
          Sign Up
        </Button>
        <Text color="GrayText">
          Already have an account?{" "}
          <Link
            as={ReactLink}
            to="/signin"
            color="black"
            fontWeight="medium"
            textDecoration=""
          >
            Sign In now <ExternalLinkIcon />
          </Link>
        </Text>
      </VStack>
    </Flex>
  )
}

export default Signin
