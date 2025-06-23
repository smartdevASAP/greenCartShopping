import user from "../models/user.js";

//UPDATE USER CART DATA : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const { userId, cartItems } = req.body;
    await user.findByIdAndUpdate(userId, { cartItems });
    res.json({ success: true, message: "cart updated" });
  } catch (err) {
    console.log(err.message);
    res.json({
      status: false,
      mesage: err.message,
    });
  }
};
