import { Button, Divider, Flex, Heading, VStack, Text } from "@chakra-ui/react"
import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { getTheme } from "../Services/Services"
import Post from "../components/Post"
import { useAuth } from "../Hooks/useAuth"

const ThemePage = () => {
  const params = useParams()
  console.log(params.id)
  const [theme, setTheme] = useState("")
  const [posts, setPosts] = useState([])
  const { user } = useAuth()

  const fetchTheme = async (id) => {
    const { data } = await getTheme(id)
    setTheme(data.theme)
    setPosts(data.theme.post)
  }
  console.log(posts)

  useEffect(() => {
    fetchTheme(params.id)
  }, [])

  const mappedPosts =
    posts &&
    posts
      .slice(0)
      .reverse()
      .map((post, index) => {
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
      <VStack w="40em" px="1em" marginInline="auto">
        <Heading>{theme.title}</Heading>
        <Text as="p">{theme.description}</Text>
        <Text as="span" opacity="50%">
          {mappedPosts.length} Total Post
        </Text>
        <Divider />
        <VStack w="100%" gap="1em" pt="1em" pb="2em">
          {mappedPosts}
        </VStack>
      </VStack>
    </>
  )
}

export default ThemePage
