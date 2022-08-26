import Sidebar from "../layouts/Sidebar"
import Post from "../components/Post"
import { Flex, VStack } from "@chakra-ui/react"

const Home = () => {
  return (
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
  )
}

export default Home
