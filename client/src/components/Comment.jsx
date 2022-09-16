import { Avatar, Box, Button, Divider, Flex, IconButton, Link, Text, useToast, VStack } from "@chakra-ui/react"
import { ArrowUpIcon, ArrowDownIcon, DeleteIcon} from "@chakra-ui/icons"
import { Link as ReactLink } from "react-router-dom"
import { useAuth } from "../Hooks/useAuth"
import { upvoteComment, downvoteComment, deleteComment } from "../Services/Services"

const Comment = ({ comment, setComments, index}) => {
  const {user} = useAuth()
  const toast = useToast()
  const deleteCommentHandler = async () => {
    await deleteComment(comment.id)
    setComments((comments) => comments.filter((_, i) => _.id !== comment.id))
    toast({
      position : "bottom-right",
      title : "Comment Deleted.",
      status : "success",
    })
  }
  const upvoteHandler = async () => {
    const { data } = await upvoteComment(comment.id)

    //if comment is already upvoted
    if (comment.upvoteFlag) {
      const votes = comment.votes.filter((vote) => vote.userId != user.id)
      setPosts((comment) => {
        comment[index].votes = votes
        comment[index].upvoteFlag = false
        return [...comment]
      })
    } else {
      //if comment is not upvoted
      const myVote = comment.votes.findIndex((vote) => vote.userId === user.id)
      //if comment is downvoted
      if (myVote !== -1) {
        const votes = comment.votes.map((vote) => {
          if (comment.userId !== user.id) return vote
          return { ...vote, value: 1 }
        })
        setComments((comment) => {
          comment[index].votes = votes
          comment[index].upvoteFlag = true
          comment[index].downvoteFlag = false
          return [...comment]
        })
      } else {
        //if brand new vote
        const votes = [...comment.votes, data.vote]
        setComments((comment) => {
          comment[index].votes= votes
          comment[index].upvoteFlag = true
          return [...comment]
        })
      }
    }
  }
  const downvoteHandler = async () => {
    const { data } = await downvoteComment(comment.id)
    //if comment is already downvoted
    if (comment.downvoteFlag) {
      const votes = comment.votes.filter((vote) => vote.userId != user.id)
      let votesCount = comment.votesCount
      setComments((comment) => {
        comment[index].votes = votes
        comment[index].downvoteFlag = false
        return [...comment]
      })
    } else {
      const myVote = comment.votes.findIndex((vote) => vote.userId === user.id)
      //if post is upvoted
      if (myVote !== -1) {
        const votes = comment.votes.map((vote) => {
          if (vote.userId !== user.id) return vote
          return { ...vote, value: -1 }
        })
        setComments((comment) => {
          comment[index].votes = votes
          comment[index].upvoteFlag = false
          comment[index].downvoteFlag = true
          return [...comment]
        })
      } else {
        //if brand new vote
        const votes = [...comment.votes, data.vote]
        setComments((comment) => {
          comment[index].votes = votes
          comment[index].downvoteFlag = true
          return [...comment]
        })
      }
    }
  }

  return (
    <Box w="100%">
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
            colorScheme={comment.upvoteFlag ? "green" : "gray"}
            onClick={upvoteHandler}
          >
            <ArrowUpIcon w={5} h={5} />
          </IconButton>
          <Text>{comment.votesCount}</Text>
          <IconButton
            borderRadius="full"
            variant="ghost"
            colorScheme={comment.downvoteFlag ? "red" : "gray"}
            onClick={downvoteHandler}
          >
            <ArrowDownIcon w={5} h={5} />
          </IconButton>
        </Flex>
        <VStack gap="0.5em">
          <Flex alignItems="center" gap="0.5em" alignSelf="start">
            <Avatar size="sm" name={comment.user.username} />
            <Text fontSize="sm">
              <Link as={ReactLink} to="" color="blue">
                {comment.user.username}
              </Link>
            </Text>
            <Text opacity="50%" fontSize="sm">
              6h ago
            </Text>
            {
              comment.isOwner && (
                <IconButton variant="ghost" opacity="50%" onClick={deleteCommentHandler}><DeleteIcon w={4} h={4}/></IconButton>
              )
            }
          </Flex>
          <Text>{comment.message}</Text>
        </VStack>
      </Flex>
      <Divider mt="1em"/>
    </Box>
  )
}

export default Comment
