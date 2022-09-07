import { Router } from "express"
import isAuth from "../../middlewares/isAuth.js"
import db from "../../utils/db.js"
import { findUserById } from "../users/users.services.js"
const router = Router()

router.post("/createtheme", isAuth, async (req, res, next) => {
  try {
    const id = req.user.userId
    const author = await findUserById(id)
    const { title, description } = req.body
    const theme = await db.theme.create({
      data: {
        title,
        description,
        creator: { connect: { id: author.id } }
      }
    })
    return res.status(200).json({ message: "theme created", theme })
  } catch (err) {
    next(err)
  }
})

router.delete("/theme/:id", isAuth, async (req, res, next) => {
  try {
    const { id } = req.params
    const theme = await db.theme.delete({
      where: { id },
    })


    return res.status(200).json({ message: "theme deleted" })
  } catch (err) {
    next(err)
  }
})


router.get("/all", async (req, res, next) => {
  try {
    const themes = await db.theme.findMany({
      include : {
       post : true,
      }
    })
    return res.status(200).json({ themes })
  } catch (err) {
    next(err)
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params
    const theme = await db.theme.findUnique({
      where: { id },
      select: {
        post: true
      }
    })

    if (!theme) {
      return res.status(404).json({ message: "theme doesn't exist or deleted" })
    }


    return res.status(200).json({ theme })
  } catch (err) {
    next(err)
  }
})


export default router