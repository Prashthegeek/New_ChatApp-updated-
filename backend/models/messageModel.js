// const mongoose = require("mongoose");

// const messageSchema = mongoose.Schema(
//   {
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  //an array
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;


// const mongoose = require("mongoose");

// const messageSchema = mongoose.Schema(
//   {
//     sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
//     content: { type: String, trim: true },
//     chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
//     readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // an array
//     type: { type: String, enum: ["text", "file"], default: "text" },  // new field to differentiate between text and file messages
//     file: { type: String },  // new field to store the file path or URL
//   },
//   { timestamps: true }
// );

// const Message = mongoose.model("Message", messageSchema);
// module.exports = Message;



const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(  //each of the document will be an object containing various keys as follows (id will also be attached by mongodb)
  {
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],  // an array
    type: { type: String, enum: ["text", "file"], default: "text" },  // new field to differentiate between text and file messages
    file: { type: String },  // new field to store the file path or URL
    isDeleted: { type: Boolean, default: false }, // Soft delete field
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
