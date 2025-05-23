const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: { type: "String", required: true },
    email: { type: "String", unique: true, required: true },
    password: { type: "String", required: false },  //requirement is false as signup with google doesn't require password, if it is not made false, then everytime we signup, we'd get error saying paasword is required while signup with google
    pic: {
      type: "String",
      required: false,
      default:
        "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
    },
    isAdmin: {  //shouldn't it store some arrays of group , which he is an admin , afterwards ->i think it is about if the person is app developer or not)
      type: Boolean,
      required: true,
      default: false,
    },
    isVerified: {
      type: Boolean,
      required: true,
      default: false,  // User needs to verify their email
    },
    otp:{
      type :String,
      required: false,
      default: null,
    }
  },
  { timestaps: true }
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);  //changing the prev. password
});

const User = mongoose.model("User", userSchema);

module.exports = User;
