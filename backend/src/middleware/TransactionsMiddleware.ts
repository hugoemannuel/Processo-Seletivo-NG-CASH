import { Response, Request, NextFunction } from "express";
import { Crypt } from "../utils/Crypt";

const validToken = (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Unauthorized' })
  const valid = Crypt.decriptedToken(authorization)
  if (!valid) return res.status(401).json({ message: 'Unauthorized' })
  next()
}

export const TransactionsMiddleware = {
  validToken,
}