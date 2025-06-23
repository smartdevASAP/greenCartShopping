import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      reference: "user",
    },
    items: [
      {
        product: {
          type: String,
          required: true,
          reference: "product",
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],

    amount: {
      type: Number,
      required: true,
    },
    address: {
      type: String,
      required: true,
      reference: "address",
    },
    status: {
      type: String,
      defult: "order placed",
    },
    paymentType: {
      type: String,
      required: true,
    },
    isPaid: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  { timestamps: true }
);
//creating a model from the sche,a
const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
