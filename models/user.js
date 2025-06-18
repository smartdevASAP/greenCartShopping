import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    cartItems: {
      type: Object,
      //default cart objects will be an empty object..meaning there is nothing in the cart at the time
      default: {},
    },
  },
  { minimize: false }
);

//have to check whether the user model already exists;

const user = mongoose.models.user || mongoose.model("user", userSchema);

export default user;
