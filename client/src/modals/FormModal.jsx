import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  HStack,
} from "@chakra-ui/react";
import SigninForm from "../forms/SigninForm";
import SignupForm from "../forms/SignupForm";

const FormModal = () => {
  const Signin = useDisclosure();
  const Signup = useDisclosure();
  return (
    <>
      <HStack>
        <Button
          fontSize="1rem"
          variant="outline"
          borderColor="brand.100"
          color="brand.100"
          fontWeight="normal"
          borderRadius={5}
          size={{ base: "sm", md: "md" }}
          onClick={Signup.onOpen}
        >
          Sign Up
        </Button>
        <Button
          fontSize="1rem"
          bg="brand.100"
          color="white"
          fontWeight="normal"
          size={{ base: "sm", md: "md" }}
          borderRadius={5}
          onClick={Signin.onOpen}
        >
          Sign In
        </Button>
      </HStack>

      {/* Sing in */}

      <Modal isOpen={Signup.isOpen} onClose={Signup.onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <SignupForm />
          </ModalBody>
        </ModalContent>
      </Modal>

      {/* Sign up */}

      <Modal isOpen={Signin.isOpen} onClose={Signin.onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>
                <ModalCloseButton />
            </ModalHeader>
            <ModalBody>
                <SigninForm />
            </ModalBody>
        </ModalContent>
    </Modal>
    </>
  );
};

export default FormModal;
