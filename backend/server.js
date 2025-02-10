// const cors = require("cors");
// const express = require("express");
// const dotenv = require('dotenv'); // This must be at the top before connectDb
// const connectDB = require("./config/db");
// const userRoutes = require("./routes/userRoutes");
// const chatRoutes = require("./routes/chatRoutes");
// const messageRoutes = require("./routes/messageRoutes");
// const { notFound, errorHandler } = require("./middleware/errorMiddleware");
// const path = require("path");

// dotenv.config({
// 	path: "./.env",
// });
// const app = express();
// // Add CORS middleware before routes
// app.use(cors({
//   origin: "http://localhost:3000",  // Allow frontend to access backend
//   credentials: true,  // Allow cookies/auth headers
// }));

// app.use(express.json()); // to accept json data



// // app.get("/", (req, res) => {
// //   res.send("API Running!");
// // });

// app.use("/api/user", userRoutes);
// app.use("/api/chat", chatRoutes);
// app.use("/api/message", messageRoutes);
// app.use('/uploads', express.static(path.join(__dirname,'../uploads')));  //This ensures that any file in the uploads directory is accessible via the /uploads route. For example, a file stored as uploads/image-12345.png would be accessible at http://localhost:5000/uploads/image-12345.png (assuming your server runs on port 5000).


// // --------------------------deployment------------------------------

// // const __dirname1 = path.resolve();

// // if (process.env.NODE_ENV === "production") {
// //   app.use(express.static(path.join(__dirname1, "/frontend/build")));

// //   app.get("*", (req, res) =>
// //     res.sendFile(path.resolve(__dirname1,"frontend", "build", "index.html")) 
// //   );
// // } else {
// //   app.get("/", (req, res) => {
// //     res.send("API is running..");
// //   });
// //   // app.get("*", (req, res) =>
// //   //   res.sendFile(path.resolve(__dirname1, "frontend" , "index.html"))
// //   // );
// // }

// // --------------------------deployment------------------------------

// // Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);

// const PORT = process.env.PORT ;
// connectDB();
// const server = app.listen(
//   PORT,
//   console.log(`Server running on PORT ${PORT}...`.yellow.bold)
// );

// const io = require('socket.io')(server, {
//   pingTimeout: 60000,          // Keep the timeout
//   pingInterval: 25000,         // Send ping every 25 seconds
//   cors: {
//     origin: "http://localhost:3000", //"https://chatappfull.onrender.com",  // Make sure to replace this with the actual URL if deployed
//     credentials: true,
//   },
//   transports: ['websocket'],   // Force WebSocket connection, no fallback to long-polling
//   allowEIO3: true,             // Compatibility with older clients, useful if clients aren't fully upgraded
// });
 
// io.on("connection", (socket) => {
//   console.log("Connected to socket.io");
//   socket.on("setup", (userData) => {
//     socket.join(userData._id);
//     socket.emit("connected"); 
//   });
 
//   socket.on("join chat", (room) => {  //room is nothing but selectedChat._id sent from frontend
//     socket.join(room);
//   }); 
//   socket.on("typing", (room) => socket.in(room).emit("typing"));  //room is nothing but selectedChat._id sent from frontend

//   socket.on("stop typing", (room) => socket.in(room).emit("stop typing")); //room is nothing but selectedChat._id sent from frontend

 
//   //Send the message to everyone in the room(can be group id)

//   socket.on("new message", (newMessageRecieved) => { 
//     //console.log(newMessageRecieved)
//     const chat = newMessageRecieved.chat;  //in the field chat of newMessageReceived, we have chat (which contains an Id ,the Id of chat), console.log karke deke le(yaha par log karoge,then , since, server hai, so, terminal me result after sending the message in the frontend)
 
//     if (!chat.users) return console.log("chat.users not defined");
     
//     chat.users.forEach((user) => {
//       if (user._id === newMessageRecieved.sender._id) return;
//       socket.in(user._id).emit("message received", newMessageRecieved);
//     });
// });


//   socket.off("setup", () => {
//     console.log("USER DISCONNECTED");
//     socket.leave(userData._id);
//   });
// });



const cors = require("cors");
const express = require("express");
const dotenv = require('dotenv');
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const messageRoutes = require("./routes/messageRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const path = require("path");


//for oAuth
const passportSetup = require('./config/passport-setup')   //even though isska koi use yaha nhi hai here,but, still it is necessary becoz 
//for oAuth to work properly, so, when server.js runs ,then it requires passportSetup from passport-setup.js 
//and which ultimately runs the googleStrategy inside the passport-setup.js
const passport= require('passport');
const session = require('express-session');  //better to use express-session than cookie session, just do changes in app.use(cookiesession)
//part, baaki sab wahi rahega.

dotenv.config({
  path: "./.env",
});

const app = express();


app.use(cors({
  origin: "https://convohub-l7f3.onrender.com",
  credentials: true,
}));

app.use(express.json());




//for o Auth

// Middleware for sessions(must be above the routes declaration,so , routes can use passport session while oauth )
app.use(session({
  secret: 'aifuafjd', // Replace with a strong secret key
  resave: false,      // Avoid saving session if it hasn't been modified
  saveUninitialized: false, // Avoid saving empty sessions
  cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 1 day in milliseconds
      secure: process.env.NODE_ENV === 'docker' || process.env.NODE_ENV === 'production', // Set to true in docker or production
  },
}));
app.use(passport.initialize());
app.use(passport.session()); 




//now, declare the routes (now,they can have the passport sessions,else problem hoga while login/signup with google)
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use('/uploads', express.static(path.join(__dirname,'../uploads')));




// --------------------------deployment------------------------------

const __dirname1 = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname1,"frontend", "build", "index.html")) 
  );
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
  
}

// --------------------------deployment------------------------------

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await connectDB();
    
    const server = app.listen(PORT, () => {
      console.log(`Server running on PORT ${PORT}...`.yellow.bold);
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.log(`Port ${PORT} is busy. Retrying in 5 seconds...`);
        setTimeout(() => {
          server.close();
          server.listen(PORT);
        }, 5000);
      } else {
        console.error('Server error:', error);
      }
    });

    const io = require('socket.io')(server, {
      pingTimeout: 60000,
      pingInterval: 25000,
      cors: {
        origin: "https://convohub-l7f3.onrender.com",
        credentials: true
      } 
    });

    io.on("connection", (socket) => {
      console.log("New client connected:", socket.id);

      socket.on("setup", (userData) => {
        if (!userData?._id) {
          console.log("Invalid user data received");
          return;
        }
        socket.join(userData._id);
        console.log("User joined their room:", userData._id);
        socket.emit("connected");
      });

      socket.on("join chat", (room) => {
        if (!room) {
          console.log("Invalid room ID received");
          return;
        }
        socket.join(room);
        console.log("User joined chat room:", room);
      });

      socket.on("typing", (room) => {
        if (!room) return;
        socket.in(room).emit("typing");
      });

      socket.on("stop typing", (room) => {
        if (!room) return;
        socket.in(room).emit("stop typing");
      });

      socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived?.chat;
        
        if (!chat?.users) {
          console.log("Chat users not found");
          return;
        }

        chat.users.forEach((user) => {
          if (user._id === newMessageReceived.sender._id) return;
          
          socket.in(user._id).emit("message received", newMessageReceived);
        });
      });

      //for delete message
      socket.on("message deleted",({messageId , chatId})  =>{  //listen to this event in SingleChat.js (frontend)(did this to make code more modular ,we are listening to all the socket connections in the singleChat.js), bas ye event emit kiye hum logo ne from scrollablechat.js(becoz,waha par handleDelete function hai,so,wahi se event emit kiye,listen frontend me khi bhi relevant jagah me kar sakte hai(but, did in singlechat.js in order to maintain modularity)) 
        socket.to(chatId).emit("message deleted" , {messageId}) ; //we dont'even need to send the chatId to the other users (since, usska jarurat nahi parega while updating the ui of the other person), chatId ka jarurat kewal server ko hi tha (since, server is centralized ,so it needs to know which chat ka which message we want to delete ) , .to(chatId).emit(...) me jarurat para only .
      })


      socket.on('rename-group', ({chatId, newGroupName,updatedChat,sender}) => {
        // Broadcast to everyone, not just people in the chat
        socket.broadcast.emit("rename-group", {chatId, newGroupName,updatedChat,sender});
      });

      // socket.on('rename-group', ({ chatId, newGroupName, updatedChat, sender }) => {
      //   // Broadcast to all users in the chat except the sender
      //   socket.to(chatId).emit("rename-group", {
      //     newGroupName,
      //     updatedChat,
      //     sender
      //   });
      // });

      socket.on("disconnect", () => {
        console.log("Client disconnected:", socket.id);
      });
    });

    // Cleanup handlers
    const cleanup = () => {
      server.close(() => {
        console.log('Server closed');
        process.exit(0);
      });
    };

    process.on('SIGTERM', cleanup);
    process.on('SIGINT', cleanup);

  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();