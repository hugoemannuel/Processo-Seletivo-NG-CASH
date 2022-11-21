import { Response, Request } from "express";
import { TransactionsService } from "../services/TransactionsService";

const getAll = async (req: Request, res: Response) => {
  const { id } = req.query;
  const { message, status } = await TransactionsService.getAll(Number(id));
  return res.status(status).json(message);
}

export const TransactionsContrroler = {
  getAll,
}