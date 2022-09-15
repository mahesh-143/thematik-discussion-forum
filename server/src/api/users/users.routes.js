import { Router } from "express"
import isAuthenticated from "../../middlewares/isAuth.js"
import { findUserById } from "./users.services.js"
import db from "../../utils/db.js"


const router = Router()

router.get("/profile", isAuthenticated, async (req, res, next) => {
    try {
        console.log(req.user);
        const { password: _, ...user } = await findUserById(req.user.userId)
        res.json({ profile: { ...user } })
    } catch (err) {
        next(err)
    }
})

router.get("/:username", async (req, res, next) => {
    try{
        const { username } = req.params
        const user = await db.user.findUnique({
          where: { username },
          include: {
            post: {
              select : {
                id: true,
                votes : true,
                title : true,
                postBody : true,
                comments : true,
                author : {
                  select  : {
                    username : true,
                  }
                }
              }
            }
          }
        })
    
        if (!user) {
          return res.status(404).json({ message: "user doesn't exist or deleted" })
        }
    
    
        return res.status(200).json({ user })

    }
    catch (err) {
        next(err)
    }
})


export default router