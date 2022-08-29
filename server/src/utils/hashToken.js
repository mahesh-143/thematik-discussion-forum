import crypto from "crypto"

const hashToken = (token) => {
  return crypto.createHash("sha512").update(token).digest("hex")
}

export default hashToken
