import Order from "../models/order.js";
import Product from "../models/product.js";

//place oder using the COD -/api/order/cod;
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length) {
      return req.json({
        success: false,
        message: "invalid data",
      });
    }
    //calculate amount using items;
    let amount = await items.reduce(async (acc, item) => {
      // const product=await product.findById()
      const product = await Product.findById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);
    //add tax charge (2%)
    amount += Math.floor(amount * 0.02);
    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.json({
      success: true,
      message: "Order placed successfully",
    });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

//order detail of individual user by their ID;
//path: /api/order/user;
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

//order detail of all users
//path: /api/order/seller;
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};
