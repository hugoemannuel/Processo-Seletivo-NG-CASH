import { Response, Request } from "express";
import { UserService } from "../services/UserService";
import { Crypt } from "../utils/Crypt";

const create = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const encriptedPass = await Crypt.encripted(password);
  const { status, message } = await UserService.createUser(username, encriptedPass);
  return res.status(status).json(message)
}

const login = async (req: Request, res: Response) => {
  const { username, password, } = req.body;
  const { status, message } = await UserService.loginUser(username, password);
  return res.status(status).json({ token: message })
}

const getBalance = async (req: Request, res: Response) => {
  const { username } = req.query;

  const { status, message } = await UserService.getUserBalance(username as string);
  return res.status(status).json({ user: message })

}

export const UserController = {
  create,
  login,
  getBalance
}