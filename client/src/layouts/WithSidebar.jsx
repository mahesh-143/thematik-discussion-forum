import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { Box, Flex } from "@chakra-ui/react"

const WithSidebar = ({ isOpen, onClose }) => {
  return (
    <Flex>
      <Sidebar isOpen={isOpen} onClose={onClose} />
      <Outlet />
      <Box bg="white" minHeight="100vh" minW="15em" pt="2em" display={{base: 'none', md: 'block'}}></Box>
    </Flex>
  )
}

export default WithSidebar
