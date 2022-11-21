import { Response, Request, NextFunction } from "express";
import { AccountUtils } from "../utils/AccountUtils";
import { Crypt } from "../utils/Crypt";
import { UserUtils } from "../utils/UserUtils";

// validar se existe token, validar usuario existe

const validPay = async (req: Request, res: Response, next: NextFunction) => {
  const { userPaymen, userReceive } = req.body;
  if (!userPaymen.username || !userReceive) return res.status(400).json({ message: 'Bad Request' });
  if (userPaymen.username === userReceive) return res.status(400).json({ message: 'Bad Request' });

  const { userPay, userRecive, message, status } = await AccountUtils.getPayment(userPaymen, userReceive);

  if (message || status) return res.status(status).json(message);

  if (!userPay || !userRecive) {
    return res.status(400).json({ message: 'Bad Request' });
  }

  if (Number(userPay.balance) < userPaymen.balance) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  if (Number(userPay.balance) <= 0) return res.status(400).json({ message: 'Bad Request' });

  if (userPaymen.balance <= 0) {
    return res.status(400).json({ message: 'Bad Request' });
  }
  next()
}

const validToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Unauthorized' })
  const valid = Crypt.decriptedToken(authorization)
  if (!valid) return res.status(401).json({ message: 'Unauthorized' })
  next()
}


export const AccountMiddleware = {
  validPay,
  validToken,
}