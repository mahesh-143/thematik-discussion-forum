import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { Container, Flex, HStack } from "@chakra-ui/react"

const WithSidebar = ({ isOpen, onClose }) => {
  return (
    <Flex>
      <Sidebar isOpen={isOpen} onClose={onClose}/>
      <Outlet />
    </Flex>
  )
}

export default WithSidebar
