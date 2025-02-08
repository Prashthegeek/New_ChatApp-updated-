const jwt = require("jsonwebtoken");
const User = require("../models/userModel.js");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {   //frontend se config ke under header ke under and then Authorization ke under information sent, we can access them using req obje
  let token;
  console.log("inside the protect")

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      console.log(token)
      //decodes token id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");   //extracting the id from the token 
      
      next();   //every subsequent middleware or controller in that request's chain (i.e., after the next() call) can access req.user.
    } catch (error) {
      console.log("inside first catch")
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    console.log("inside not token")
    res.status(401);
    throw new Error("Not authorized, no token");
  }

});

module.exports = { protect };
