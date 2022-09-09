import { useState, useEffect } from "react"
import { getCurrentUser } from "../Services/Services"
import Post from "../components/Post"
import { Avatar, Divider, Heading, Text, VStack } from "@chakra-ui/react"

const ProfilePage = () => {
    const [user, setUser] = useState("")
    const [posts, setPosts] = useState([])

    const fetchUser = async () => {
        const {data} = await getCurrentUser()
        console.log("user data : ", data)
        setUser(data.profile)
        setPosts(data.profile.post)
    }
    console.log("user : " , user)
    useEffect(() => {
        fetchUser()
    }, [])

    const mappedPosts =
    posts &&
    posts
      .slice(0)
      .reverse()
      .map((post) => {
        // const votes = post.votes.reduce((acc, b) => acc + b.value, 0)
        return <Post key={post.id} post={{ ...post }} />
      })
      
  return (
    <>
      <VStack w="40em" px="1em" marginInline="auto" pt="2em">
        <Avatar size="2xl" name={user.username}/>
        <Heading>
            {user.username}
        </Heading>
        <Text as="span" opacity="50%"> Total Post {mappedPosts.length}</Text>
        <Divider />
        <VStack w="100%" gap="1em" pt="1em" pb="2em">
            {mappedPosts}
        </VStack>
      </VStack>
    </>
  )
}

export default ProfilePage