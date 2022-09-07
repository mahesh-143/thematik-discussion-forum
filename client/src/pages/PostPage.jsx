import { useEffect } from "react"
import { useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import { getPost } from "../Services/Services"
import { Avatar, Box, Button, Divider, Flex, Heading, Link, Tag, Text, VStack } from "@chakra-ui/react"
import { ArrowUpIcon, ArrowDownIcon, AddIcon, ChatIcon } from "@chakra-ui/icons"
import { AiOutlineEllipsis } from "react-icons/ai"
import { Link as ReactLink } from "react-router-dom"
import Comment from "../components/Comment"

const PostPage = () => {
    const params = useParams()
    const [post, setPost] = useState("")
    const [comments, setComments] = useState([])

    const fetchPost = async (id) => {
        const {data}  = await getPost(id)
        setPost(data.post)  
    }
    useEffect(() => {
        fetchPost(params.id)
    }, [])
    
  return (
    <>
    {
      post &&
      <VStack w="100%" px="1em" marginInline="auto" gap="1em" pb="2em">
      <Box bg="white" w="full" mx="1em" p="1em" mt="2em" borderRadius={5} h="fit-content">
      <Flex>
        <Flex
          flexDirection="column"
          gap="0.5em"
          marginLeft="1em"
          marginRight="2em"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowUpIcon w={5} h={5}/>
          <Text>{post.votes}0</Text>
          <ArrowDownIcon w={5} h={5}/>
        </Flex>

        <Flex flexDirection="column" gap="1em" w="full">
          <Flex alignItems="center" justifyContent="space-between">
           
              <Heading as="h3" size="md" fontWeight="500">
                {post.title}
              </Heading>
          
            <AiOutlineEllipsis size="1.5em" />
          </Flex>
         
            <Text as="p">
              {post.postBody}
            </Text>
        

          <Divider />

          <Flex alignItems="center" justifyContent="space-between">
            <Flex direction="column" align="center" gap="0.5em">
            <Text size="sm">In <Tag>ProgrammingClub</Tag></Text>
            <Flex alignItems="center" gap="0.5em">
              <Avatar
                size="xs"
                name={post.author.username}
              />
              <Text fontSize="sm">Posted by <Link as={ReactLink} to="" color="blue">{post.author.username}</Link></Text>
            </Flex>
            </Flex>
            <Text fontSize="sm" opacity="50%">6h ago</Text>
            <Text fontSize="sm" opacity="50%"><ChatIcon />  34</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
            <Button
              leftIcon={<AddIcon />}
              fontWeight="normal"
              size="sm"
              color="white"
              bg="brand.100"
              alignSelf="start"
            >
              Add Comment
            </Button>

            <Divider />
    <Comment />
    </VStack>
    }
    </>
  )
}

export default PostPage