import {
  Button,
  Flex,
  Avatar,
  Box,
  Container,
  HStack,
  IconButton,
} from "@chakra-ui/react"
import { BellIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons"
import Logo from "../components/Logo"
import Searchbar from "../components/Searchbar"
import { Link } from "react-router-dom"

const Header = () => {
  const isLoggedIn = false
  return (
    <Box
      bg="white"
      boxShadow="sm"
      position="sticky"
      top="0"
      left="0"
      zIndex="2"
      width="full"
    >
      <Container maxW="container.xl">
        <Flex align="center" py="1rem" justifyContent="space-between">
          <IconButton
            aria-label="open sidebar"
            icon={<HamburgerIcon />}
            display={{ md: "none" }}
            size="sm"
            variant="outline"
          />
          <Logo />
          <Searchbar />
          <HStack>
            <IconButton
              aria-label="Search database"
              icon={<SearchIcon />}
              variant="outline"
              size={{ base: "sm" }}
              opacity="50%"
              display={{ md: "none" }}
            />

            {isLoggedIn ? (
              <Flex align="center" justify="center" gap="1rem">
                <BellIcon
                  w={{ base: 6, md: 7 }}
                  h={{ base: 6, md: 7 }}
                  opacity="50%"
                />
                <Avatar
                  size="sm"
                  src={"https://avatars.dicebear.con/api/male/username.svg"}
                />
              </Flex>
            ) : (
              <HStack>
                <Link to="/signup">
                  <Button
                    fontSize="1rem"
                    variant="outline"
                    borderColor="brand.100"
                    color="brand.100"
                    fontWeight="normal"
                    borderRadius={5}
                    size={{ base: "sm", md: "md" }}
                  >
                    Sign Up
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button
                    fontSize="1rem"
                    bg="brand.100"
                    color="white"
                    fontWeight="normal"
                    borderRadius={5}
                    size={{ base: "sm", md: "md" }}
                  >
                    Login
                  </Button>
                </Link>
              </HStack>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  )
}

export default Header
