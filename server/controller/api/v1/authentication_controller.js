import jwt from 'jsonwebtoken'
import Config from '../../../config'
import Repo from '../../../resources/postgre'
import {createHash, isValidHashPassword} from '../../../utils/hash'

const handleRegister = async (req, res) => {
  try {
    req.body.password = createHash(req.body.password)

    await Repo.insertCompany(req.body)

    res.status(201).json({message: 'OK'})
  } catch (e) {
    console.log(e)

    res.status(400).json({message: 'Either email or username already exists'})
  }
}

const handleLogin = async (req, res) => {
  const { rows } = await Repo.getCompanyByEmailOrToken(req.body.input)
  const user = rows[0]

  if (user === undefined) {
    return res.status(400).json({message: 'Data not found. Please check your email or username'})
  }

  const hash = createHash(req.body.password)
  if (!isValidHashPassword(user.password, hash)) {
    return res.status(401).json({message: 'Password invalid'})
  }

  const token = jwt.sign(user, Config.auth.jwt_secret_key, { expiresIn: '24h' })
  return res.status(200).json({message: 'OK', token: token})
}

export {
  handleRegister,
  handleLogin
}