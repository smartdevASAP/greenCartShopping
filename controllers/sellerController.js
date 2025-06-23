//SELLER LOGIN FUNCTION; -/api/seller/login
import jwt from "jsonwebtoken";
export const sellerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      password === process.env.SELLER_PASSWORD &&
      email === process.env.SELLER_EMAIL
    ) {
      //generate token jwt
      const token = jwt.sign({ email }, process.env.JWT_SECRET, {
        expiresIn: "7d",
      });
      res.cookie("sellerToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
      return res.json({
        success: true,
        message: "logged in",
      });
    }
    //WHEN THE PASSWORD /EMAIL ARENT MATCHING👇;
    else {
      return res.json({
        success: false,
        message: "invalid credentials",
      });
    }
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

//seller auth:/api/seller/is-auth;
export const isSellerAuth = async (req, res) => {
  try {
    return res.json({
      success: true,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

//seller logout
//LOGOUT SELLER -/api/seller/logout;
export const sellerLogout = async (req, res) => {
  try {
    res.clearCookie("sellerToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });
    return res.json({
      success: true,
      message: "logged out",
    });
  } catch (err) {
    console.log("error is " + err.message);
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};
