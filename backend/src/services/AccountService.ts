import { AccountUtils, IUser } from "../utils/AccountUtils";
const { Account, Transaction } = require('../database/models');

const payment = async (userPaymen: IUser, userReceive: string) => {
  try {
    const { userPay, userRecive } = await AccountUtils.getPayment(userPaymen, userReceive);

    await Account.update(
      { balance: (Number(userPay.balance) - userPaymen.balance) },
      { where: { id: userPay.id } }
    )

    await Account.update(
      { balance: Number(userRecive.balance) + userPaymen.balance },
      { where: { id: userRecive.id } }
    )

    await Transaction.create({
      debitedAccountId: userPay.id,
      creditedAccountId: userRecive.id,
      value: userPaymen.balance
    })

    return {
      status: 200,
      message: 'OK'
    };

  } catch (error: any) {
    console.log(error);
    return {
      status: 400,
      message: 'Bad Request',
    };
  }
}

export const AccountService = {
  payment,
};