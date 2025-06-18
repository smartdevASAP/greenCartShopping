import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("Database connected ");
    });
    await mongoose.connect(`${process.env.MONGODB_URI}/greencart`);
  } catch (err) {
    console.error(err.message);
  }
};

export default connectDB;
