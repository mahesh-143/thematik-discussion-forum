import { Avatar, Box, Divider, Flex, Heading, Link, Tag, Text } from "@chakra-ui/react"
import { ArrowUpIcon, ArrowDownIcon, ChatIcon } from "@chakra-ui/icons"
import { AiOutlineEllipsis } from "react-icons/ai"
import { Link as ReactLink } from "react-router-dom"

const Post = ({ post }) => {
  return (
    <Box bg="white" w="full" mx="1em" p="1em" borderRadius={5}>
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
          <Text>{post.votes}</Text>
          <ArrowDownIcon w={5} h={5}/>
        </Flex>

        <Flex flexDirection="column" gap="1em" w="full">
          <Flex alignItems="center" justifyContent="space-between">
            <ReactLink to={"/post/" + post.id}>
              <Heading as="h3" size="md" fontWeight="500">
                {post.title}
              </Heading>
            </ReactLink>
            <AiOutlineEllipsis size="1.5em" />
          </Flex>
          <ReactLink to={"post/" + post.id}>
            <Text as="p" noOfLines={3}>
              {post.postBody}
            </Text>
          </ReactLink>

          <Divider />

          <Flex alignItems="center" justifyContent="space-between">
            <Flex direction="column" align="center" gap="0.5em">
              {
                post.Theme &&
            <ReactLink to={"/themes/" + post.Theme.id} >
            <Text size="sm">In <Tag>{post.Theme.title}</Tag></Text>
            </ReactLink>
              }
            <Flex alignItems="center" gap="0.5em">
              <Avatar
                size="xs"
                name={post.author.username}
              />
              <Text fontSize="sm">Posted by <Link as={ReactLink} to={"user/"+post.author.username} color="blue">{post.author.username}</Link></Text>
            </Flex>
            </Flex>
            <Text fontSize="sm" opacity="50%">6h ago</Text>
            <Text fontSize="sm" opacity="50%"><ChatIcon />  {post.comments.length}</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Post
