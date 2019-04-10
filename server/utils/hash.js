import * as Crypto from "crypto"

const createHash = (password) => {
  const hash = Crypto.createHash('sha256')

  hash.update(password)
  return hash.digest('hex')
}

const createHashPassword = () => {
  const hash = Crypto.createHash('sha256')

  const password = Math.floor(1000 + Math.random() * 9000).toString()
  hash.update(password)

  const passwordHash = hash.digest('hex')

  return {password, passwordHash}
}

const isValidHashPassword = (passwordHash, hash) => {
  return passwordHash === hash
}

export {
  createHash,
  createHashPassword,
  isValidHashPassword
}