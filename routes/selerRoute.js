import express from "express";
import {
  isSellerAuth,
  sellerLogin,
  sellerLogout,
} from "../controllers/sellerController.js";
import authSeller from "../middlewares/authSeller.js";
const sellerRouter = express.Router();

sellerRouter.post("/login", sellerLogin);
//ADD A MIDDLEWARE TO AUTHENTICATE THE SELLER;
sellerRouter.get("/is-auth", authSeller, isSellerAuth);
sellerRouter.get("/logout", sellerLogout);

export default sellerRouter;
