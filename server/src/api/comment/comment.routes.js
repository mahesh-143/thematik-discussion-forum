import { Router } from "express"
import db from "../../utils/db.js"
import isAuth from "../../middlewares/isAuth.js"
const router = Router()

router.delete(`/:id`, isAuth, async (req, res, next) => {
  try {
    const { id } = req.params
    const comment = await db.comment.findUnique({ where: { id } })
    if(!comment){
      return res.status(404).json({ message: "comment not found" })
    }
    if (comment.userId !== req.user.userId) {
      return res.status(403).json({ message: "Unauthorized" })
    }
    await db.comment.delete({
      where: { id:comment.id },
    })
    return res.status(200).json({ message: "Comment deleted" })
  } catch (err) {
    next(err)
  }
})

router.post(`/:id/upvote`, isAuth, async (req, res, next) => {
    try {
      const { id : commentId } = req.params
      const { userId } = req.user
  
      const comment = await db.comment.findUnique({
        where: { id : commentId },
      })
      if (!comment) {
        return res.status(404).json({ message: "comment doesn't exist or deleted" })
      }
      const isExist = await db.commentvote.findFirst({
        where: {
          userId: userId,
         commentId: commentId,
        },
      })
  
      //case: if vote is present and is upvote
      //then delete the upvote
      if (isExist && isExist.value === 1) {
        await db.commentvote.delete({
          where: {
            userId_commentId: {
              userId: userId,
              commentId: commentId,
            },
          },
        })
        return res.json({ message: "Removed downvotevote" })
      }
  
      //case: if vote is present and is downvote
      //then update upvote into upvote
      if (isExist && isExist.value === -1) {
        const vote = await db.postvote.update({
          where: {
            userId_commentId: {
              userId: userId,
              commentId: commentId,
            },
          },
          data: { value: 1 },
        })
        return res.json({ message: "Upvoted", vote })
      }
  
      //case: if vote doesnt exist
      //then create new upvote
      const vote = await db.commentvote.create({
        data: {
          comment: { connect: { id: commentId } },
          user: { connect: { id: userId } },
          value: 1,
        },
      })
      return res.json({ message: "Upvoted", vote })
    } catch (err) {
      next(err)
    }
  })
  
  router.post(`/:id/downvote`, isAuth, async (req, res, next) => {
    try {
      const { id: commentId } = req.params
      const { userId } = req.user
  
      const comment = await db.comment.findUnique({
        where: { id: commentId },
      })
      if (!comment) {
        return res.status(404).json({ message: "comment doesn't exist or deleted" })
      }
      const isExist = await db.commentvote.findFirst({
        where: {
          userId: userId,
          commentId: commentId,
        },
      })
  
      //case: if cote is present and is downvote
      //then delete the downvote
      if (isExist && isExist.value === -1) {
        await db.commentvote.delete({
          where: {
            userId_postId: {
              userId: userId,
              commentId: commentId,
            },
          },
        })
        return res.json({ message: "Removed downvotevote" })
      }
  
      //case: if vote is present and is upvote
      //then update upvote into downvote
      if (isExist && isExist.value === 1) {
        const vote = await db.commentId.update({
          where: {
            userId_commentId: {
              userId: userId,
              commentId: commentId,
            },
          },
          data: { value: -1 },
        })
        return res.json({ message: "Downvoted", vote })
      }
  
      //case: if vote doesnt exist
      //then create new downvote
      const vote = await db.commentvote.create({
        data: {
          post: { connect: { id: commentId } },
          author: { connect: { id: userId } },
          value: -1,
        },
      })
      return res.json({ message: "Downvotes", vote })
    } catch (err) {
      next(err)
    }
  })
  
  export default router