import db from "../../utils/db.js"
import hashToken from "../../utils/hashToken.js"

const addRefreshTokenToWhiteList = ({ jti, refreshToken, userId }) => {
  return db.refreshToken.create({
    data: {
      id: jti,
      hashedToken: hashToken(refreshToken),
      userId,
    },
  })
}

const findRefreshTokenById = (id) => {
  return db.refreshToken.findUnique({
    where: {
      id,
    },
  })
}

const deleteRefreshToken = (id) => {
  return db.refreshToken.update({
    where: {
      id,
    },
    data: {
      revoked: true,
    },
  })
}

const revokeTokens = (userId) => {
  return db.refreshToken.updateMany({
    where: {
      userId,
    },
    data: {
      revoked: true,
    },
  })
}

export {
  addRefreshTokenToWhiteList,
  findRefreshTokenById,
  deleteRefreshToken,
  revokeTokens,
}
