import { Avatar, Box, Flex, Link, Text, VStack } from "@chakra-ui/react"
import { ArrowUpIcon, ArrowDownIcon } from "@chakra-ui/icons"
import {Link as ReactLink} from "react-router-dom"

const Comment = () => {
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
          <ArrowUpIcon w={5} h={5}/>
          <Text>0</Text>
          <ArrowDownIcon w={5} h={5}/>
        </Flex>
        <VStack gap="0.5em">
        <Flex alignItems="center" gap="0.5em" alignSelf="start">
        <Avatar
                size="sm"
                name="Jerry Doe"
              />
              <Text fontSize="sm"><Link as={ReactLink} to="" color="blue">Jerry Doe</Link></Text>
              <Text opacity="50%" fontSize="sm">6h ago</Text>
        </Flex>
        <Text as="p" >
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt itaque nobis repellat!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt itaque nobis repellat!
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt itaque nobis repellat!
        </Text>
        <Text opacity="50%" alignSelf="start">Reply</Text>
        </VStack>
        </Flex>
    </Box>
  )
}

export default Comment