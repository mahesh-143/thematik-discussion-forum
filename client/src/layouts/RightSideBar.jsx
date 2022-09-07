import { Box, Button, Center, Flex, VStack } from "@chakra-ui/react"
import { AddIcon } from "@chakra-ui/icons"
import { Link } from "react-router-dom"

const RightSideBar = () => {
  return (
    <Box bg="white" minHeight="100vh" minW="15em" pt="2em" display={{base: 'none', md: 'block'}}>
        <VStack pos="fixed" p="1em">
         <Link to="submit">
            <Button
              rightIcon={<AddIcon />}
              fontWeight="normal"
              color="white"
              bg="brand.100"
              mt="1em"
            >
              Add Post
            </Button>
        </Link>
        
        <Link to="createtheme">
            <Button
              rightIcon={<AddIcon />}
              fontWeight="normal"
              variant="outline"
              borderColor="brand.100"
              color="brand.100"
              mt="1em"
            >
              Create Theme
            </Button>
        </Link>
        </VStack>
    </Box>
  )
}

export default RightSideBar