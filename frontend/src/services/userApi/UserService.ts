import GenericException from "../../shared/error/GenericException";
import { ITransaction, IUserPaymen, IUserToken } from "../../shared/interface";
import { API } from "../API";

const loginUser = async (username: string, password: string): Promise<string> => {
  try {
    const { data } = await API.post('/users/login', { username, password });
    return data.token
  } catch (error: any) {
    throw new GenericException(error)
  }
};

const createUser = async (username: string, password: string): Promise<void> => {
  try {
    await API.post('/users', { username, password });
  } catch (error: any) {
    throw new GenericException(error)
  }
};

const getBalance = async (username: string, token: string): Promise<IUserToken> => {
  try {
    const { data } = await API.get(`/users/balance?username=${username}`, {
      headers: {
        'Authorization': token,
      }
    });

    return data
  } catch (error: any) {
    throw new GenericException(error)
  }
}

const getTransaction = async (id: number, token: string): Promise<ITransaction[]> => {
  try {
    const { data } = await API.get(`/transaction?id=${id}`, {
      headers: {
        'Authorization': token,
      }
    })
    return data
  } catch (error: any) {
    throw new GenericException(error)
  }
}


const createTransaction = async (userPaymen: IUserPaymen, userReceive: string, token: string) => {
  try {
    await API.put('/account/pay', {
      userPaymen,
      userReceive,
    }, {
      headers: {
        'Authorization': token,
      }
    })
  } catch (error: any) {
    throw new GenericException(error)
  }
}

export const UserService = {
  loginUser,
  createUser,
  getBalance,
  getTransaction,
  createTransaction,
};