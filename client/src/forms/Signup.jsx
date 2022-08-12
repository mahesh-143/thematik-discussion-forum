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
} from "@chakra-ui/react";

const Signup = () => {
  const { onOpen, isOpen, onClose } = useDisclosure();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`${username} registered in`);
  };

  let isEmailError;
  let isPasswordError;
  let isUsernameError;

  if (username == "mahesh") {
    isUsernameError = true;
  }
  if (email === "") {
    isEmailError = true;
  }
  if (password.length < 6) {
    isPasswordError = true;
  }

  return (
    <>
      <Button
        fontSize="1rem"
        variant="outline"
        borderColor="brand.100"
        color="brand.100"
        fontWeight="normal"
        borderRadius={5}
        size={{ base: "sm", md: "md" }}
        onClick={onOpen}
      >Sign Up</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <Box bg="white" pb="2em" px="1em">
              <Heading mb="0.5em">Sign Up</Heading>
              <form onSubmit={handleSubmit}>
                <FormControl isInvalid={isUsernameError} isRequired>
                  <FormLabel>username</FormLabel>
                  <Input
                    type="text"
                    value={username}
                    onChange={handleUsernameChange}
                    bg="white"
                    placeholder="enter username"
                  />
                  {isUsernameError && (
                    <FormErrorMessage>
                      username is already taken, try another !!
                    </FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isEmailError} isRequired mt="0.5em">
                  <FormLabel>email</FormLabel>
                  <Input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    bg="white"
                    placeholder="enter your email"
                  />
                  {isEmailError && (
                    <FormErrorMessage>Email is invalid</FormErrorMessage>
                  )}
                </FormControl>
                <FormControl isInvalid={isPasswordError} isRequired mt="0.5em">
                  <FormLabel>password</FormLabel>
                  <Input
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {isPasswordError && (
                    <FormErrorMessage>
                      Password must be 6 character or longer
                    </FormErrorMessage>
                  )}
                </FormControl>
                <Button
                  bg="brand.100"
                  color="white"
                  fontWeight="normal"
                  type="submit"
                  mt="2em"
                  w="100%"
                >
                  Sign Up
                </Button>
              </form>
            </Box>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default Signup;
