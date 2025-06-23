import express from "express";
import authUser from "../middlewares/authUser.js";
import { addAddress, getAddress } from "../controllers/addressController.js";

const addressRouter = express.Router();
addressRouter.post("/add", authUser, addAddress);
//may bring a bug;
addressRouter.post("/get", authUser, getAddress);

export default addressRouter;
