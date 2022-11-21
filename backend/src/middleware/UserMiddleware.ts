import { Response, Request, NextFunction } from "express";
import { Crypt } from "../utils/Crypt";
import { UserUtils } from "../utils/UserUtils";

const validUserName = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  if (!username) return res.status(404).json({ message: 'name cannot be empty' });
  const valid = await UserUtils.getUser(username)
  if (valid[0]) return res.status(404).json({ message: 'Username already taken' })
  if (username.length <= 2) return res.status(404).json({ message: 'username must be longer than 3 characters' })
  next();
};

const validPassword = async (req: Request, res: Response, next: NextFunction) => {
  const { password } = req.body;
  if (password.length <= 7) return res.status(404).json({ message: 'password must be longer than 8 characters' })
  next();
};

const validLogin = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const valid = await UserUtils.getUser(username);
  if (!valid[0]) return res.status(401).json({ message: 'User not exist' })
  next();
};

const validGetBalancer = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Unauthorized' })
  const valid = Crypt.decriptedToken(authorization)
  if (!valid) return res.status(401).json({ message: 'Unauthorized' })
  next()
};

export const UserMiddleware = {
  validUserName,
  validPassword,
  validLogin,
  validGetBalancer,
}