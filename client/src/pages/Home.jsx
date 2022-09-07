import { useEffect, useState } from "react"
import Post from "../components/Post"
import { Button, Flex, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { AiOutlineSortDescending } from "react-icons/ai"
import { Link } from "react-router-dom"
import { getFeed } from "./../Services/Services"

const Home = () => {
  const [posts, setPosts] = useState(null)
  const fetchFeed = async () => {
    const { data } = await getFeed()
    setPosts(data.posts)
  }
  useEffect(() => {
    fetchFeed()
  }, [])
  const mappedPosts =
    posts &&
    posts
      .slice(0)
      .reverse()
      .map((post) => {
        const votes = post.votes.reduce((acc, b) => acc + b.value, 0)
        return <Post key={post.id} post={{ ...post, votes }} />
      })
  return (
    <>
      <VStack w="40em" px="1em" margin="auto">
     
     <Flex  w="full" justify="space-between">
      <Link to="submit">
            <Button
              rightIcon={<AddIcon />}
              fontWeight="normal"
              color="white"
              bg="brand.100"
              mt="1em"
              display={{base: "block", md: "none"}}
            >
              Add Post
            </Button>
        </Link>

      <Link to="createtheme">
            <Button
              rightIcon={<AddIcon />}
              fontWeight="normal"
              variant="outline"
              borderColor="brand.100"
              color="brand.100"
              mt="1em"
              display={{base: "block", md: "none"}}
            >
              Create Theme
            </Button>
        </Link>
        </Flex>
          
        
        <VStack minH="100vh" gap="1em" pt="1em" pb="2em">
    
          {mappedPosts}
        </VStack>
      </VStack>
    </>
  )
}

export default Home
