import { useState, useEffect } from "react"
import { getUser } from "../Services/Services"
import Post from "../components/Post"
import { Avatar, Divider, Heading, Text, VStack } from "@chakra-ui/react"
import { useParams } from "react-router-dom"

const UserPage = () => {
  const params = useParams()
  const [user, setUser] = useState("")
  const [posts, setPosts] = useState([])

  const fetchUser = async (username) => {
    const { data } = await getUser(username)
    console.log(data)
    setUser(data.user)
    setPosts(data.user.post)
  }

  useEffect(() => {
    fetchUser(params.username)
  }, [])

  console.log(user)

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
      <VStack w="40em" px="1em" marginInline="auto" pt="2em">
        <Avatar size="2xl" name={user.username} />
        <Heading>{user.username}</Heading>
        <Text as="span" opacity="50%">
          {" "}
          Total Post {mappedPosts.length}
        </Text>
        <Divider />
        <VStack w="100%" gap="1em" pt="1em" pb="2em">
          {mappedPosts}
        </VStack>
      </VStack>
    </>
  )
}

export default UserPage
