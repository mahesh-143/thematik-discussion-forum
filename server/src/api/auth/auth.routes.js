import { v4 as uuidv4} from "uuid"
import { generateTokens } from "../../utils/jwt.js"
import { addRefreshTokenToWhiteList } from "./auth.services.js"
import { Router } from "express"
import {
  findUserByEmail,
  createUser,
  findUserByUsername,
} from "../users/users.services.js"

const router = Router()

router.post("/register", async (req, res, next) => {
  try {
    console.log(req.body)
    const { email, username, password } = req.body
    console.log("entered email :", email)
    if (!email || !password || !username) {
      consoloe.log("form is empty")
      res.status(400)
      throw new Error("You must fill in the details.")
    }
    console.log("form was not empty")
    const userExist = await findUserByEmail(email)
    console.log("exited findUserByEmail function")

    console.log("useExists", userExist)

    if (userExist) {
      res.status(400)
      throw new Error("Email already in use")
    }

    const usernameExist = await findUserByUsername(username)

    if (usernameExist) {
      res.status(400)
      throw new Error("username is taken, use different username")
    }

    const user = await createUser({ email, username, password })
    console.log(user)
    const jti = uuidv4()
    const { accesstoken, refreshToken } = generateTokens(user, jti)
    await addRefreshTokenToWhiteList({ jti, refreshToken, userId: user.id })

    res.json({
      accesstoken,
      refreshToken,
    })
  } catch (err) {
    next(err)
  }
})

export default router
