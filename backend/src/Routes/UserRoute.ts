import { Router } from "express";
import { UserController } from "../controller/UserController";
import { UserMiddleware } from "../middleware/UserMiddleware";

const userRoute = Router();

userRoute.post('/', UserMiddleware.validUserName,
  UserMiddleware.validPassword, UserController.create);

userRoute.post('/login', UserMiddleware.validLogin, UserController.login);

userRoute.get('/balance', UserMiddleware.validGetBalancer, UserController.getBalance);

export default userRoute;