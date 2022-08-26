import Sidebar from "./Sidebar"
import { Outlet } from "react-router-dom"
import { Flex, HStack } from "@chakra-ui/react"

const WithSidebar = () => {
  return (
    <Flex>
    <Sidebar />
    <Outlet />
    </Flex>
  )
}

export default WithSidebar