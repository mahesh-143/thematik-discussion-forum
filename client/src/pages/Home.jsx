import { useEffect, useState } from "react"
import Post from "../components/Post"
import { Button, Flex, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"
import { getFeed } from "./../Services/Services"
import { useAuth } from "../Hooks/useAuth"

const Home = () => {
  const [posts, setPosts] = useState([])
  const { user } = useAuth()
  const fetchFeed = async () => {
    const { data } = await getFeed()
    console.log(data)
    setPosts(data.posts)
  }
  useEffect(() => {
    fetchFeed()
  }, [])
  console.log("render")
  const mappedPosts =
    posts &&
    posts.slice(0).reverse().map((post, index) => {
      const votesCount = post.votes.reduce((acc, b) => acc + b.value, 0)
      const myVote = post.votes.find((vote) => vote.userId === user.id)
      const upvoteFlag = myVote?.value === 1
      const downvoteFlag = myVote?.value === -1
      return (
        <Post
          key={post.id}
          setPosts={setPosts}
          index={index}
          post={{
            ...post,
            votesCount,
            upvoteFlag,
            downvoteFlag,
            isOwner: post.author.id === user?.id,
          }}
        />
      )
    })
  return (
    <>
      <VStack w="40em" px="1em" margin="auto">
        <Flex w="full" justify="space-between">
          <Link to="submit">
            <Button
              rightIcon={<AddIcon />}
              fontWeight="normal"
              color="white"
              bg="brand.100"
              mt="1em"
              display={{ base: "block", md: "none" }}
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
              display={{ base: "block", md: "none" }}
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
