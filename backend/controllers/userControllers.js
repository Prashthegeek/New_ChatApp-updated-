const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");
const UserVerify = require("../models/userVerify.models.js");
const jwt = require('jsonwebtoken');

//for email verification
const nodemailer = require("nodemailer");


// Create the transporter outside the function
const transporter = nodemailer.createTransport({
  service:'gmail',
  auth: {
    user:process.env.EMAIL_USER,
    pass:process.env.EMAIL_PASS,
  },
});

//function to generate opt(will use this in this file only)
const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};



//@description     Get or Search all users
//@route           GET /api/user?search={some person to search}
//@access          Public
exports.allUsers = asyncHandler(async (req, res) => {
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
  res.send(users);
});

//@description     Register new user
//@route           POST /api/user/
//@access          Public
exports.signup = asyncHandler(async (req, res) => {
  const { name, email, password , pic } = req.body;

  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please enter all the fields");
  }	

  try {

    // Check if the user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // If the user is verified, throw an error
      if (existingUser.isVerified) {
        return res.status(400).json({ message: 'Account already exists,Please Login' });  //since, status 400 se bheja hu, so , receiving end me catch block me jaayega and toast will be shown with the description of this message
      } else {
        // If the user is not verified, allow the signup process and resend OTP
        const otp = generateOtp();  //in this file 
        
        existingUser.otp = otp;
        existingUser.name = name; // Update user data with the latest info if necessary
        existingUser.password = password; // Note: hashing should still be handled before save
        await existingUser.save();
        
        // Resend OTP via email
        await transporter.sendMail({
          from:process.env.EMAIL_USER,
          to:email,
          subject: 'Resend OTP for Account Verification',
          text: `Your OTP is ${otp}`,
        });
        return res.status(200).json({ 
          message: 'User exists but is not verified. OTP has been resent.',
          email : existingUser.email 
        });
      }
    }
    //if abhi tak return nhi hua hai,then user doesn't exist
    // If the user doesn't exist, proceed with creating a new one
    const user = await User.create({ name, email, password,pic });
    const otp = generateOtp();
    user.otp = otp;
    await user.save();

    // Send OTP via email
    await transporter.sendMail({
      from:process.env.EMAIL_USER,
      to:email,
      subject: 'Verify your account',
      text: `Your OTP is ${otp}`,
    });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
      message: "Registration successful. Please verify your email.",
    });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Server error' });
  }
  });


  

//@description     Auth the user
//@route           POST /api/users/login
//@access          Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    if (!user.isVerified) {
      res.status(401);
      throw new Error("Please verify your email to log in.");  //becoz, sometimes user try to login without verifying the email.
    }
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      pic: user.pic,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});


//-------

// //@description     Send verification email
// //@route           POST /api/user/send-verification-email
// //@access          Public
// const sendVerificationEmail = asyncHandler(async (user, req, res) => {
//   const token = crypto.randomBytes(32).toString("hex");
  

//   await UserVerify.create({
//     userId: user._id,
//     token: token,
//   });

//   // Send email
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: process.env.EMAIL_USER,  // Your email
//       pass: process.env.EMAIL_PASS,  // Your email passkey of the app(can be seen by searching app pass... in the gmail manage (but, this option can only be seen after doing 2 step verification.))
//     },
//   });

//   const mailOptions = {
//     from: process.env.EMAIL_USER,
//     to: user.email,
//     subject: "Email Verification",
//     html: `<h2>Please verify your email</h2>
//            <p>Click <a href="https://chatappfull.onrender.com/${token}">here</a> to verify your email.</p>`,
//   };

//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//       res.status(500).json({ error: "Email could not be sent" });
//     } else {
//       res.status(200).json({ message: "Verification email sent" });
//     }
//   });
// });

//-------




// Verify OTP
exports.verifyOtp = async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || user.otp !== otp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    user.isVerified = true;
    user.otp = undefined; // Clear OTP after verification
    await user.save(); //so, document of this user will be modified (isVerified will be true)
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);
    res.status(200).json({ token, message: 'Account verified' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};



//@description     Resend  otp
//@route           POST /api/user/resend-verification
//@access          Public


//resend otp
exports.resendOtp = async (req, res) => {
    const { email } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: 'User not found' });
      }
      //else
      const otp = generateOtp();
      console.log(otp);
      user.otp = otp;
      await user.save();
  
      // Send OTP via email
      await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Resend OTP for Account Verification',
        text: `Your OTP is ${otp}`,
      });
  
      res.status(200).json({ message: 'OTP resent successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  };
  



  exports.updatePic=asyncHandler(async(req,res)=>{
    console.log("inside update pic")
    const { pic } = req.body; // Expecting a JSON object like { pic: "https://..." }
    
    if (!pic) {
      res.status(400);
      throw new Error("No picture URL provided");
    }

    const user = await User.findById(req.user._id);  //req.user is not passed from the frontend ,but ,it is passed by protect middleware(req.user is created in protect middleware when we did next() ,then since,this updatePic controller follows it ,so,req.user can be used by it .)
    if (user) {
      
      user.pic = pic; // Update the user's profile picture URL
      await user.save();
      res.json({
        message: "Profile picture updated successfully",
        pic: user.pic,
      });
    } else {
      console.log("hello")
      res.status(404);
      
      throw new Error("User not found");
    }
  })


