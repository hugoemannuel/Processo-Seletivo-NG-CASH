import React, { useState } from "react";
import { IUser } from "../shared/interface";
import UserContext, { IInfoContext } from "./UserContext";


const UserProvider: React.FC = ({ children }: any) => {
  const [user, setUser] = useState<IUser>()

  const infoContext: IInfoContext = {
    user,
    setUser
  }

  return (
    <UserContext.Provider value={infoContext}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;