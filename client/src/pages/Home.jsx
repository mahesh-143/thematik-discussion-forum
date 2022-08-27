import Post from "../components/Post"
import { Button, Flex, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { AiOutlineSortDescending } from "react-icons/ai"
import { Link } from "react-router-dom"

const Home = () => {
  return (
    <>
      <VStack maxW="50em">
        <Flex alignItems="center" justifyContent="space-between" pt="1em" px="1em" w="full">
          <Button
            leftIcon={<AiOutlineSortDescending />}
            fontWeight="normal"
            variant="ghost"
          >
            Latest
          </Button>
          <Link to="submit"><Button rightIcon={<AddIcon />} fontWeight="normal" color="white" bg="brand.100" >
            Add Post
          </Button>
          </Link>
        </Flex>
        <Flex flexDirection="column" minH="100vh">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </Flex>
      </VStack>
    </>
  )
}

export default Home
