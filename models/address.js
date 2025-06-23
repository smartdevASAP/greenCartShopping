import mongoose from "mongoose";

const addressSchema = new mongoose.Schema({
  userId: {
    type: String,
    requires: true,
  },
  firstName: {
    type: String,
    requires: true,
  },
  lastName: {
    type: String,
    requires: true,
  },
  email: {
    type: String,
    requires: true,
  },
  street: {
    type: String,
    requires: true,
  },
  city: {
    type: String,
    requires: true,
  },
  state: {
    type: String,
    requires: true,
  },
  zipCode: {
    type: Number,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Address =
  mongoose.models.address || mongoose.model("Address", addressSchema);

export default Address;
