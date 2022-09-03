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
import { ExternalLinkIcon, WarningIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Link as ReactLink } from "react-router-dom"
import { loginUser } from "../Services/Services"
import { useAuth } from "../Hooks/useAuth"

const Signin = () => {
  const [user, setUser] = useState("")
  const [password, setPassword] = useState("")
  const [errorMsg, setErrorMsg] = useState("")

  const { setUserLogin } = useAuth()

  useEffect(() => {
    setErrorMsg("")
  }, [user, password])

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const { data } = await loginUser({ email: user, password })
      setUserLogin(data.user, data.accessToken, data.refreshToken)
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
          <Heading>Sign In</Heading>
          <Text opacity="50%">
            Welcome Back! Please enter your login details
          </Text>
        </Flex>
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
          <FormLabel>Email</FormLabel>
          <Input
            // type="email"
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
            pattern="[a-zA-z0-9]{8,}"
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
        <Text color="GrayText">
          Don't have an account?{" "}
          <Link
            as={ReactLink}
            to="/signup"
            color="black"
            fontWeight="medium"
            textDecoration=""
          >
            Sign up now <ExternalLinkIcon />
          </Link>
        </Text>
      </VStack>
    </Flex>
  )
}

export default Signin
