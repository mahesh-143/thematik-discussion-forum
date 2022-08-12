import {
  Button,
  Flex,
  Avatar,
  Box,
  Container,
  HStack,
  IconButton,
} from "@chakra-ui/react";
import { BellIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";
import Searchbar from "../components/Searchbar";
import { SearchIcon } from "@chakra-ui/icons";
import Signin from "../forms/Signin";
import Signup from "../forms/Signup";

const Header = () => {
  const isLoggedIn = false;
  return (
    <Box bg="white" boxShadow="sm">
      <Container maxW="container.xl">
        <Flex align="center" py="1rem" justifyContent="space-between">
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
                <Signup />
                <Signin />
              </HStack>
            )}
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
};

export default Header;
