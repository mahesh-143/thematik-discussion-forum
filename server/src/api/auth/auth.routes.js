import { Router } from "express"
const router = Router()

import { v4 as uuidv4 } from "uuid"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


import { generateTokens } from "../../utils/jwt.js"
import {
  addRefreshTokenToWhitelist,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens
} from "./auth.services.js"
import {
  findUserByEmail,
  createUser,
  findUserByUsername,
  findUserById
} from "../users/users.services.js"
import hashToken from "../../utils/hashToken.js"
import db from "../../utils/db.js"
import { sendAccountVerificationMail } from "../../utils/mail.js"


router.post("/register", async (req, res, next) => {
  try {
    const { email, username, password } = req.body
    console.log("entered email :", email)
    if (!email || !password || !username) {
      res.status(400)
      throw new Error("You must fill in the details.")
    }
    const userExist = await findUserByEmail(email)
    if (userExist) {
      res.status(400)
      throw new Error("Email already in use")
    }
    const usernameExist = await findUserByUsername(username)
    if (usernameExist) {
      res.status(400)
      throw new Error("username is taken, use different username")
    }
    const { password: userPassword, ...user } = await createUser({ email, username, password })
    sendAccountVerificationMail(user, userPassword)
    res.json({message: 'Please verify your email' })
  } catch (err) {
    next(err)
  }
})
router.post('/login', async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400);
      throw new Error('You must provide an email and a password.');
    }

    const existingUser = await findUserByEmail(email);

    if (!existingUser) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);
    if (!validPassword) {
      res.status(403);
      throw new Error('Invalid login credentials.');
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: existingUser.id });
    const { password: _, ...user } = existingUser
    res.json({
      accessToken,
      refreshToken,
      user
    });
  } catch (err) {
    next(err);
  }
});

router.post('/refreshToken', async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      res.status(400);
      throw new Error('Missing refresh token.');
    }
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const savedRefreshToken = await findRefreshTokenById(payload.jti);
    if (!savedRefreshToken || savedRefreshToken.revoked === true) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const hashedToken = hashToken(refreshToken);
    if (hashedToken !== savedRefreshToken.hashedToken) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    const user = await findUserById(payload.userId);
    if (!user) {
      res.status(401);
      throw new Error('Unauthorized');
    }

    await deleteRefreshToken(savedRefreshToken.id);
    const jti = uuidv4();
    const { accessToken, refreshToken: newRefreshToken } = generateTokens(user, jti);
    await addRefreshTokenToWhitelist({ jti, refreshToken: newRefreshToken, userId: user.id });

    res.json({
      accessToken,
      refreshToken: newRefreshToken
    });
  } catch (err) {
    next(err);
  }
});
router.post('/verify/:id/:token', async (req, res, next) => {
  try {
    const user = await findUserById(req.params.id)
    if (!user) {
      res.status(500);
      throw new Error('Something went wrong');
    }
    const decoded = jwt.verify(req.params.token, process.env.JWT_VERIFY_SECRET + user.password)
    if (decoded.id != user._id) throw new Error()
    const updatedUser = await db.user.update({ where: { id: user.id }, data: { verified: true } })
    const jti = uuidv4()
    const { accessToken, refreshToken } = generateTokens(updatedUser, jti)
    await addRefreshTokenToWhitelist({ jti, refreshToken, userId: updatedUser.id })
    const { password: _, ...passwordLessUser } = updatedUser
    res.json({
      accessToken,
      refreshToken,
      user: { ...passwordLessUser }
    })
  } catch (err) {
    next(err)
  }
})

export default router
