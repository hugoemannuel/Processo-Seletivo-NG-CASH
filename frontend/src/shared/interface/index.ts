export interface IUser {
  name: string;
  token: string;
}

export interface IUserToken {
  user: {
    id: number
    balance: string
  }
}

export interface ITransaction {
  id: number;
  createdAt: string;
  creditedAccountId: number,
  debitedAccountId: number;
  value: string;
}


export interface IUserPaymen {
  username: string;
  balance: number;
}