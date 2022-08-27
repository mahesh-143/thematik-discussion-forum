import { Avatar, Box, Flex, Heading, Text} from "@chakra-ui/react"
import { StatUpArrow, StatDownArrow } from "@chakra-ui/react"

const Post = () => {
  return (
    <Box bg="white" maxWidth="50em" mx="2em" mt="2em" p="1em" borderRadius={5}>
        <Flex>
            <Flex flexDirection="column" gap="0.5em" marginLeft="1em" marginRight="2em" alignItems="center" justifyContent="center">
             <StatUpArrow />
             <Text>59</Text>
             <StatDownArrow />
            </Flex>
        
      <Flex flexDirection="column" gap="1em" >
        <Heading as="h3" size="md" fontWeight="500">How to print "Hello World" in Java?</Heading>
        <Text as="p" opacity="50%">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aliquam
          fugit atque nulla, officia esse, ad voluptatem quis assumenda itaque
          aperiam ab facere obcaecati. fugit atque nulla, officia esse, ad
          voluptatem quis aperiam ab facere obcaecati.
        </Text>
        <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center" gap="0.5em">
        <Avatar
                  size="xs"
                  src={"https://avatars.dicebear.con/api/male/username.svg"}
        />
        
        <Text fontSize="sm">Posted by Jerry Doe</Text>
        </Flex>
        <Text opacity="50%">6h ago</Text>
        <Text opacity="50%">43 comments</Text>
        

        </Flex>
      </Flex>
      </Flex>
    </Box>
  )
}

export default Post
