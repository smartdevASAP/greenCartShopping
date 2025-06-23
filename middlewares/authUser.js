//checking whether the user is logged if Y it will provide the user details;
//extract the id from the token and the token is in the cookies;
//middleware ware to decode the token;👇
import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  //get cookies from the req; and extract token;
  const { token } = req.cookies;
  if (!token) {
    return res.json({
      success: false,
      message: "not authorized",
    });
  }
  //when the token is available;
  try {
    //decode the token to extract the id
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    if (tokenDecode.id) {
      req.userId = tokenDecode.id;
    } else {
      return res.json({
        sucess: false,
        message: "not authorized",
      });
    }
    next();
  } catch (err) {
    return res.json({
      success: false,
      message: err.message,
    });
  }
};

export default authUser;
