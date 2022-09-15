import { Avatar, Box, Divider, Flex, Link, Text, VStack } from "@chakra-ui/react"
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons"
import { Link as ReactLink } from "react-router-dom"

const Comment = ({ comment }) => {
  return (
    <Box w="100%">
      <Flex>
        <Flex
          flexDirection="column"
          gap="0.5em"
          marginLeft="1em"
          marginRight="2em"
          alignItems="center"
          justifyContent="center"
        >
          <ArrowUpIcon w={5} h={5} />
          <Text>0</Text>
          <ArrowDownIcon w={5} h={5} />
        </Flex>
        <VStack gap="0.5em">
          <Flex alignItems="center" gap="0.5em" alignSelf="start">
            <Avatar size="sm" name={comment.user.username} />
            <Text fontSize="sm">
              <Link as={ReactLink} to="" color="blue">
                {comment.user.username}
              </Link>
            </Text>
            <Text opacity="50%" fontSize="sm">
              6h ago
            </Text>
          </Flex>
          <Text>{comment.message}</Text>
          <Text opacity="50%" alignSelf="start">
            Reply
          </Text>
        </VStack>
      </Flex>
      <Divider mt="1em"/>
    </Box>
  )
}

export default Comment
