import { Divider, Tag, Text, VStack } from "@chakra-ui/react"

const Theme = ({theme}) => {
  console.log("theme props : ", theme)
  console.log("theme title : ", theme.title)
  console.log("theme desc : ", theme.description)
  return (
    <VStack bg="white" w="20em" h="fit-content" align="start" p="1em" minH="14em">
        <Tag size="lg">{theme.title}</Tag>
        <Divider />
        <Text as="p" noOfLines={4} fontSize="md">{theme.description}</Text>
        <Text as="span" opacity="50%">{theme.post.length} post{theme.post.length > 1 && "s"}</Text>
    </VStack>
  )
}

export default Theme