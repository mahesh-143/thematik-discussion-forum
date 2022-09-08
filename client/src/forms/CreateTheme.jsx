import {
  FormControl,
  Input,
  Textarea,
  Box,
  VStack,
  Button,
  Heading,
} from "@chakra-ui/react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { createTheme } from "../Services/Services"

const SubmitPost = () => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await createTheme({
      title,
      description,
    })
    console.log(data)
    navigate(`theme/${data.theme.id}`)
  }

  return (
    <Box maxW="container.md" m="auto" p="2em">
      <form onSubmit={handleSubmit}>
        <VStack gap="1em">
          <Heading size="md" alignSelf="flex-start">
            Create a Theme
          </Heading>
         
          <FormControl>
            <Input
              type="text"
              placeholder="Title"
              bg="white"
              borderRadius={5}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isRequired
            />
          </FormControl>
          <FormControl>
            <Textarea
              placeholder="Description(optional)"
              size="sm"
              resize="vertical"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              bg="white"
              borderRadius={5}
            />
          </FormControl>
          <Button
            fontSize="1rem"
            bg="brand.100"
            color="white"
            fontWeight="normal"
            borderRadius={5}
            alignSelf="flex-end"
            type="submit"
          >
            Create Theme
          </Button>
        </VStack>
      </form>
    </Box>
  )
}

export default SubmitPost
