import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { createComment } from "../Services/Services"
import { useParams } from "react-router-dom"

const AddComment = () => {
  const params = useParams()
  const [message, setMessage] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log("form submitted")
    const postId = params.id
    const { data } = await createComment({
      postId,
      message,
    })
    console.log(data)
  }
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button
        leftIcon={<AddIcon />}
        fontWeight="normal"
        size="sm"
        color="white"
        bg="brand.100"
        alignSelf="start"
        onClick={onOpen}
      >
        Add Comment
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add Comment</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={handleSubmit}>
            <ModalBody pb={6}>
              <FormControl>
                <FormLabel>Comment</FormLabel>
                <Input
                  placeholder="Write comment"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button color="white" bg="brand.100" mr={3} type="submit">
                Add comment
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}

export default AddComment
