import {
  Button,
  Flex,
  Avatar,
  Box,
  Container,
  HStack,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import Logo from "../components/Logo";
import Searchbar from "../components/Searchbar";
import { Link } from "react-router-dom";
import { useAuth } from "../Hooks/useAuth";

const Header = ({ onOpen }) => {
  const { accessToken, setUserLogout } = useAuth();
  const logoutHandler = () => {
    setUserLogout();
  };
  const user = JSON.parse(localStorage.getItem("user"));
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
      <Container maxW="1490px">
        <Flex align="center" py="1rem" justifyContent="space-between">
          <IconButton
            onClick={onOpen}
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

            {user ? (
              <Flex align="center" justify="center" gap="1rem">
                <Menu>
                  <MenuButton>
                    <Avatar size="sm" name={user.username} />
                  </MenuButton>
                  <MenuList>
                    <Link to="/myprofile">
                      <MenuItem>My Profile</MenuItem>
                    </Link>
                    <MenuItem onClick={logoutHandler} color="red">
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
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
  );
};

export default Header;
