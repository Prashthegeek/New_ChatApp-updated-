// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon, ArrowRightIcon,  AttachmentIcon } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";
// import moment from 'moment';


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment  //it is the link where our server/backend(and yeah, before deployment, we have the options to run the backend /server in the port we want(like 5000, in the server.js)) is running(so,at link we will have our server present/hosted and here we will make the request )
// var socket, selectedChatCompare;  //note ; socket is a variable , not the state.

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);  //when i am typing
//   const [istyping, setIsTyping] = useState(false);  //when other user is typing
//   const [file, setFile] = useState(null); // New state for file
//   const toast = useToast();

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();


//    //** */ Function to handle file selection
//    const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };


//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,  
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);  //Messages is an array
//       setLoading(false);  //spinner will disappear

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


//   //Send the Message(but, I don't just want to send a simple statement, I want all the informations about the users as well , so backend api me request kiya for some more information . (see the ChatController sendMessage funciton in backend))

//   const sendMessage = async (event) => {  //whenever enter key pressed , the new message goes to backend where it is stored in both the messages field of message collection ]] and latest message field of this chat(find using chatId) inside the chat collection
//     if (event.key === "Enter" && newMessage) { 
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
        
//         const { data } = await axios.post(   //data contains the latestMessage object received from backend after populating the message with the sender's name , pic, email etc
//           "/api/message",  //goes to sendMessage controller function of the message controller
//           {
//             content: newMessage,  //well sending both of them compulsory, becoz , sendMessage field me stated directly ki if a request comes wihtout either content and chatId , then say invlid request
//             chatId: selectedChat,
//           },
//           config
//         );
        
//         //here when i console.log(data) kiya , then in the frontend ka console(means web page ka console me data dekhne milega, when i send the message to anyone) ,so, to other user, i sent the message hello (and then opened the console of the web page, i got to see, data is an object(and has chat(contains the chat id), )) 
//         setNewMessage("");  //* it was written previously before. check this.
        
//         socket.emit("new message", data);  //Now, send this data (or the latest message object ) to the server/backend again so in the new message stream so that it can again emit/broadcast this latest message object(containing name of the sender, email, pic etc) to the other user in the group/other user if one on chat.
//         setMessages([...messages, data]);  //messages: Stores the array of messages in the current chat., appended this latest message in it also(at last index)
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     socket = io(ENDPOINT);  //establish the connection with the server/backend , endpoint contains url where the server is either running /hosted
//     socket.emit("setup", user);  //whenever the logged in user selects a chat ,singlChat compoent is rendered , so content inside the useEffect is executed, and with this line, we are sending the information about the user(userId) to the backend saying this person is connected in one side(since, he selected a chat and single chat component is rendered) 
//     socket.on("connected", () => setSocketConnected(true));  // .on means i am listening to some stream/event named(connected, sent by the backend) and from the backend connected stream is emitted only when a person on the other side is connected(this code was obviously written by me )
//     socket.on("typing", () => setIsTyping(true));  //IsTyping represents the typing other person is doint , so when Istypin is true, other person is typing and we will show the typing animation
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);  //whenever the singlechat component is mounted (for the 1st time only) ya phir jab tak page refresh karte rahoge , then only for the 1st time  content inside the useEffect(or side effect) will be executed  , so , when i refreshed the page(life cycle of this component will start, so, at first mounted phase, so this time, content inside the useEffect will be executed, then during the other phases of the component(like maintaining and demounting , content of useEffect won't be executed again ,since, dependency array is empty) , agar phir se refresh karoge, then again life cycle of this component will start and similarly for the 1st time only(during the mounting phase), this useEffect will run )

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat ; 
//     // eslint-disable-next-line
//   }, [selectedChat]);  // For the 1st time , when the component mounted, then fetchMessage func call , then jab jab selectedChat changes , call the func again.

//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       //console.log karke dekh lo newMessageRecieved kya kya contain karta hai., it has createdAt(which is time stamp)(since, frontend me console kar rahe ho, then after sending message, webpage ka console me result dekhne milega.)
//       const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');  //newMessageRecieved already has a timeStamp field but, it is not formatted, do console.log and see(since, consoling in frontend codebase, so webpage ka console me dikhega after sending the message)
//       const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };  //updated the timeStamp field of the newMessageRecieved
//       console.log("messageWithTimestamp is :", messageWithTimestamp);
      
//       if (  //to show  notification
//         !selectedChatCompare || 
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(messageWithTimestamp)) {
//           setNotification([messageWithTimestamp, ...notification]);
          
//           setFetchAgain(!fetchAgain); 
//         }
//       } else {
//         setMessages([...messages, messageWithTimestamp]);
//       }
//     })
  
//     return () => {
//       socket.off("message received");
//     };
//   }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);
  
  
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}   //show this only on the smaller screen(base) devices and not on the medium screens or larger
//               icon={<ArrowBackIcon />}  //Show it only on the smaller screen devices
//               onClick={() => setSelectedChat("")}  //clicking the arrow  icon will make the selectedchat empty, so , 1st line of this return functio will be changed and the else part will be shown(click on the chats to start)
//             />
//             {messages &&  //This checks if there are any messages. If there are no messages, the rest of the code inside this block will not be executed.
//               (!selectedChat.isGroupChat ? (  //if Not a group chat
//                 <>
//                   {getSender(user, selectedChat.users)}    {/* This function gets the name of the person you’re chatting with (the other user in the chat). */}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}  // This component opens a modal displaying the full profile of the other user. The getSenderFull(user, selectedChat.users) function is used to get detailed information about the other user.

//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName}  {/*This displays the name of the group chat. */}
//                   <UpdateGroupChatModal  //This modal is for updating group chat details like the group name, adding/removing members, etc. The props fetchMessages, fetchAgain, and setFetchAgain are passed to this component to help it manage state and refresh the chat messages if needed.
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"  //This prevents the content from overflowing vertically, hiding any content that doesn't fit.
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (  //if , not loading then , The chat messages are displayed using a ScrollableChat component, which takes the messages as a prop and likely renders them in a scrollable view.
//               <div className="messages">
//                 <ScrollableChat messages={messages} />  {/*this part shows the messages, so, to change the ui of the messages, tackle this */}
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}  //This triggers the sendMessage function whenever a key is pressed in the input field. Usually, this would be used to send a message when the "Enter" key is pressed.
//               id="first-name"
//               isRequired  //id="first-name" and isRequired: These are standard form control attributes. isRequired means the input is required, though this might not be necessary since the user will always type something to send.
//               mt={3}  //This adds margin at the top of the input field.
//             >
//               {istyping ? (  //istyping ?: This checks if the other user is currently typing.
//                 <div>
//                   <Lottie  // A Lottie animation is displayed, which shows a typing indicator.
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (  
//                 <></>  //If false: Nothing is rendered (an empty fragment)
//               )}

//           <IconButton
//             icon={<AttachmentIcon />}
//             onClick={() => document.getElementById('fileInput').click()}
//             aria-label="Attach File"
//           />
//               <Input  //Input Field for Messages
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (  //else part  
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;





// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon, ArrowRightIcon,  AttachmentIcon } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";
// import moment from 'moment';


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment  //it is the link where our server/backend(and yeah, before deployment, we have the options to run the backend /server in the port we want(like 5000, in the server.js)) is running(so,at link we will have our server present/hosted and here we will make the request )
// var socket, selectedChatCompare;  //note ; socket is a variable , not the state.

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);  //when i am typing
//   const [istyping, setIsTyping] = useState(false);  //when other user is typing
//   const [file, setFile] = useState(null); // New state for file
//   const toast = useToast();

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();

// // Update handleFileChange function to handle multiple files
// const handleFileChange = (e) => {
//   setFile(e.target.files[0]);
// };

// const sendFile = async () => {
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("chatId", selectedChat._id);

//   try {
//       const config = {
//           headers: {
//               Authorization: `Bearer ${user.token}`,
//           },
//       };

//       const { data } = await axios.post("/api/message/upload", formData, config);

//       setFile(null); // Clear the file after uploading
//       socket.emit("new message", data);
//       setMessages([...messages, data]);
//   } catch (error) {
//       toast({
//           title: "Error Occured!",
//           description: "Failed to upload the file",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//       });
//   }
// };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,  
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);  //Messages is an array
//       setLoading(false);  //spinner will disappear

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


//   //Send the Message(but, I don't just want to send a simple statement, I want all the informations about the users as well , so backend api me request kiya for some more information . (see the ChatController sendMessage funciton in backend))

//   const sendMessage = async (event) => {  //whenever enter key pressed , the new message goes to backend where it is stored in both the messages field of message collection ]] and latest message field of this chat(find using chatId) inside the chat collection
//     if (event.key === "Enter" && newMessage) { 
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
        
//         const { data } = await axios.post(   //data contains the latestMessage object received from backend after populating the message with the sender's name , pic, email etc
//           "/api/message",  //goes to sendMessage controller function of the message controller
//           {
//             content: newMessage,  //well sending both of them compulsory, becoz , sendMessage field me stated directly ki if a request comes wihtout either content and chatId , then say invlid request
//             chatId: selectedChat,
//           },
//           config
//         );
        
//         //here when i console.log(data) kiya , then in the frontend ka console(means web page ka console me data dekhne milega, when i send the message to anyone) ,so, to other user, i sent the message hello (and then opened the console of the web page, i got to see, data is an object(and has chat(contains the chat id), )) 
//         setNewMessage("");  //* it was written previously before. check this.
        
//         socket.emit("new message", data);  //Now, send this data (or the latest message object ) to the server/backend again so in the new message stream so that it can again emit/broadcast this latest message object(containing name of the sender, email, pic etc) to the other user in the group/other user if one on chat.
//         setMessages([...messages, data]);  //messages: Stores the array of messages in the current chat., appended this latest message in it also(at last index)
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     socket = io(ENDPOINT);  //establish the connection with the server/backend , endpoint contains url where the server is either running /hosted
//     socket.emit("setup", user);  //whenever the logged in user selects a chat ,singlChat compoent is rendered , so content inside the useEffect is executed, and with this line, we are sending the information about the user(userId) to the backend saying this person is connected in one side(since, he selected a chat and single chat component is rendered) 
//     socket.on("connected", () => setSocketConnected(true));  // .on means i am listening to some stream/event named(connected, sent by the backend) and from the backend connected stream is emitted only when a person on the other side is connected(this code was obviously written by me )
//     socket.on("typing", () => setIsTyping(true));  //IsTyping represents the typing other person is doint , so when Istypin is true, other person is typing and we will show the typing animation
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);  //whenever the singlechat component is mounted (for the 1st time only) ya phir jab tak page refresh karte rahoge , then only for the 1st time  content inside the useEffect(or side effect) will be executed  , so , when i refreshed the page(life cycle of this component will start, so, at first mounted phase, so this time, content inside the useEffect will be executed, then during the other phases of the component(like maintaining and demounting , content of useEffect won't be executed again ,since, dependency array is empty) , agar phir se refresh karoge, then again life cycle of this component will start and similarly for the 1st time only(during the mounting phase), this useEffect will run )

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat ; 
//     // eslint-disable-next-line
//   }, [selectedChat]);  // For the 1st time , when the component mounted, then fetchMessage func call , then jab jab selectedChat changes , call the func again.

//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       //console.log karke dekh lo newMessageRecieved kya kya contain karta hai., it has createdAt(which is time stamp)(since, frontend me console kar rahe ho, then after sending message, webpage ka console me result dekhne milega.)
//       const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');  //newMessageRecieved already has a timeStamp field but, it is not formatted, do console.log and see(since, consoling in frontend codebase, so webpage ka console me dikhega after sending the message)
//       const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };  //updated the timeStamp field of the newMessageRecieved
//       console.log("messageWithTimestamp is :", messageWithTimestamp);
      
//       if (  //to show  notification
//         !selectedChatCompare || 
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(messageWithTimestamp)) {
//           setNotification([messageWithTimestamp, ...notification]);
          
//           setFetchAgain(!fetchAgain); 
//         }
//       } else {
//         setMessages([...messages, messageWithTimestamp]);
//       }
//     })
  
//     return () => {
//       socket.off("message received");
//     };
//   }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);
  
  
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}   //show this only on the smaller screen(base) devices and not on the medium screens or larger
//               icon={<ArrowBackIcon />}  //Show it only on the smaller screen devices
//               onClick={() => setSelectedChat("")}  //clicking the arrow  icon will make the selectedchat empty, so , 1st line of this return functio will be changed and the else part will be shown(click on the chats to start)
//             />
//             {messages &&  //This checks if there are any messages. If there are no messages, the rest of the code inside this block will not be executed.
//               (!selectedChat.isGroupChat ? (  //if Not a group chat
//                 <>
//                   {getSender(user, selectedChat.users)}    {/* This function gets the name of the person you’re chatting with (the other user in the chat). */}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}  // This component opens a modal displaying the full profile of the other user. The getSenderFull(user, selectedChat.users) function is used to get detailed information about the other user.

//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName}  {/*This displays the name of the group chat. */}
//                   <UpdateGroupChatModal  //This modal is for updating group chat details like the group name, adding/removing members, etc. The props fetchMessages, fetchAgain, and setFetchAgain are passed to this component to help it manage state and refresh the chat messages if needed.
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"  //This prevents the content from overflowing vertically, hiding any content that doesn't fit.
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (  //if , not loading then , The chat messages are displayed using a ScrollableChat component, which takes the messages as a prop and likely renders them in a scrollable view.
//               <div className="messages">
//                 <ScrollableChat messages={messages} />  {/*this part shows the messages, so, to change the ui of the messages, tackle this */}
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}  //This triggers the sendMessage function whenever a key is pressed in the input field. Usually, this would be used to send a message when the "Enter" key is pressed.
//               id="first-name"
//               isRequired  //id="first-name" and isRequired: These are standard form control attributes. isRequired means the input is required, though this might not be necessary since the user will always type something to send.
//               mt={3}  //This adds margin at the top of the input field.
//             >
//               {istyping ? (  //istyping ?: This checks if the other user is currently typing.
//                 <div>
//                   <Lottie  // A Lottie animation is displayed, which shows a typing indicator.
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (  
//                 <></>  //If false: Nothing is rendered (an empty fragment)
//               )}

//           <IconButton
//             icon={<AttachmentIcon />}
//             onClick={() => document.getElementById('fileInput').click()}
//             aria-label="Attach File"
//           />
//               <Input
//         id="fileInput"
//         type="file"
//         style={{ display: 'none' }}
//         onChange={handleFileChange}
//     />
//     <IconButton
//         icon={<ArrowRightIcon />}
//         onClick={sendFile}
//         aria-label="Send File"
//     />
//               <Input  //Input Field for Messages
//                 variant="filled"
//                 bg="#E0E0E0"
//                 placeholder="Enter a message.."
//                 value={newMessage}
//                 onChange={typingHandler}
//               />
//             </FormControl>
//           </Box>
//         </>
//       ) : (  //else part  
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;







// import { FormControl } from "@chakra-ui/form-control";
// import { Input } from "@chakra-ui/input";
// import { Box, Text } from "@chakra-ui/layout";
// import "./styles.css";
// import { IconButton, Spinner, useToast } from "@chakra-ui/react";
// import { getSender, getSenderFull } from "../config/ChatLogics";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { ArrowBackIcon, ArrowRightIcon,  AttachmentIcon  } from "@chakra-ui/icons";
// import ProfileModal from "./miscellaneous/ProfileModal";
// import ScrollableChat from "./ScrollableChat";
// import Lottie from "react-lottie";
// import animationData from "../animations/typing.json";
// import moment from 'moment';
// import data from '@emoji-mart/data'
// import Picker from '@emoji-mart/react'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faSmile } from '@fortawesome/free-solid-svg-icons';  // Smile icon from Font Awesome


// import io from "socket.io-client";
// import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
// import { ChatState } from "../Context/ChatProvider";
// const ENDPOINT = "http://localhost:5000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment  //it is the link where our server/backend(and yeah, before deployment, we have the options to run the backend /server in the port we want(like 5000, in the server.js)) is running(so,at link we will have our server present/hosted and here we will make the request )
// var socket, selectedChatCompare;  //note ; socket is a variable , not the state.

// const SingleChat = ({ fetchAgain, setFetchAgain }) => {
//   const [messages, setMessages] = useState([]);
//   const [loading, setLoading] = useState(false); 
//   const [newMessage, setNewMessage] = useState("");
//   const [socketConnected, setSocketConnected] = useState(false);
//   const [typing, setTyping] = useState(false);  //when i am typing
//   const [istyping, setIsTyping] = useState(false);  //when other user is typing
//   const [file, setFile] = useState(null); // New state for file
//   const toast = useToast();
//   // Inside your component
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);

//   const defaultOptions = {
//     loop: true,
//     autoplay: true,
//     animationData: animationData,
//     rendererSettings: {
//       preserveAspectRatio: "xMidYMid slice",
//     },
//   };
//   const { selectedChat, setSelectedChat, user, notification, setNotification } =
//     ChatState();


// const addEmoji = (e) => {
//   const emoji = e.native;
//   setNewMessage((prevMessage) => prevMessage + emoji);
// };
// // Update handleFileChange function to handle multiple files
// const handleFileChange = (e) => {
//   setFile(e.target.files[0]);
// };

// const sendFile = async () => {
//   if (!file) return;

//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("chatId", selectedChat._id);

//   try {
//       const config = {
//           headers: {
//               Authorization: `Bearer ${user.token}`,
//           },
//       };

//       const { data } = await axios.post("/api/message/upload", formData, config);

//       setFile(null); // Clear the file after uploading
//       socket.emit("new message", data);
//       setMessages([...messages, data]);
//   } catch (error) {
//       toast({
//           title: "Error Occured!",
//           description: "Failed to upload the file",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//       });
//   }
// };

//   const fetchMessages = async () => {
//     if (!selectedChat) return;

//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,  
//         },
//       };

//       setLoading(true);

//       const { data } = await axios.get(
//         `/api/message/${selectedChat._id}`,
//         config
//       );
//       setMessages(data);  //Messages is an array
//       setLoading(false);  //spinner will disappear

//       socket.emit("join chat", selectedChat._id);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the Messages",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom",
//       });
//     }
//   };


//   //Send the Message(but, I don't just want to send a simple statement, I want all the informations about the users as well , so backend api me request kiya for some more information . (see the ChatController sendMessage funciton in backend))

//   const sendMessage = async (event) => {  //whenever enter key pressed , the new message goes to backend where it is stored in both the messages field of message collection ]] and latest message field of this chat(find using chatId) inside the chat collection
//     if (event.key === "Enter" && newMessage) { 
//       socket.emit("stop typing", selectedChat._id);
//       try {
//         const config = {
//           headers: {
//             "Content-type": "application/json",
//             Authorization: `Bearer ${user.token}`,
//           },
//         };
        
//         const { data } = await axios.post(   //data contains the latestMessage object received from backend after populating the message with the sender's name , pic, email etc
//           "/api/message",  //goes to sendMessage controller function of the message controller
//           {
//             content: newMessage,  //well sending both of them compulsory, becoz , sendMessage field me stated directly ki if a request comes wihtout either content and chatId , then say invlid request
//             chatId: selectedChat,
//           },
//           config
//         );
        
//         //here when i console.log(data) kiya , then in the frontend ka console(means web page ka console me data dekhne milega, when i send the message to anyone) ,so, to other user, i sent the message hello (and then opened the console of the web page, i got to see, data is an object(and has chat(contains the chat id), )) 
//         setNewMessage("");  //* it was written previously before. check this.
        
//         socket.emit("new message", data);  //Now, send this data (or the latest message object ) to the server/backend again so in the new message stream so that it can again emit/broadcast this latest message object(containing name of the sender, email, pic etc) to the other user in the group/other user if one on chat.
//         setMessages([...messages, data]);  //messages: Stores the array of messages in the current chat., appended this latest message in it also(at last index)
//       } catch (error) {
//         toast({
//           title: "Error Occured!",
//           description: "Failed to send the Message",
//           status: "error",
//           duration: 5000,
//           isClosable: true,
//           position: "bottom",
//         });
//       }
//     }
//   };


//   useEffect(() => {
//     socket = io(ENDPOINT);  //establish the connection with the server/backend , endpoint contains url where the server is either running /hosted
//     socket.emit("setup", user);  //whenever the logged in user selects a chat ,singlChat compoent is rendered , so content inside the useEffect is executed, and with this line, we are sending the information about the user(userId) to the backend saying this person is connected in one side(since, he selected a chat and single chat component is rendered) 
//     socket.on("connected", () => setSocketConnected(true));  // .on means i am listening to some stream/event named(connected, sent by the backend) and from the backend connected stream is emitted only when a person on the other side is connected(this code was obviously written by me )
//     socket.on("typing", () => setIsTyping(true));  //IsTyping represents the typing other person is doint , so when Istypin is true, other person is typing and we will show the typing animation
//     socket.on("stop typing", () => setIsTyping(false));

//     // eslint-disable-next-line
//   }, []);  //whenever the singlechat component is mounted (for the 1st time only) ya phir jab tak page refresh karte rahoge , then only for the 1st time  content inside the useEffect(or side effect) will be executed  , so , when i refreshed the page(life cycle of this component will start, so, at first mounted phase, so this time, content inside the useEffect will be executed, then during the other phases of the component(like maintaining and demounting , content of useEffect won't be executed again ,since, dependency array is empty) , agar phir se refresh karoge, then again life cycle of this component will start and similarly for the 1st time only(during the mounting phase), this useEffect will run )

//   useEffect(() => {
//     fetchMessages();

//     selectedChatCompare = selectedChat ; 
//     // eslint-disable-next-line
//   }, [selectedChat]);  // For the 1st time , when the component mounted, then fetchMessage func call , then jab jab selectedChat changes , call the func again.

//   useEffect(() => {
//     socket.on("message received", (newMessageRecieved) => {
//       //console.log karke dekh lo newMessageRecieved kya kya contain karta hai., it has createdAt(which is time stamp)(since, frontend me console kar rahe ho, then after sending message, webpage ka console me result dekhne milega.)
//       const formattedTimestamp = moment(newMessageRecieved.createdAt).format('MMMM Do YYYY, h:mm:ss a');  //newMessageRecieved already has a timeStamp field but, it is not formatted, do console.log and see(since, consoling in frontend codebase, so webpage ka console me dikhega after sending the message)
//       const messageWithTimestamp = { ...newMessageRecieved, createdAt: formattedTimestamp };  //updated the timeStamp field of the newMessageRecieved
//       console.log("messageWithTimestamp is :", messageWithTimestamp);
      
//       if (  //to show  notification
//         !selectedChatCompare || 
//         selectedChatCompare._id !== newMessageRecieved.chat._id
//       ) {
//         if (!notification.includes(messageWithTimestamp)) {
//           setNotification([messageWithTimestamp, ...notification]);
          
//           setFetchAgain(!fetchAgain); 
//         }
//       } else {
//         setMessages([...messages, messageWithTimestamp]);
//       }
//     })
  
//     return () => {
//       socket.off("message received");
//     };
//   }, [messages, notification, selectedChatCompare, fetchAgain, setFetchAgain, setNotification]);
  
  
//   const typingHandler = (e) => {
//     setNewMessage(e.target.value);

//     if (!socketConnected) return;

//     if (!typing) {
//       setTyping(true);
//       socket.emit("typing", selectedChat._id);
//     }
//     let lastTypingTime = new Date().getTime();
//     var timerLength = 3000;
//     setTimeout(() => {
//       var timeNow = new Date().getTime();
//       var timeDiff = timeNow - lastTypingTime;
//       if (timeDiff >= timerLength && typing) {
//         socket.emit("stop typing", selectedChat._id);
//         setTyping(false);
//       }
//     }, timerLength);
//   };

//   return (
//     <>
//       {selectedChat ? (
//         <>
//           <Text
//             fontSize={{ base: "28px", md: "30px" }}
//             pb={3}
//             px={2}
//             w="100%"
//             fontFamily="Work sans"
//             d="flex"
//             justifyContent={{ base: "space-between" }}
//             alignItems="center"
//           >
//             <IconButton
//               d={{ base: "flex", md: "none" }}   //show this only on the smaller screen(base) devices and not on the medium screens or larger
//               icon={<ArrowBackIcon />}  //Show it only on the smaller screen devices
//               onClick={() => setSelectedChat("")}  //clicking the arrow  icon will make the selectedchat empty, so , 1st line of this return functio will be changed and the else part will be shown(click on the chats to start)
//             />
//             {messages &&  //This checks if there are any messages. If there are no messages, the rest of the code inside this block will not be executed.
//               (!selectedChat.isGroupChat ? (  //if Not a group chat
//                 <>
//                   {getSender(user, selectedChat.users)}    {/* This function gets the name of the person you’re chatting with (the other user in the chat). */}
//                   <ProfileModal
//                     user={getSenderFull(user, selectedChat.users)}  // This component opens a modal displaying the full profile of the other user. The getSenderFull(user, selectedChat.users) function is used to get detailed information about the other user.

//                   />
//                 </>
//               ) : (
//                 <>
//                   {selectedChat.chatName}  {/*This displays the name of the group chat. */}
//                   <UpdateGroupChatModal  //This modal is for updating group chat details like the group name, adding/removing members, etc. The props fetchMessages, fetchAgain, and setFetchAgain are passed to this component to help it manage state and refresh the chat messages if needed.
//                     fetchMessages={fetchMessages}
//                     fetchAgain={fetchAgain}
//                     setFetchAgain={setFetchAgain}
//                   />
//                 </>
//               ))}
//           </Text>
//           <Box
//             d="flex"
//             flexDir="column"
//             justifyContent="flex-end"
//             p={3}
//             bg="#E8E8E8"
//             w="100%"
//             h="100%"
//             borderRadius="lg"
//             overflowY="hidden"  //This prevents the content from overflowing vertically, hiding any content that doesn't fit.
//           >
//             {loading ? (
//               <Spinner
//                 size="xl"
//                 w={20}
//                 h={20}
//                 alignSelf="center"
//                 margin="auto"
//               />
//             ) : (  //if , not loading then , The chat messages are displayed using a ScrollableChat component, which takes the messages as a prop and likely renders them in a scrollable view.
//               <div className="messages">
//                 <ScrollableChat messages={messages} />  {/*this part shows the messages, so, to change the ui of the messages, tackle this */}
//               </div>
//             )}

//             <FormControl
//               onKeyDown={sendMessage}  //This triggers the sendMessage function whenever a key is pressed in the input field. Usually, this would be used to send a message when the "Enter" key is pressed.
//               id="first-name"
//               isRequired  //id="first-name" and isRequired: These are standard form control attributes. isRequired means the input is required, though this might not be necessary since the user will always type something to send.
//               mt={3}  //This adds margin at the top of the input field.
//             >
//               {istyping ? (  //istyping ?: This checks if the other user is currently typing.
//                 <div>
//                   <Lottie  // A Lottie animation is displayed, which shows a typing indicator.
//                     options={defaultOptions}
//                     // height={50}
//                     width={70}
//                     style={{ marginBottom: 15, marginLeft: 0 }}
//                   />
//                 </div>
//               ) : (  
//                 <></>  //If false: Nothing is rendered (an empty fragment)
//               )}

// <IconButton
//         icon={<AttachmentIcon />}
//         variant="ghost"
//         aria-label="Attach File"
//         fontSize="24px"
//         marginRight="4px"
//         _hover={{ backgroundColor: 'gray.100' }}
//       />
//     <IconButton
//         icon={<ArrowRightIcon />}
//         onClick={sendFile}
//         aria-label="Send File"
//     />
//     <Input  //Input Field for Messages
//       variant="filled"
//       bg="#E0E0E0"
//       placeholder="Enter a message.."
//       value={newMessage}
//       onChange={typingHandler}
//     />

//               {showEmojiPicker && (
//                 <Picker data={data} onEmojiSelect={addEmoji} />
//               )}
//              <IconButton
//                 icon={<FontAwesomeIcon icon={faSmile} />} // Use Font Awesome emoji icon
//                 onClick={() => setShowEmojiPicker(!showEmojiPicker)}
//                 aria-label="Emoji Picker"
//               />
//     </FormControl>
//           </Box>
//         </>
//       ) : (  //else part  
//         <Box d="flex" alignItems="center" justifyContent="center" h="100%">
//           <Text fontSize="3xl" pb={3} fontFamily="Work sans">
//             Click on a user to start chatting
//           </Text>
//         </Box>
//       )}
//     </>
//   );
// };

// export default SingleChat;

import { useState, useEffect, useRef } from "react";
import { 
  Box, 
  Text, 
  IconButton, 
  Input, 
  Spinner, 
  useToast,
  Image,
  FormControl,
  InputGroup,
  InputRightElement,
  InputLeftElement 
} from "@chakra-ui/react";
import { ArrowBackIcon, ArrowRightIcon, AttachmentIcon, CloseIcon } from "@chakra-ui/icons";
import { getSender, getSenderFull } from "../config/ChatLogics";
import ProfileModal from "./miscellaneous/ProfileModal";
import ScrollableChat from "./ScrollableChat";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import { ChatState } from "../Context/ChatProvider";
import { io } from "socket.io-client";
import Lottie from "react-lottie";
import animationData from "../animations/typing.json";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { SmallAddIcon } from "@chakra-ui/icons";
import axios from "axios";

const ENDPOINT = "http://localhost:5000";

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [file, setFile] = useState(null);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  
  const toast = useToast();
  const emojiPickerRef = useRef();
  const socketRef = useRef();
  const typingTimeoutRef = useRef();
  const { selectedChat, setSelectedChat, user, notification, setNotification } = ChatState();

  const typingAnimationOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" },
  };

  // Initialize socket connection
  useEffect(() => {
    if (!user) return;

    socketRef.current = io(ENDPOINT, {
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
      auth: {
        token: user.token
      }
    });

    socketRef.current.on("connect", () => {
      console.log("Socket connected");
      setSocketConnected(true);
    });

    socketRef.current.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setSocketConnected(false);
      toast({
        title: "Connection Error",
        description: "Unable to connect to chat server",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    });

    socketRef.current.emit("setup", user);

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [user]);

  // Handle socket events
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.on("typing", () => setIsTyping(true));
    socketRef.current.on("stop typing", () => setIsTyping(false));
    socketRef.current.on("message received", handleNewMessage);
    socketRef.current.on("message deleted",({messageId})=>{  //and socket emit is done at scrollable chat , note : jis person ne message delete kiya hai,usska chat update hua due to scrollable chat ka handleDelete func me jo message state update hua   ,and other person in the chat ka ui update hoga becoz of  currently  listening to message deleted event (right now),where we are updating the messages state(so, re-render hoga) of other persons frontend in the chat ,due to re-render , jsx -> uss messages ke jagah "the message is deleted "print karega jiska isDeleted true hai. 
      setMessages((prevMessages) =>  //inside the setter func ,we can have 1 parameter and this parameter will refer to the current value of the state variable.since, it is setMessage ,so , prevMessage(parameter) refers to the current value of the Message state  
        prevMessages.map((msg) =>
          msg._id === messageId ? { ...msg, isDeleted: true } : msg
        )
      ); 
      setFetchAgain((prev)=> !prev) ;//whatever is the current value of fetchAgain , just toggle it ,paramter inside the setter func holds the current value of the state,used becoz of concept of lifting state up , parent component of chatPage will re-render ,so child components(mychats ->left side wala and chatBox->right side wala bhi re-render karega,my main aim was to re-render the left side wala)    
    })
    return () => {
      socketRef.current.off("typing");
      socketRef.current.off("stop typing");
      socketRef.current.off("message received");
      socketRef.current.off("message deleted")
    };
  }, [selectedChat]);

  // Handle new message received
  const handleNewMessage = (newMessageReceived) => {
    if (!selectedChat || selectedChat._id !== newMessageReceived.chat._id) {
      if (!notification.includes(newMessageReceived)) {
        setNotification([newMessageReceived, ...notification]);
      }
    } else {
      setMessages(prev => [...prev, newMessageReceived]);
    }
    setFetchAgain((prev)=> !prev) ;//whatever is the current value of fetchAgain , just toggle it ,paramter inside the setter func holds the current value of the state,used becoz of concept of lifting state up , parent component of chatPage will re-render ,so child components(mychats ->left side wala and chatBox->right side wala bhi re-render karega,my main aim was to re-render the left side wala)
  };

  // Add emoji to message
  const addEmoji = (e) => {
    const emoji = e.native;
    setNewMessage((prevMessage) => prevMessage + emoji);
  };

  // File selection handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    const supportedFormats = ['image/png', 'image/jpeg', 'image/jpg', 'video/mp4'];
    
    if (selectedFile && supportedFormats.includes(selectedFile.type)) {
      setFile(selectedFile);
      toast({
        title: "File Selected",
        description: `${selectedFile.name} has been selected`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } else {
      toast({
        title: "Unsupported File Format",
        description: "Please upload images (PNG, JPEG, JPG) or videos (MP4) only",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle typing with debounce
  const handleTyping = (e) => {
    setNewMessage(e.target.value);

    if (!socketConnected || !selectedChat) return;

    if (!typing) {
      setTyping(true);
      socketRef.current.emit("typing", selectedChat._id);
    }

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      socketRef.current.emit("stop typing", selectedChat._id);
      setTyping(false);
    }, 3000);
  };

  // Send message
  const sendMessage = async () => {
    if ((!newMessage.trim() && !file) || !selectedChat) {
      toast({
        title: "Please enter a message or select a file",
        status: "warning",
        duration: 3000,
        isClosable: true,
      });
      return;
    
    }

    try {
      const formData = new FormData();
      formData.append("chatId", selectedChat._id);
      
      if (newMessage.trim()) {
        formData.append("content", newMessage.trim());
      }
      
      if (file) {
        formData.append("file", file);
      }

      socketRef.current.emit("stop typing", selectedChat._id);
      
      setNewMessage("");
      setFile(null);
      setShowEmojiPicker(false);

      const { data } = await axios.post("/api/message", formData, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "multipart/form-data",
        }
      });

      socketRef.current.emit("new message", data);
      setMessages(prev => [...prev, data]);
      setFetchAgain((prev)=> !prev) ;//whatever is the current value of fetchAgain , just toggle it ,paramter inside the setter func holds the current value of the state,used becoz of concept of lifting state up , parent component of chatPage will re-render ,so child components(mychats ->left side wala and chatBox->right side wala bhi re-render karega,my main aim was to re-render the left side wala)
    } catch (error) {
      toast({
        title: "Error sending message",
        description: error.response?.data?.message || "Something went wrong",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  // Fetch messages
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      setLoading(true);
      const { data } = await axios.get(`/api/message/${selectedChat._id}`, {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      
      setMessages(data);
      setLoading(false);
      socketRef.current.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error fetching messages",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  // Fetch messages when chat changes
  useEffect(() => {
    if (selectedChat) {
      fetchMessages();
    }
  }, [selectedChat]);
  return (
    <>
      {selectedChat ? (
        <Box 
          height="100%" 
          display="flex" 
          flexDirection="column"
          bg="white"
          borderRadius="lg"
          boxShadow="sm"
        >
          {/* Chat Header */}
          <Box
            py={3}
            px={4}
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            bg="white"
            borderBottom="1px"
            borderColor="gray.200"
          >
            <Box display="flex" alignItems="center" gap={2}>
              <IconButton
                display={{ base: "flex", md: "none" }}
                icon={<ArrowBackIcon />}
                onClick={() => setSelectedChat("")}
                size="sm"
              />
              <Text fontSize="xl" fontWeight="600">
                {!selectedChat.isGroupChat
                  ? getSender(user, selectedChat.users)
                  : selectedChat.chatName}
              </Text>
            </Box>
            {selectedChat.isGroupChat ? (
              <UpdateGroupChatModal
                fetchMessages={fetchMessages}
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
              />
            ) : (
              <ProfileModal user={getSenderFull(user, selectedChat.users)} />
            )}
          </Box>

          {/* Messages Area */}
          <Box
            display="flex"
            flexDirection="column"
            justifyContent="flex-end"
            p={3}
            bg="gray.50"
            flex="1"
            overflowY="hidden"
          >
            {loading ? (
              <Spinner size="xl" w={20} h={20} alignSelf="center" margin="auto" />
            ) : (
              <Box className="messages" overflowY="auto">
                <ScrollableChat    //{/*scrollable is here , passed the messages array to the scrollable chat as prop, also sending setMesages so that in scrollable chats -> one can even change the messages state (used when deletion happened ) ,then messages the array state me changes kiya and then ui me re-render kiya.*/
                messages={messages} 
                setMessages={setMessages}              
                socket={socketRef.current}    //sending the instance of the socketRef(becoz ,unnecessary render nhi hoga and consistency bana rahega),so,scrollable chat can also use it ,used there in delete message emit event , 
                selectedChat={selectedChat}    //while emiting the deletemessage event to the server ,server ko hum log also send the current chat id ,since, server usi room(selected chat ) me delete message event transfer karega to all the user/users ,kyuki server is centralized ,it dont know which room ka message we are deleting and we also dont have selected chat variable in scrollable chat 
                //all these props will be sent as a whole in the form of object, so, while receiving the props in scrollable chat ,we would destructure them with the same key name as mentioned here (since, object )
                fetchAgain={fetchAgain}
                setFetchAgain={setFetchAgain}
                //sent fetchAgain and setFetchAgain ,becoz,when the message successfully deleted ,then for the current user ,fetchAgain ko update kar do,so,chatPage  re-render karega and hence -> chatBox and mychats dono me updation hoga ,concept of lifting state up(askify notes me study )
                />
              </Box>
            )}

            {/* Input Area */}
            <FormControl onKeyDown={(e) => e.key === "Enter" && sendMessage()} isRequired mt={3}>
              {isTyping && (
                <Lottie
                  options={typingAnimationOptions}
                  width={70}
                  style={{ marginBottom: 15, marginLeft: 0 }}
                />
              )}

              {/* File Preview */}
              {file && (
                <Box 
                  mb={2} 
                  bg="white" 
                  p={2} 
                  borderRadius="md" 
                  position="relative" 
                  maxW="200px"
                  boxShadow="sm"
                >
                  {file.type.startsWith('image/') ? (
                    <Image
                      src={URL.createObjectURL(file)}
                      alt="preview"
                      maxH="100px"
                      objectFit="cover"
                      borderRadius="md"
                    />
                  ) : file.type.startsWith('video/') ? (
                    <video
                      src={URL.createObjectURL(file)}
                      controls
                      style={{ maxHeight: "100px", borderRadius: "8px" }}
                    />
                  ) : null}
                  <IconButton
                    icon={<CloseIcon />}
                    size="xs"
                    position="absolute"
                    top={1}
                    right={1}
                    onClick={() => setFile(null)}
                    colorScheme="red"
                  />
                </Box>
              )}

              {/* Emoji Picker */}
              {showEmojiPicker && (
                <Box 
                  position="absolute"
                  bottom={{ base: "60px", md: "80px" }}
                  right={{ base: "5%", md: "20px" }}
                  zIndex={10}
                  ref={emojiPickerRef}
                  width={{ base: "95%", md: "320px" }}
                  maxWidth="320px"
                  bg="white"
                  borderRadius="md"
                  boxShadow="lg"
                >
                  <Picker
                    data={data}
                    onEmojiSelect={addEmoji}
                    theme="light"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxHeight: '350px',
                    }}
                  />
                </Box>
              )}

              {/* Message Input */}
              <InputGroup size="lg">
        <InputLeftElement>
          <IconButton
            icon={<AttachmentIcon />}
            variant="ghost"
            onClick={() => document.getElementById('fileInput').click()}
            aria-label="Attach file"
          />
          <input
            type="file"
            id="fileInput"
            hidden
            onChange={handleFileChange}
            accept="image/*, video/mp4"
          />
        </InputLeftElement>

        <Input
          variant="filled"
          bg="white"
          placeholder="Enter a message..."
          value={newMessage}
          onChange={handleTyping}
          _focus={{ borderColor: "blue.500", bg: "white" }}
          pr="4.5rem"
        />

        <InputRightElement width="4.5rem">
          <IconButton
            icon={<SmallAddIcon />}  // Replaced FontAwesomeIcon with Chakra UI icon
            variant="ghost"
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            mr={1}
          />
          <IconButton
            colorScheme="blue"
            icon={<ArrowRightIcon />}
            onClick={sendMessage}
          />
        </InputRightElement>
      </InputGroup>
            </FormControl>
          </Box>
        </Box>
      ) : (
        <Box 
          display="flex" 
          alignItems="center" 
          justifyContent="center" 
          h="100%"
          bg="white"
          borderRadius="lg"
          p={4}
        >
          <Text fontSize="xl" color="gray.500">
            Click on a user to start chatting
          </Text>
        </Box>
      )}
    </>
  );
};

export default SingleChat;