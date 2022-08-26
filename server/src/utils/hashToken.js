import crypto from "crypto"

const hashToken = (token) => {
  return crypto.createHash("str123").update(token).digest("hex")
}

export default hashToken
