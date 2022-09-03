import {
  Box,
  Flex,
  VStack,
  DrawerCloseButton,
  DrawerContent,
  DrawerOverlay,
  Drawer,
  DrawerBody,
} from "@chakra-ui/react"
import { Link as ReactLink } from "react-router-dom"
import { AiOutlineHome, AiOutlineAppstore, AiOutlineAppstoreAdd, AiOutlineBell } from "react-icons/ai"

const LinkItems = [
  { name: "Home", link: "/", icon: <AiOutlineHome size="1.2em" /> },
  { name: "Themes", link: "#", icon: <AiOutlineAppstore size="1.2em" /> },
  { name: "Your Themes", link: "#", icon: <AiOutlineAppstoreAdd size="1.2em" /> },
  { name: "Notification", link: "#", icon: <AiOutlineBell size="1.2em" /> },
]

const NavItem = ({ icon, link, children, ...rest }) => {
  return (
    
    <ReactLink to={link}>
      <Flex
        align="center"
        gap="0.5em"
        px="2em"
        py="0.5em"
        mx="2em"
        cursor="pointer"
        borderRadius="lg"
        fontSize="1.1em"
        _hover={{
          bg: "gray.100",
        }}
        {...rest}
      >
        {icon && icon}
        {children}
      </Flex>
    </ReactLink>
  )
}

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <>
      <Box bg="white" minHeight="100vh" minW="15em" pt="2em" display={{base: 'none', md: 'block'}}>
        <VStack position="fixed" alignItems="left">
          {LinkItems.map((link) => (
            <NavItem key={link.name} icon={link.icon} link={link.link}>
              {link.name}
            </NavItem>
          ))}
        </VStack>
      </Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerBody>
            <Box bg="white" minHeight="100vh" minW="15em" pt="2em">
              <VStack position="fixed">
                {LinkItems.map((link) => (
                  <NavItem key={link.name} icon={link.icon}>
                    {link.name}
                  </NavItem>
                ))}
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  )
}

export default Sidebar
