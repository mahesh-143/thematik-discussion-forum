import {
  FormControl,
  Input,
  Textarea,
  Select,
  Box,
  VStack,
  Button,
  Heading,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { createPost, getThemes } from "../Services/Services"

const SubmitPost = () => {
  const [title, setTitle] = useState("")
  const [postBody, setPostBody] = useState("")
  const [themes, setThemes] = useState(null)

  const navigate = useNavigate()
  const handleSubmit = async (e) => {
    e.preventDefault()
    const { data } = await createPost({
      title,
      postBody,
      theme: e.target.theme.value,
    })
    console.log(data)
    navigate("/")
  }
  const fetchThemes = async () => {
    const { data } = await getThemes()
    setThemes(data.themes)
  }
  useEffect(() => {
    fetchThemes()
  }, [])

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
              value={postBody}
              onChange={(e) => setPostBody(e.target.value)}
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
