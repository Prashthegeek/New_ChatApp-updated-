const express = require("express");
const {
  allUsers, 
  verifyOtp,
  resendOtp,
  login,
  signup,
  updatePic
} = require("../controllers/userControllers");
const { protect } = require("../middleware/authMiddleware");
// const passportSetup = require('../config/passport-setup')  //this needs to be in server.js
const passport= require('passport');
const jwt = require('jsonwebtoken');

const router = express.Router();


//one way to define routes-> router.route("").get/post(where you wanna refer)
//other way is directly -> router.get/post("",where you wanna refer)

router.route("/").get(protect, allUsers);
router.route("/").post(signup);//form data from signup.jsx will be posted here.
router.post("/login", login);

// Add routes for otp verification via email 
router.post("/verify-otp", verifyOtp);  // Verify email with token

// New route for resending verification email
router.post("/resend-otp", resendOtp);

//route for updating the pic
router.put("/update-pic",protect,updatePic);



//get request(for oAuth2.0)
router.get('/google',passport.authenticate('google',{  //passport.authenticate('google') will open the google consent screen
  scope:['profile','email']  //the information i want to have from google 
}));  //api/auth/google

//callback
router.get('/google/redirect', passport.authenticate('google') , (req,res)=>{//middleware passport.authentical('google') will authenticate the code  in the url with google and then will go/run the  googleStrategy callback before running the code inside this block
  // Assuming req.user contains the authenticated user details from Google
  const user = req.user;  // Contains user information like id, name, email, etc.

  // Generate a JWT token
  const token = jwt.sign(
      { id: user.id, name: user.name, email: user.email }, // Payload
      process.env.JWT_SECRET,  // Secret key (stored securely in .env)
      { expiresIn: '1d' }      // Optional: Set the expiration time for the token
  );

  // Redirect the user to the frontend with the token in the URL
  const BASE_URI = process.env.frontendUrl || 'http://localhost:3000';
  console.log("down to base uri")
  const frontendUrl = `${BASE_URI}/google-redirect?token=${token}&id=${user.id}&name=${user.name}&email=${user.email}&pic=${user.pic}`;  //not a dynamic route,?token=... is the part of /google-redirect so , in frontend(in app.jsx) Route path="/google-redirect will do , since, agar direct / ke baad value likhe hote ,then route me /../:something lena parta like in rooms/:roomId ,since, in url / ke direct baad value of roomId was used 
  console.log("down to frontend uri")
  // Redirect to the frontend page with the token and user details
  res.redirect(frontendUrl);
})

module.exports = router;
