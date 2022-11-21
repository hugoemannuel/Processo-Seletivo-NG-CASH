require('dotenv/config');

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = process.env.SECRET || 'secret'

const jwtConfig = {
  expiresIn: '1d',
  algorithm: 'HS256'
}

const encripted = async (password: string) => {
  const encriptedPass = await bcrypt.hash(password, 16);
  return encriptedPass;
}

const createToken = async (username: string, password: string) => {
  const payload = {
    data: {
      username,
      password
    }
  }
  const token = await jwt.sign(payload, secret, jwtConfig)
  return token
}

const decriptedToken = (token: string | string[]) => {
  const decriptedToken = jwt.verify(token, secret)
  return decriptedToken
}

export const Crypt = {
  encripted,
  createToken,
  decriptedToken
}