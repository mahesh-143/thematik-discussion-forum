import {
  Avatar,
  Box,
  Divider,
  Flex,
  Heading,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Tag,
  Text,
  useToast,
} from "@chakra-ui/react";
import { ArrowUpIcon, ArrowDownIcon, ChatIcon } from "@chakra-ui/icons";
import { AiOutlineEllipsis } from "react-icons/ai";
import { Link as ReactLink } from "react-router-dom";

import { deletePost, downvotePost, upvotePost } from "./../Services/Services";
import { useAuth } from "../Hooks/useAuth";

const Post = ({ post, setPosts, index }) => {
  const { user } = useAuth();
  const toast = useToast();
  const deletePostHandler = async () => {
    await deletePost(post.id);
    setPosts((posts) => posts.filter((_, i) => _.id !== post.id));
    toast({
      position: "bottom-right",
      title: "Post deleted.",
      status: "success",
    });
  };
  const upvoteHandler = async () => {
    const { data } = await upvotePost(post.id);

    //if post is already upvoted
    if (post.upvoteFlag) {
      const votes = post.votes.filter((vote) => vote.userId != user.id);
      setPosts((post) => {
        post[index].votes = votes;
        post[index].upvoteFlag = false;
        return [...post];
      });
    } else {
      //if post is not upvoted
      const myVote = post.votes.findIndex((vote) => vote.userId === user.id);
      //if post is downvoted
      if (myVote !== -1) {
        const votes = post.votes.map((vote) => {
          if (vote.userId !== user.id) return vote;
          return { ...vote, value: 1 };
        });
        setPosts((post) => {
          post[index].votes = votes;
          post[index].upvoteFlag = true;
          post[index].downvoteFlag = false;
          return [...post];
        });
      } else {
        //if brand new vote
        const votes = [...post.votes, data.vote];
        setPosts((post) => {
          post[index].votes = votes;
          post[index].upvoteFlag = true;
          return [...post];
        });
      }
    }
  };
  const downvoteHandler = async () => {
    const { data } = await downvotePost(post.id);
    //if post is already downvoted
    if (post.downvoteFlag) {
      const votes = post.votes.filter((vote) => vote.userId != user.id);
      let votesCount = post.votesCount;
      setPosts((post) => {
        post[index].votes = votes;
        post[index].downvoteFlag = false;
        return [...post];
      });
    } else {
      const myVote = post.votes.findIndex((vote) => vote.userId === user.id);
      //if post is upvoted
      if (myVote !== -1) {
        const votes = post.votes.map((vote) => {
          if (vote.userId !== user.id) return vote;
          return { ...vote, value: -1 };
        });
        setPosts((post) => {
          post[index].votes = votes;
          post[index].upvoteFlag = false;
          post[index].downvoteFlag = true;
          return [...post];
        });
      } else {
        //if brand new vote
        const votes = [...post.votes, data.vote];
        setPosts((post) => {
          post[index].votes = votes;
          post[index].downvoteFlag = true;
          return [...post];
        });
      }
    }
  };
  return (
    <Box bg="white" w="full" mx="1em" p="1em" borderRadius={5}>
      <Flex>
        <Flex
          flexDirection="column"
          gap="0.5em"
          marginLeft="1em"
          marginRight="2em"
          alignItems="center"
          justifyContent="center"
        >
          <IconButton
            borderRadius="full"
            variant="ghost"
            colorScheme={post.upvoteFlag ? "green" : "gray"}
            onClick={upvoteHandler}
          >
            <ArrowUpIcon w={5} h={5} />
          </IconButton>
          <Text>{post.votesCount}</Text>
          <IconButton
            borderRadius="full"
            variant="ghost"
            colorScheme={post.downvoteFlag ? "red" : "gray"}
            onClick={downvoteHandler}
          >
            <ArrowDownIcon w={5} h={5} />
          </IconButton>
        </Flex>

        <Flex flexDirection="column" gap="1em" w="full">
          <Flex alignItems="center" justifyContent="space-between">
            <ReactLink to={"/post/" + post.id}>
              <Heading as="h3" size="md" fontWeight="500">
                {post.title}
              </Heading>
            </ReactLink>
            <Menu>
              <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<AiOutlineEllipsis size="1.5em" />}
                variant="ghost"
                size="sm"
              ></MenuButton>
              <MenuList>
                {post.isOwner && (
                  <MenuItem onClick={deletePostHandler}>Delete Post</MenuItem>
                )}
              </MenuList>
            </Menu>
          </Flex>
          <ReactLink to={"post/" + post.id}>
            <Text as="p" noOfLines={3}>
              {post.postBody}
            </Text>
          </ReactLink>

          <Divider />

          <Flex alignItems="center" justifyContent="space-between">
            <Flex direction="column" align="center" gap="0.5em">
              {post.Theme && (
                <ReactLink to={"/themes/" + post.Theme.id}>
                  <Text size="sm">
                    In <Tag>{post.Theme.title}</Tag>
                  </Text>
                </ReactLink>
              )}
              <Flex alignItems="center" gap="0.5em">
                <Avatar size="xs" name={post.author.username} />
                <Text fontSize="sm">
                  Posted by{" "}
                  <Link
                    as={ReactLink}
                    to={"user/" + post.author.username}
                    color="blue"
                  >
                    {post.author.username}
                  </Link>
                </Text>
              </Flex>
            </Flex>
            <Text fontSize="sm" opacity="50%">
              6h ago
            </Text>
            <Text fontSize="sm" opacity="50%">
              <ChatIcon /> {post.comments.length}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Post;
