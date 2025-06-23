import jwt from "jsonwebtoken";

export const authSeller = async (req, res, next) => {
  const { sellerToken } = req.cookies;
  if (!sellerToken) {
    return res.json({
      success: false,
      message: "not authorized",
    });
  }

  try {
    //decode the token to extract the id
    const tokenDecode = jwt.verify(sellerToken, process.env.JWT_SECRET);
    if (tokenDecode.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.json({
        sucess: false,
        message: "not authorized",
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};
export default authSeller;
