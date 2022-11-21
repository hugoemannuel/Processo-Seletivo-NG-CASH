import { createContext } from 'react';
import { IUser } from '../shared/interface';

export interface IInfoContext {
  setUser(value: IUser | undefined): void
  user: IUser | undefined,
}

const UserContext = createContext({} as IInfoContext);

export default UserContext;