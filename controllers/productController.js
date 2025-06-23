import { v2 as cloudinary } from "cloudinary";
import product from "../models/product.js";
//ADD PRODUCT:-/api/product/add
export const addProduct = async (req, res) => {
  try {
    let productData = JSON.parse(req.body.productData);
    const images = req.files;
    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    await product.create({ ...productData, imagesUrl });
    res.json({
      success: true,
      message: "product added",
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

//get PRODUCT:-/api/product/list
export const productList = async (req, res) => {
  try {
    //get poducts from the database
    const products = await product.find({});
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

//get single PRODUCT by id:-/api/product/:id
export const productById = async (req, res) => {
  try {
    //get individual poduct from the database
    const { id } = Request.body;
    const products = await product.findById(id);
    res.json({
      success: true,
      products: products,
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

//change product instock:-/api/product/stock
export const changeStock = async (req, res) => {
  try {
    const { id, inStock } = req.body;
    await product.findByIdAndUpdate(id, { inStock });

    res.json({
      success: true,
      products: "stock updated",
    });
  } catch (err) {
    console.log(err.message);
    return res.json({
      success: false,
      message: err.message,
    });
  }
};
