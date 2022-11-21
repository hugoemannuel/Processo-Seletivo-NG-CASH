import { Response, Request } from "express";
import { AccountService } from "../services/AccountService";

const payment = async (req: Request, res: Response) => {
  const { userPaymen, userReceive } = req.body;
  const { message, status } = await AccountService.payment(userPaymen, userReceive)

  return res.status(status).json(message)
};


export const AccountController = {
  payment,
};