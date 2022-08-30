import { Router } from "express"
import db from "../../utils/db.js"
import { findUserById } from "../users/users.services.js"
import isAuth from "../../middlewares/isAuth.js"
const router = Router()

router.post("/makepost", isAuth, async (req, res, next) => {
    try {
      const id = "2cbfff57-40d0-43f8-b692-8533853bf977"
      const author = await findUserById(id)
      const themeId = "5547a8ae-6439-47be-a9f9-f3567f4b226e"
      const {title, postBody, theme} = req.body
      const newPost = await db.post.create({
        data : {
          title,
          postBody,
          Theme : {connect: {id : themeId}},
          // author: res.locals.user.id,
          author: {connect: {id : author.id} }
        }
      })
      return res.status(200).json({message: "Post created", newPost})
    } catch (err) {
      next(err)
    }
  })

router.delete(`/post/:id`, isAuth, async (req, res, next) => {
    try {
      const { id } = req.params
      const post = await db.post.delete({
        where: {id},
      })
      return res.status(200).json({message: "Post deleted", post})
    } catch (err) {
      next(err)
    }
  })

router.get(`/post/:id`, async (req, res, next) => {
    try {
      const { id } = req.params
      const post = await db.post.findUnique({
        where: {id},
      })
      if(!post){
        return res.status(404).json({message: "post doesn't exist or deleted"})
    }
    
      return res.status(200).json({post})
    } catch (err) {
      next(err)
    }
  })

  export default router