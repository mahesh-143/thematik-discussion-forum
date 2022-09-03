import { Avatar, Box, Flex, Heading, Link, Text } from "@chakra-ui/react"
import { StatUpArrow, StatDownArrow } from "@chakra-ui/react"
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
          <StatUpArrow />
          <Text>{post.votes}</Text>
          <StatDownArrow />
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
          <Flex alignItems="center" justifyContent="space-between">
            <Flex alignItems="center" gap="0.5em">
              <Avatar
                size="xs"
                name={post.author.username}
                src={"https://avatars.dicebear.con/api/male/username.svg"}
              />
              <Text fontSize="sm">Posted by <Link as={ReactLink} to="" color="blue">{post.author.username}</Link></Text>
            </Flex>
            <Text fontSize="sm" opacity="50%">6h ago</Text>
            <Text fontSize="sm" opacity="50%">43 comments</Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
}

export default Post
