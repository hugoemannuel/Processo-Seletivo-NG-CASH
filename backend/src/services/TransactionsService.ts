const { Transaction } = require('../database/models');

const getAll = async (id: number) => {
  try {
    const response = await Transaction.findAll({
      where: { debitedAccountId: id },
    })

    return {
      status: 200,
      message: response,
    }
  } catch (error: any) {
    console.log(error);
    return {
      status: 400,
      message: 'Bad Request',
    };
  }
}

export const TransactionsService = {
  getAll,
}