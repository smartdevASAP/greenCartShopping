import express from "express";
import { upload } from "../configs/multer.js";
import authSeller from "../middlewares/authSeller.js";
import {
  addProduct,
  changeStock,
  productById,
  productList,
} from "../controllers/productController.js";

const productRouter = express.Router();

// productRouter
//   .route("/add")
//   .post(upload.array([images]), authSeller, addProduct);

productRouter.post("/add", upload.array(["images"]), authSeller, addProduct);

productRouter.route("/list").get(productList);
// productRouter.route('/id').get(productById)
productRouter.route("/id").get(productById);
productRouter.route("/stock").post(authSeller, changeStock);

export default productRouter;
