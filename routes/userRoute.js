import express from "express";
import {
  isAuth,
  login,
  logOut,
  registerUser,
} from "../controllers/userController.js";
import authUser from "../middlewares/authUser.js";
const userRouter = express.Router();

//register endpoint
userRouter.post("/register", registerUser);
userRouter.post("/login", login);
//ADDING A MIDDLEWARE FIRST;
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logOut);

export default userRouter;
