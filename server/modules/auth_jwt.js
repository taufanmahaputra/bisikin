import jwt from 'jsonwebtoken'
import Config from '../config'

const verifyTokenRequest = (req, res, next) => {
  const bearerHeader = req.headers["authorization"]

  if (typeof bearerHeader !== 'undefined') {
    const bearer = bearerHeader.split(" ")
    const bearerToken = bearer[1]

    try {
      const result = jwt.verify(bearerToken, Config.auth.jwt_secret_key);

      req.company = result
      next()
    } catch(err) {
      console.log(err)
      res.status(403).json({message: `Forbidden. You didn't have permission`})
    }
  } else {
    res.status(403).json({message: `Forbidden. You didn't have permission`})
  }
}

export {
  verifyTokenRequest
}