import { Crypt } from "../utils/Crypt";
import { UserUtils } from '../utils/UserUtils'

const { User, Account } = require('../database/models/')

const createUser = async (username: string, password: string) => {
  const { id } = await Account.create({ balance: 100 });
  try {
    await User.create({ username, password, accountId: id });
    return {
      status: 201,
      message: 'User created'
    }
  } catch (error: any) {
    await Account.destroy({
      where: { id }
    })
    console.log(error)
    return {
      status: 400,
      message: 'Bad Request'
    }
  }
};

const loginUser = async (username: string, password: string) => {
  try {
    const token = await Crypt.createToken(username, password,);
    return {
      status: 202,
      message: token,
    }
  } catch (error: any) {
    console.log(error)
    return {
      status: 400,
      message: 'Bad Request'
    }
  }
};

const getUserBalance = async (username: string) => {
  try {
    const user = await UserUtils.getUser(username);
    const balance = await Account.findOne({
      where: { id: user[0].accountId }
    });
    return {
      status: 200,
      message: balance
    }

  } catch (error) {
    console.log(error)
    return {
      status: 400,
      message: 'Bad Request'
    }
  }
}

export const UserService = {
  createUser,
  loginUser,
  getUserBalance
}