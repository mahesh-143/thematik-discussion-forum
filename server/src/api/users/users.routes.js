import { Router } from "express"
import isAuthenticated from "../../middlewares/isAuth.js"
import { findUserById } from "./users.services.js"


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


export default router