import { Router } from "express";
import { TransactionsContrroler } from "../controller/TransactionsContrroler";
import { TransactionsMiddleware } from "../middleware/TransactionsMiddleware";


const TransactionsRouter = Router();


TransactionsRouter.get('/');

TransactionsRouter.get('/', TransactionsMiddleware.validToken, TransactionsContrroler.getAll)

export default TransactionsRouter;