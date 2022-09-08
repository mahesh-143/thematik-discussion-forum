import { Router } from "express"
import db from "../../utils/db.js"
import { findUserById } from "../users/users.services.js"
import isAuth from "../../middlewares/isAuth.js"
const router = Router()

router.post("/makepost", isAuth, async (req, res, next) => {
  try {
    const id = req.user.userId
    const author = await findUserById(id)
    const { title, postBody, theme } = req.body
    const newPost = await db.post.create({
      data: {
        title,
        postBody,
        Theme: theme ? { connect: { id: theme } } : undefined,
        author: { connect: { id: author.id } },
      },
    })
    return res.status(200).json({ message: "Post created", newPost })
  } catch (err) {
    next(err)
  }
})

router.delete(`/:id`, isAuth, async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await db.post.delete({
      where: { id },
    })
    return res.status(200).json({ message: "Post deleted", post })
  } catch (err) {
    next(err)
  }
})

router.get(`/all`, async (req, res, next) => {
  try {
    const posts = await db.post.findMany({
      include: {
        Theme: true,
        votes: true,
        comments : true,
        author: {
          select: {
            username: true,
          },
        },
      },
    })
    return res.status(200).json({ posts })
  } catch (err) {
    next(err)
  }
})

router.get(`/:id`, async (req, res, next) => {
  try {
    const { id } = req.params
    const post = await db.post.findUnique({
      where: { id },
      select: {
        title: true,
        postBody: true,
        authorId: true,
        votes: true,
        author : {
          select: {
            username : true,
          }
        },
        comments: {
          orderBy: {
            createdAt: "desc",
          },
          select : {
            id: true,
        message: true,
        parentId : true,
        createdAt: true,
          }
        },
      },
    })
    if (!post) {
      return res.status(404).json({ message: "post doesn't exist or deleted" })
    }

    return res.status(200).json({ post })
  } catch (err) {
    next(err)
  }
})

router.post(`/:id/comments`,  async (req, res, next) => {
  try{
    const {message, parentId} = req.body
    const postId = req.params.id

    const uid = '8ca96a49-c65a-4f6e-8f42-556e029e6da6'
    const newComment = await db.comment.create({
      data : 
      {
        message,
        userId: uid,
        parentId : '4059bfbc-fa7b-4e79-8e6a-f3c688cb87a4',
        postId,
      },
      select: {
        id: true,
        message: true,
        parentId : true,
        createdAt: true,
      }
    })
    return res.status(200).json({ message: "Comment created", newComment })
  }
  catch(err) {
    next(err)
  }
})

router.post(`/:id/upvote`, isAuth, async (req, res, next) => {
  try {
    const { id: postId } = req.params
    const { userId } = req.user

    const post = await db.post.findUnique({
      where: { id: postId },
    })
    if (!post) {
      return res.status(404).json({ message: "post doesn't exist or deleted" })
    }
    const isExist = await db.postvote.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    })

    //case: if vote is present and is upvote
    //then delete the upvote
    console.log(isExist)
    if (isExist && isExist.value === 1) {
      await db.postvote.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
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
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
        data: { value: 1 },
      })
      return res.json({ message: "Upvoted", vote })
    }

    //case: if vote doesnt exist
    //then create new upvote
    const vote = db.postvote.create({
      data: {
        post: { connect: { id: postId } },
        author: { connect: { id: userId } },
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
    const { id: postId } = req.params
    const { userId } = req.user

    const post = await db.post.findUnique({
      where: { id: postId },
    })
    if (!post) {
      return res.status(404).json({ message: "post doesn't exist or deleted" })
    }
    const isExist = await db.postvote.findFirst({
      where: {
        userId: userId,
        postId: postId,
      },
    })

    //case: if cote is present and is downvote
    //then delete the downvote
    if (isExist && isExist.value === -1) {
      await db.postvote.delete({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
      })
      return res.json({ message: "Removed downvotevote" })
    }

    //case: if vote is present and is upvote
    //then update upvote into downvote
    if (isExist && isExist.value === 1) {
      const vote = await db.postvote.update({
        where: {
          userId_postId: {
            userId: userId,
            postId: postId,
          },
        },
        data: { value: -1 },
      })
      return res.json({ message: "Downvoted", vote })
    }

    //case: if vote doesnt exist
    //then create new downvote
    const vote = await db.postvote.create({
      data: {
        post: { connect: { id: postId } },
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
