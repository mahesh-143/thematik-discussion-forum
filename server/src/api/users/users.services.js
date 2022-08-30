import bcypt from "bcrypt"
import db from "../../utils/db.js"

const findUserByEmail = (email) => {
  console.log("Entered FindUserByEmail")
  return db.user.findFirst({
    where: {
      email
    },
  })
}

const findUserByUsername = (username) => {
  console.log("found user by username")
  return db.user.findUnique({
    where: {
      username,
    },
  })
}

const createUser = (user) => {
  console.log("entered createUser function")
  user.password = bcypt.hashSync(user.password, 12)
  return db.user.create({
    data: user
  })
}

const findUserById = (id) => {
  return db.user.findUnique({
    where: {
      id,
    },
  })
}

export { findUserByEmail, findUserByUsername, findUserById, createUser }