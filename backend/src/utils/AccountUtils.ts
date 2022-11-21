import { UserUtils } from "./UserUtils";

const { User, Account } = require('../database/models');

export interface IUser {
  username: string;
  balance: number;
}

const getPayment = async (userPaymen: IUser, userReceive: string) => {
  try {

    const userPayIdAccount = await User.findOne({
      where: { username: userPaymen.username },
      attributes: { exclude: ["username", "password", "id"] }
    });


    const userReciveIdAccount = await User.findOne({
      where: { username: userReceive },
      attributes: { exclude: ["username", "password", "id"] }
    });

    if (!userPayIdAccount || !userReciveIdAccount) {
      return {
        status: 400,
        message: 'Bad Request',
      }
    }

    const userPay = await Account.findOne({
      where: { id: userPayIdAccount.accountId },
    });

    const userRecive = await Account.findOne({
      where: { id: userReciveIdAccount.accountId },
    });

    return {
      userRecive,
      userPay,
    };
  } catch (error) {
    return {
      status: 400,
      message: 'Bad Request',
    };
  }

}

export const AccountUtils = {
  getPayment,
}
