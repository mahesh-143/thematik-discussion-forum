import { Box, Flex, Heading, VStack, Icon } from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"
import { AiOutlineHome, AiOutlineCompass, AiOutlineRise } from "react-icons/ai"


const LinkItems = [
  {name : 'Home', icon : <AiOutlineHome size="1.2em"/>},
  {name : 'Explore', icon : <AiOutlineCompass size="1.2em"/>},
  {name : 'Trending', icon : <AiOutlineRise size="1.2em"/>},
 
]

const NavItem = ({icon, children, ...rest}) => {
  return (
    <ReactLink to="#">
      <Flex 
      align="center"
      gap="1em"
      px="2em"
      py="0.5em"
      mx="2em"
      cursor="pointer"
      borderRadius="lg"
      fontSize="1.12em"
      _hover={{
        bg : "gray.100",
      }}
      {...rest}>
       
          {icon && (
          icon
        )}
        {children}
        
      </Flex>
    </ReactLink>
  )
}


const Sidebar = () => {
  return (
    <Box
      bg="white"
      minHeight="100vh"
      minW="15em"
      pt="2em"
      display={{ base: "none", md: "block" }}
    >
      <VStack position="fixed">
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))}
      </VStack>
    </Box>
  )
}

export default Sidebar
