import cookieParser from "cookie-parser";
import express from "express";
//CORS-CROSSORIGIN RESOURCE SHARING;
import cors from "cors";
import connectDB from "./configs/db.js";
//instead of dotenv.config({path:"/"})
import "dotenv/config";
import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/selerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRouter from "./routes/productRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRouter from "./routes/orderRoute.js";
const app = express();

const port = process.env.PORT_NUMBER || 4000;
await connectDB();
await connectCloudinary();

//ADD THE URLS THAT ARE ALLOWED TO ACCESS YOUR BACKEND;
const allowedOrigins = ["http://localhost:5173"];

//middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

//test whether the API is working well
app.get("/", (req, res) => {
  res.send("Kelvin's API is working and plugged to frontend port 5173 ");
});

//adding routes for different endpoints int the app;
app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRouter);

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
