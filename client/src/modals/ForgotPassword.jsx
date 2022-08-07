import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import ForgotpasswordForm from "../forms/ForgotPasswordForm";

const ForgotPassword = () => {
    const {onOpen, isOpen, onClose} = useDisclosure()
  return (
    <>
      <Button
        variant="link"
        fontWeight="normal"
        mt="1em"
        size="sm"
        float="right"
        onClick={onOpen}
      >
        Forgot Password?
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <ForgotpasswordForm />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ForgotPassword