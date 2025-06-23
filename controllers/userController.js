import user from "../models/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register user in the DB:- /api/user/register;
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({
        status: "fail",
        message: "missing details in the form",
      });
    }
    //supposing the data is already available in the form;
    const existingUser = await user.findOne({ email });

    if (existingUser) {
      return res.json({
        status: "fail",
        message: "user already exists in the DB",
      });
    }
    //supposing the user dont exists in the DB -we create the user;
    const hashedPassword = await bcrypt.hash(password, 10);
    //new user to be stored in the database

    /*MAJOR CAUSE OF A BUG */
    const newUser = await user.create({
      name,
      email,
      password: hashedPassword,
    });
    //creating a user & a token for the user;
    //JWT has 3 section  .1)header.2)payload .3)signature
    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //make a cookie and keep the token in the cookie;
    res.cookie("token", token, {
      httpOnly: true, //prevents js to access the cookie
      secure: process.env.NODE_ENV === "production", //return a boolean value -meaning it will use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection;
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expires in 7 days;
    });
    /*up here 👆 i have set cookies in the response*/
    //send the response to FRONTEND/user
    return res.json({
      success: true,
      /* A BUG MAY RISE HERE*/
      user: {
        email: newUser.email,
        name: newUser.name,
      },
    });
  } catch (err) {
    res.json({
      success: false,
      message: err.message,
    });
  }
};
//LOGIN FUNCTION;-/api/user/login
export const login = async (req, res) => {
  try {
    //required: .1)email .2)password
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        success: false,
        message: "email and password are required",
      });
    }
    const loggedUser = await user.findOne({ email });
    if (!loggedUser) {
      return res.json({
        success: false,
        message: "invalid email or password",
      });
    }
    //COMPARING THE PASSWORD IN THE REQUEST BODY AND THE PASSWORD IN THE DATABASE; using bcrypt.compare
    const isMatch = await bcrypt.compare(password, loggedUser.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "invalid email or password",
      });
    }
    //if ismatch.--we generate a token
    const token = jwt.sign({ id: loggedUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    //make a cookie and keep the token in the cookie;
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection;
      maxAge: 7 * 24 * 60 * 60 * 1000, // cookie expires in 7 days;
    });

    return res.json({
      success: true,
      /* A BUG MAY RISE HERE*/
      user: {
        email: loggedUser.email,
        name: loggedUser.name,
      },
    });
  } catch (err) {
    console.log("error is " + err.message);
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

//check auth:/api/user/is-auth;
export const isAuth = async (req, res) => {
  try {
    const authUser = await user.findById(req.userId).select("-password");
    return res.json({
      success: true,
      authUser,
    });
  } catch (err) {
    console.log(err.message);
    res.json({
      status: "fail",
      message: err.message,
    });
  }
};

//LOGOUT USER -/api/user/logout;
export const logOut = async (req, res) => {
  try {
    res.clearCookie("token", {
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
//SELLER CONTROLLER FUNCTION;
