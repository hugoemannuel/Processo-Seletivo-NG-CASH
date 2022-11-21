import { Router } from "express";
import { AccountController } from "../controller/AccountController";
import { AccountMiddleware } from "../middleware/AccountMiddleware";

const accoutRoute = Router();

accoutRoute.put('/pay', AccountMiddleware.validToken, AccountMiddleware.validPay, AccountController.payment);

export default accoutRoute