import { Divider, Tag, Text, VStack } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"

const Theme = ({ theme }) => {
  return (
    <ReactLink to={`/themes/${theme.id}`}>
      <VStack
        bg="white"
        w="20em"
        h="fit-content"
        align="start"
        p="1em"
        minH="14em"
      >
        <Tag size="lg">{theme.title}</Tag>
        <Divider />
        <Text as="p" noOfLines={4} fontSize="md">
          {theme.description}
        </Text>
        <Text as="span" opacity="50%">
          {theme.post.length} post{theme.post.length > 1 && "s"}
        </Text>
      </VStack>
    </ReactLink>
  )
}

export default Theme
