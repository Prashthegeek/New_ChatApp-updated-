// // import { Avatar } from "@chakra-ui/avatar";
// // import { Tooltip } from "@chakra-ui/tooltip";
// // import ScrollableFeed from "react-scrollable-feed";
// // import {
// //   isLastMessage,
// //   isSameSender,
// //   isSameSenderMargin,
// //   isSameUser,
// // } from "../config/ChatLogics";
// // import { ChatState } from "../Context/ChatProvider";

// // const ScrollableChat = ({ messages }) => {
// //   const { user } = ChatState();

// //   return (
// //     <ScrollableFeed>
// //       {messages &&
// //         messages.map((m, i) => (
// //           <div style={{ display: "flex" }} key={m._id}>
// //             {(isSameSender(messages, m, i, user._id) ||
// //               isLastMessage(messages, i, user._id)) && (
// //               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
// //                 <Avatar
// //                   mt="7px"
// //                   mr={1}
// //                   size="sm"
// //                   cursor="pointer"
// //                   name={m.sender.name}
// //                   src={m.sender.pic}
// //                 />
// //               </Tooltip>
// //             )}
// //             <span
// //               style={{
// //                 backgroundColor: `${
// //                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
// //                 }`,
// //                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
// //                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
// //                 borderRadius: "20px",
// //                 padding: "5px 15px",
// //                 maxWidth: "75%",
// //               }}
// //             >
// //               {m.content}
// //             </span>
// //           </div>
// //         ))}
// //     </ScrollableFeed>
// //   );

// // };
// // export default ScrollableChat;


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <Box
//             display="flex"
//             flexDirection="column"
//             marginBottom="10px"
//             key={m._id}
//           >
//             <Box display="flex" alignItems="center">
//               {(isSameSender(messages, m, i, user._id) ||
//                 isLastMessage(messages, i, user._id)) && (
//                 <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                   <Avatar
//                     mt="7px"
//                     mr={1}
//                     size="sm"
//                     cursor="pointer"
//                     name={m.sender.name}
//                     src={m.sender.pic}  //this picture  will be displayed in place of avatar
//                   />
//                 </Tooltip>
//               )}
//               <Box
//                 bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//                 ml={isSameSenderMargin(messages, m, i, user._id)}
//                 mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//                 borderRadius="20px"
//                 p="5px 15px"
//                 maxWidth="75%"
//                 position="relative"
//               >
//                 {m.content}
//                 {/* Display timestamp */}
//                 <Text
//                   fontSize="0.75rem" /* Adjust the size of the timestamp */
//                   color="#888888" /* A gray color to differentiate from the message text */
//                   mt={1} /* Space between the message and the timestamp */
//                   textAlign="left" /* Align timestamp to the left */
//                   whiteSpace="nowrap" /* Prevent the timestamp from wrapping to the next line */
//                   fontStyle="italic" /* Optional: Italicize the timestamp */
//                 >
//                   {moment(m.timestamp).format('MMM D, h:mm a')}
//                 </Text>
//               </Box>
//             </Box>
//           </Box>
//         ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;




// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages &&
//         messages.map((m, i) => (
//           <div style={{ display: "flex" }} key={m._id}>
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <span
//               style={{
//                 backgroundColor: `${
//                   m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
//                 }`,
//                 marginLeft: isSameSenderMargin(messages, m, i, user._id),
//                 marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
//                 borderRadius: "20px",
//                 padding: "5px 15px",
//                 maxWidth: "75%",
//               }}
//             >
//               {m.content}
//             </span>
//           </div>
//         ))}
//     </ScrollableFeed>
//   );

// };
// export default ScrollableChat;


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';
// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//       <ScrollableFeed>
//           {messages && messages.map((m, i) => (
//               <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//                   <Box display="flex" alignItems="center">
//                       {(isSameSender(messages, m, i, user._id) ||
//                           isLastMessage(messages, i, user._id)) && (
//                           <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                               <Avatar
//                                   mt="7px"
//                                   mr={1}
//                                   size="sm"
//                                   cursor="pointer"
//                                   name={m.sender.name}
//                                   src={m.sender.pic}
//                               />
//                           </Tooltip>
//                       )}
//                       <Box
//                           bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//                           ml={isSameSenderMargin(messages, m, i, user._id)}
//                           mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//                           borderRadius="20px"
//                           p="5px 15px"
//                           maxWidth="75%"
//                           position="relative"
//                       >
//                           {m.type === "file" ? (
//                               <a href={`/${m.content}`} target="_blank" rel="noopener noreferrer">
//                                   {m.content.split('/').pop()} {/* Display the file name */}
//                               </a>
//                           ) : (
//                               m.content
//                           )}
//                           <Text fontSize="0.75rem" color="#888888" mt={1} textAlign="left" whiteSpace="nowrap" fontStyle="italic">
//                               {moment(m.timestamp).format('MMM D, h:mm a')}
//                           </Text>
//                       </Box>
//                   </Box>
//               </Box>
//           ))}
//       </ScrollableFeed>
//   );
// };


// export default ScrollableChat;




// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word" // Ensures long words break to prevent overflow
//             >
//               {m.type === "file" ? (
//                 <a href={`/${m.content}`} target="_blank" rel="noopener noreferrer">
//                   {m.content.split('/').pop()} {/* Display the file name */}
//                 </a>
//               ) : (
//                 m.content
//               )}
//               <Text fontSize="0.75rem" color="#888888" mt={1} textAlign="left" whiteSpace="nowrap" fontStyle="italic">
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;



// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from 'moment';

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();


//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word" // Ensures long words break to prevent overflow
//             >
//               {m.type === "file" ? (
//                 <a href={`/${m.content}`} target="_blank" rel="noopener noreferrer">
//                   {m.content.split('/').pop()} {/* Display the file name */}
//                 </a>
//               ) : (
//                 m.content
//               )}
//               <Text fontSize="0.75rem" color="#888888" mt={1} textAlign="left" whiteSpace="nowrap" fontStyle="italic">
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text, Image } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from "moment";

// // Helper functions to check file type
// const isImage = (filePath) => /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
// const isPDF = (filePath) => /\.pdf$/i.test(filePath.toLowerCase());

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();

//   console.log("ScrollableChat component rendered"); // Logs each time the component is rendered
//   console.log("Messages: ", messages); // Logs the messages array

//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word"
//             >
//               {/* Conditionally render content based on file type or message content */}
//               {m.type === "file" && isImage(m.file) ? (
//                 <Image src={`/${m.file}`} alt="sent image" maxW="100%" borderRadius="md" />
//               ) : m.type === "file" && isPDF(m.file) ? (
//                 <a href={`/${m.file}`} target="_blank" rel="noopener noreferrer">
//                   View PDF: {m.file.split('/').pop()}
//                 </a>
//               ) : m.type === "file" ? (
//                 <a href={`/${m.file}`} target="_blank" rel="noopener noreferrer">
//                   {m.file.split('/').pop()}
//                 </a>
//               ) : (
//                 <Text>{m.content}</Text>
//               )}

//               {/* Timestamp for each message */}
//               <Text
//                 fontSize="0.75rem"
//                 color="#888888"
//                 mt={1}
//                 textAlign="left"
//                 whiteSpace="nowrap"
//                 fontStyle="italic"
//               >
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;

// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text,  useToast } from "@chakra-ui/react";
// import ScrollableFeed from "react-scrollable-feed";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import moment from "moment";
// import { useState } from 'react';
// import { Modal, ModalOverlay, ModalContent, ModalBody, Image } from '@chakra-ui/react';  //to expand the image when clicked


// const isImage = (filePath) => typeof filePath === 'string' && /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
// const isPDF = (filePath) => typeof filePath === 'string' && /\.pdf$/i.test(filePath.toLowerCase());
// const isVideo = (filePath) => typeof filePath === 'string' && /\.(mp4|webm|ogg|mov)$/i.test(filePath.toLowerCase());




// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();
//   const toast = useToast();

//   //to handle the expand image on click (npm install @chakra-ui/react @emotion/react @emotion/styled framer-motion --legacy-peer-deps)
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [scale, setScale] = useState(1); // State to keep track of zoom level


//     const handleImageClick = (image) => {
//         setSelectedImage(image);
//         setIsOpen(true);
//     };

//     const handleClose = () => {
//         setIsOpen(false);
//         setSelectedImage(null);
//         setScale(1);  // Reset zoom level when modal is closed
//     };

//     const handleZoom = (e) => {
//       e.preventDefault(); // Prevent the default scroll behavior
//       const zoomStep = 0.05;  // Smaller step for slower zooming
//       let newScale = scale + e.deltaY * -zoomStep;
  
//       // Clamping the zoom scale between 1x and 3x
//       if (newScale < 1) {
//         newScale = 1;
//       } else if (newScale > 3) {
//         newScale = 3;
//       }
  
//       // Apply the new scale
//       setScale(newScale);
//     };
  
//   return (
//     <ScrollableFeed>
//       {messages && messages.map((m, i) => (
//         <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, m, i, user._id) ||
//               isLastMessage(messages, i, user._id)) && (
//               <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={m.sender.name}
//                   src={m.sender.pic}
//                 />
//               </Tooltip>
//             )}
//             <Box
//               bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, m, i, user._id)}
//               mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth="75%"
//               position="relative"
//               wordBreak="break-word"
//             >
//               {m.type === "file" && isImage(m.file) ? (
//                 <Image 
//                 src={`${m.file}`}  // Using the backend URL here
//                 alt="Sent Image" 
//                 maxW="300px"
//                 maxH="300px"  // Restrict the maximum height for better visual balance
//                 objectFit="cover"  // Ensures the image covers the container without distortion
//                 borderRadius="md"
//                 onClick={() => handleImageClick(m.file)}
//                 cursor="pointer"  //to show the user it is clickable
               
//                 onError={(e) => {
//                   console.error("Image failed to load", e);
//                   toast({
//                     title: "Image failed to load",
//                     description: "Please check the file and try again.",
//                     status: "error",
//                     duration: 5000,
//                     isClosable: true,
//                   });
//                 }}
//               />
//               ) : m.type === "file" && isPDF(m.file) ? (
//                 <a
//                 href={m.file}  // Directly use the stored path, use href for anchor tag
//                 target="_blank" 
//                   rel="noopener noreferrer"
//                   onError={(e) => {
//                     console.error("PDF failed to load", e);
//                     toast({
//                       title: "PDF failed to load",
//                       description: "Please check the file and try again.",
//                       status: "error",
//                       duration: 5000,
//                       isClosable: true,
//                     });
//                   }}
//                 >
//                   {m.file ? `View PDF: ${m.file.split('/').pop()}` : "View PDF"}
//                 </a>
//               ) : m.type === "file" && isVideo(m.file) ? (
//                 <Box mt={2}>
//                   <video 
//                     controls 
//                     src={m.file}  // Directly use the stored path
//                     style={{ maxHeight: "200px", maxWidth: "100%", borderRadius: "md" }}
//                     onError={(e) => {
//                       console.error("Video failed to load", e);
//                       toast({
//                         title: "Video failed to load",
//                         description: "Please check the file and try again.",
//                         status: "error",
//                         duration: 5000,
//                         isClosable: true,
//                       });
//                     }}
//                   />
//                 </Box>
//               ) : m.type === "file" && m.file ? (
//                 <a 
//                 href={m.file}  // Directly use the stored path
//                 target="_blank" 
//                   rel="noopener noreferrer"
//                   onError={(e) => {
//                     console.error("File failed to load", e);
//                     toast({
//                       title: "File failed to load",
//                       description: "Please check the file and try again.",
//                       status: "error",
//                       duration: 5000,
//                       isClosable: true,
//                     });
//                   }}
//                 >
//                   {m.file.split('/').pop()}
//                 </a>
//               ) : (
//                 <Text>{m.content}</Text>
//               )}

//               <Text
//                 fontSize="0.75rem"
//                 color="#888888"
//                 mt={1}
//                 textAlign="left"
//                 whiteSpace="nowrap"
//                 fontStyle="italic"
//               >
//                 {moment(m.timestamp).format('MMM D, h:mm a')}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//       {/* Modal for expand the image + adding functionality to zoom as well */}
//       <Modal isOpen={isOpen} onClose={handleClose} >
//         <ModalOverlay />
//         <ModalContent maxW="90vw" maxH="90vh" bg="blackAlpha.800">
//           <ModalBody p={0} display="flex" justifyContent="center" alignItems="center"  onWheel={handleZoom}>
//             <Image 
//               src={selectedImage} 
//               alt="Expanded view"
//               maxH="90vh" 
//               maxW="90vw" 
//               objectFit="contain"
//               borderRadius="md"
//               boxShadow="lg"
//               transform={`scale(${scale})`} // Apply zoom scaling
//               transition="transform 0.2s ease" // Smooth zoom transition
//               overflow="hidden"  // Hide any overflow to avoid scrolling issues

//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </ScrollableFeed>
//   );
// };

// export default ScrollableChat;




// -------------without using scrollable feed-------------


// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text, useToast } from "@chakra-ui/react";
// import { useEffect, useRef, useState } from "react";
// import moment from "moment";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   Image,
// } from "@chakra-ui/react";

// const isImage = (filePath) =>
//   typeof filePath === "string" &&
//   /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
// const isPDF = (filePath) =>
//   typeof filePath === "string" && /\.pdf$/i.test(filePath.toLowerCase());
// const isVideo = (filePath) =>
//   typeof filePath === "string" &&
//   /\.(mp4|webm|ogg|mov)$/i.test(filePath.toLowerCase());

// const ScrollableChat = ({ messages, newMessageTrigger }) => {
//   const { user } = ChatState();
//   const toast = useToast();
//   const bottomRef = useRef(null); // Reference to scroll to the bottom
//   const containerRef = useRef(null); // Reference for the scrollable container

//   // to handle the expand image on click
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [scale, setScale] = useState(1); // State to keep track of zoom level

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSelectedImage(null);
//     setScale(1); // Reset zoom level when modal is closed
//   };

//   const handleZoom = (e) => {
//     e.preventDefault(); // Prevent the default scroll behavior
//     const zoomStep = 0.05; // Smaller step for slower zooming
//     let newScale = scale + e.deltaY * -zoomStep;

//     // Clamping the zoom scale between 1x and 3x
//     if (newScale < 1) {
//       newScale = 1;
//     } else if (newScale > 3) {
//       newScale = 3;
//     }

//     // Apply the new scale
//     setScale(newScale);
//   };

//   // Function to scroll to the bottom without animation
//   const scrollToBottomInstant = () => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: "auto" }); // No animation
//     }
//   };

//   // Function to scroll to the bottom with smooth animation (for new messages)
//   const scrollToBottomSmooth = () => {
//     if (bottomRef.current) {
//       bottomRef.current.scrollIntoView({ behavior: "smooth" }); // Smooth scroll for new messages
//     }
//   };

//   // Effect to scroll down instantly when entering the chat
//   useEffect(() => {
//     scrollToBottomInstant(); // Instantly scroll to the bottom on chat load
//   }, [messages]);

//   // Effect to scroll down smoothly when a new message is sent
//   useEffect(() => {
//     if (newMessageTrigger) {
//       setTimeout(() => {
//         scrollToBottomSmooth(); // Smoothly scroll to the bottom when a new message is sent
//       }, 100); // Slight delay to ensure the message is added
//     }
//   }, [newMessageTrigger, messages]); // Include messages to ensure smooth scrolling when messages change

//   return (
//     <Box
//       ref={containerRef}
//       height="100%" // Set the container height according to your design
//       overflowY="auto"
//       p="10px"
//     >
//       {messages &&
//         messages.map((m, i) => (
//           <Box key={m._id} display="flex" flexDirection="column" mb="10px">
//             <Box display="flex" alignItems="center">
//               {(isSameSender(messages, m, i, user._id) ||
//                 isLastMessage(messages, i, user._id)) && (
//                 <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
//                   <Avatar
//                     mt="7px"
//                     mr={1}
//                     size="sm"
//                     cursor="pointer"
//                     name={m.sender.name}
//                     src={m.sender.pic}
//                   />
//                 </Tooltip>
//               )}
//               <Box
//                 bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//                 ml={isSameSenderMargin(messages, m, i, user._id)}
//                 mt={isSameUser(messages, m, i, user._id) ? 3 : 10}
//                 borderRadius="20px"
//                 p="5px 15px"
//                 maxWidth="75%"
//                 position="relative"
//                 wordBreak="break-word"
//               >
//                 {m.type === "file" && isImage(m.file) ? (
//                   <Image
//                     src={`${m.file}`}
//                     alt="Sent Image"
//                     maxW="300px"
//                     maxH="300px"
//                     objectFit="cover"
//                     borderRadius="md"
//                     onClick={() => handleImageClick(m.file)}
//                     cursor="pointer"
//                     onError={(e) => {
//                       console.error("Image failed to load", e);
//                       toast({
//                         title: "Image failed to load",
//                         description: "Please check the file and try again.",
//                         status: "error",
//                         duration: 5000,
//                         isClosable: true,
//                       });
//                     }}
//                   />
//                 ) : m.type === "file" && isPDF(m.file) ? (
//                   <a
//                     href={m.file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onError={(e) => {
//                       console.error("PDF failed to load", e);
//                       toast({
//                         title: "PDF failed to load",
//                         description: "Please check the file and try again.",
//                         status: "error",
//                         duration: 5000,
//                         isClosable: true,
//                       });
//                     }}
//                   >
//                     {m.file ? `View PDF: ${m.file.split("/").pop()}` : "View PDF"}
//                   </a>
//                 ) : m.type === "file" && isVideo(m.file) ? (
//                   <Box mt={2}>
//                     <video                                    //provides better view to see videos (with three dots)
//                       controls
//                       src={m.file}
//                       style={{
//                         maxHeight: "200px",
//                         maxWidth: "100%",
//                         borderRadius: "md",
//                       }}
//                       onError={(e) => {
//                         console.error("Video failed to load", e);
//                         toast({
//                           title: "Video failed to load",
//                           description: "Please check the file and try again.",
//                           status: "error",
//                           duration: 5000,
//                           isClosable: true,
//                         });
//                       }}
//                     />
//                   </Box>
//                 ) : m.type === "file" && m.file ? (
//                   <a
//                     href={m.file}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     onError={(e) => {
//                       console.error("File failed to load", e);
//                       toast({
//                         title: "File failed to load",
//                         description: "Please check the file and try again.",
//                         status: "error",
//                         duration: 5000,
//                         isClosable: true,
//                       });
//                     }}
//                   >
//                     {m.file.split("/").pop()}
//                   </a>
//                 ) : (
//                   <Text>{m.content}</Text>
//                 )}

//                 <Text
//                   fontSize="0.75rem"
//                   color="#888888"
//                   mt={1}
//                   textAlign="left"
//                   whiteSpace="nowrap"
//                   fontStyle="italic"
//                 >
//                   {moment(m.timestamp).format("MMM D, h:mm a")}
//                 </Text>
//               </Box>
//             </Box>
//           </Box>
//         ))}
//       {/* Dummy div to allow smooth scroll to the bottom */}
//       <div ref={bottomRef} />
//       {/* Modal for expanding the image + zoom functionality */}
//       <Modal isOpen={isOpen} onClose={handleClose} size="full">
//   <ModalOverlay />
//   <ModalContent display="flex" justifyContent="center" alignItems="center" bg="transparent" boxShadow="none">
//     <ModalBody
//       display="flex"
//       justifyContent="center"
//       alignItems="center"
//       onWheel={handleZoom}
//       overflow="hidden"
//       p={0}
//     >
//       <Image
//         src={selectedImage}
//         alt="Expanded view"
//         maxW="90vw"
//         maxH="90vh"
//         objectFit="contain"
//         transform={`scale(${scale})`}
//         cursor="zoom-out"
//       />
//     </ModalBody>
//   </ModalContent>
// </Modal>
//     </Box>
//   );
// };

// export default ScrollableChat;


// ===============================================

// import { useEffect, useRef, useState } from "react";
// import { Avatar } from "@chakra-ui/avatar";
// import { Tooltip } from "@chakra-ui/tooltip";
// import { Box, Text, Image, useToast } from "@chakra-ui/react";
// import {
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
// } from "@chakra-ui/react";
// import moment from "moment";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";

// // File type validation
// const isImage = (filePath) =>
//   typeof filePath === "string" &&
//   /\.(jpeg|jpg|gif|png|bmp|svg)$/i.test(filePath.toLowerCase());
// const isVideo = (filePath) =>
//   typeof filePath === "string" &&
//   /\.(mp4|webm|ogg|mov)$/i.test(filePath.toLowerCase());

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();
//   const bottomRef = useRef(null);
//   const toast = useToast();
  
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [scale, setScale] = useState(1);

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSelectedImage(null);
//     setScale(1);
//   };

//   const handleZoom = (e) => {
//     e.preventDefault();
//     const zoomStep = 0.05;
//     let newScale = scale + e.deltaY * -zoomStep;
//     newScale = Math.min(Math.max(newScale, 1), 3);
//     setScale(newScale);
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   return (
//     <Box 
//       height="100%" 
//       overflowY="auto" 
//       p="10px" 
//       display="flex" 
//       flexDirection="column"
//     >
//       {messages?.map((message, index) => (
//         <Box 
//           key={message._id} 
//           mb="10px" 
//           display="flex" 
//           flexDirection="column"
//         >
//           <Box display="flex" alignItems="center">
//             {(isSameSender(messages, message, index, user._id) ||
//               isLastMessage(messages, index, user._id)) && (
//               <Tooltip 
//                 label={message.sender.name} 
//                 placement="bottom-start" 
//                 hasArrow
//               >
//                 <Avatar
//                   mt="7px"
//                   mr={1}
//                   size="sm"
//                   cursor="pointer"
//                   name={message.sender.name}
//                   src={message.sender.pic}
//                 />
//               </Tooltip>
//             )}
            
//             <Box
//               bg={message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
//               ml={isSameSenderMargin(messages, message, index, user._id)}
//               mt={isSameUser(messages, message, index, user._id) ? 3 : 10}
//               borderRadius="20px"
//               p="5px 15px"
//               maxWidth={["90%", "80%", "75%"]}
//               position="relative"
//               wordBreak="break-word"
//             >
//               {message.type === "file" && isImage(message.file) ? (
//                 <Image
//                   src={message.file}
//                   alt="Sent Image"
//                   maxW={["200px", "250px", "300px"]}
//                   maxH={["200px", "250px", "300px"]}
//                   objectFit="cover"
//                   borderRadius="md"
//                   onClick={() => handleImageClick(message.file)}
//                   cursor="pointer"
//                   onError={(e) => {
//                     toast({
//                       title: "Image failed to load",
//                       status: "error",
//                       duration: 5000,
//                       isClosable: true,
//                     });
//                   }}
//                 />
//               ) : message.type === "file" && isVideo(message.file) ? (
//                 <Box mt={2}>
//                   <video
//                     controls
//                     src={message.file}
//                     style={{
//                       maxHeight: "200px",
//                       maxWidth: "100%",
//                       borderRadius: "8px",
//                     }}
//                     onError={(e) => {
//                       toast({
//                         title: "Video failed to load",
//                         status: "error",
//                         duration: 5000,
//                         isClosable: true,
//                       });
//                     }}
//                   />
//                 </Box>
//               ) : (
//                 <Text>{message.content}</Text>
//               )}
//               <Text
//                 fontSize="0.75rem"
//                 color="gray.500"
//                 mt={1}
//                 textAlign="right"
//                 fontStyle="italic"
//               >
//                 {moment(message.timestamp).format("MMM D, h:mm a")}
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       ))}
//       <div ref={bottomRef} />

//       <Modal isOpen={isOpen} onClose={handleClose} size="full">
//         <ModalOverlay />
//         <ModalContent
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           bg="transparent"
//           boxShadow="none"
//         >
//           <ModalBody
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             onWheel={handleZoom}
//             overflow="hidden"
//             p={0}
//           >
//             <Image
//               src={selectedImage}
//               alt="Expanded view"
//               maxW="90vw"
//               maxH="90vh"
//               objectFit="contain"
//               transform={`scale(${scale})`}
//               cursor="zoom-out"
//               onClick={handleClose}
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default ScrollableChat;


// =============//correct one down me hai======

// import React, { useEffect, useRef, useState, memo } from "react";
// import { 
//   Avatar, 
//   Box, 
//   Text, 
//   Image, 
//   useToast, 
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalBody,
//   Tooltip,
//   VStack,
//   HStack,
//   useColorModeValue
// } from "@chakra-ui/react";
// import moment from "moment";
// import {
//   isLastMessage,
//   isSameSender,
//   isSameSenderMargin,
//   isSameUser,
// } from "../config/ChatLogics";
// import { ChatState } from "../Context/ChatProvider";

// // Simple function to check media file type
// const checkMediaFile = (filePath) => {
//   if (typeof filePath !== 'string') return { isImage: false, isVideo: false };
  
//   const imageRegex = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
//   const videoRegex = /\.(mp4|webm|ogg|mov)$/i;
  
//   return {
//     isImage: imageRegex.test(filePath.toLowerCase()),
//     isVideo: videoRegex.test(filePath.toLowerCase())
//   };
// };

// // Memoized single message component for performance
// const MessageItem = memo(({ 
//   message, 
//   index, 
//   messages, 
//   user, 
//   onImageClick 
// }) => {
//   // Use the function directly
//   const { isImage, isVideo } = checkMediaFile(message.file);
  
//   return (
//     <Box 
//       display="flex" 
//       alignItems="center"
//       mb={2}
//     >
//       {(isSameSender(messages, message, index, user._id) ||
//         isLastMessage(messages, index, user._id)) && (
//         <Tooltip 
//           label={message.sender.name} 
//           placement="bottom-start" 
//           hasArrow
//         >
//           <Avatar
//             mt="7px"
//             mr={2}
//             size="sm"
//             cursor="pointer"
//             name={message.sender.name}
//             src={message.sender.pic}
//           />
//         </Tooltip>
//       )}
      
//       <VStack 
//         align="stretch" 
//         spacing={1} 
//         ml={isSameSenderMargin(messages, message, index, user._id)}
//       >
//         <Box
//           bg={message.sender._id === user._id ? "blue.100" : "green.100"}
//           borderRadius="xl"
//           p={3}
//           maxWidth="container.sm"
//           boxShadow="sm"
//         >
//           {message.type === "file" && isImage ? (
//             <Image
//               src={message.file}
//               alt="Sent Image"
//               maxH="250px"
//               objectFit="cover"
//               borderRadius="md"
//               onClick={() => onImageClick(message.file)}
//               cursor="pointer"
//               transition="transform 0.2s"
//               _hover={{ transform: "scale(1.02)" }}
//             />
//           ) : message.type === "file" && isVideo ? (
//             <video
//               controls
//               src={message.file}
//               style={{
//                 maxHeight: "250px",
//                 width: "100%",
//                 borderRadius: "8px",
//               }}
//             />
//           ) : (
//             <Text>{message.content}</Text>
//           )}
          
//           <Text
//             fontSize="xs"
//             color="gray.500"
//             textAlign="right"
//             mt={1}
//             fontStyle="italic"
//           >
//             {moment(message.timestamp).fromNow()}
//           </Text>
//         </Box>
//       </VStack>
//     </Box>
//   );
// });

// const ScrollableChat = ({ messages }) => {
//   const { user } = ChatState();
//   const bottomRef = useRef(null);
//   const toast = useToast();
  
//   const [isOpen, setIsOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [scale, setScale] = useState(1);

//   const handleImageClick = (image) => {
//     setSelectedImage(image);
//     setIsOpen(true);
//   };

//   const handleClose = () => {
//     setIsOpen(false);
//     setSelectedImage(null);
//     setScale(1);
//   };

//   const handleZoom = (e) => {
//     e.preventDefault();
//     const delta = e.deltaY;
//     const zoomFactor = delta > 0 ? 0.9 : 1.1;
//     setScale(prevScale => {
//       const newScale = prevScale * zoomFactor;
//       return Math.min(Math.max(newScale, 0.5), 3);
//     });
//   };

//   useEffect(() => {
//     bottomRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const bgColor = useColorModeValue("gray.50", "gray.800");

//   return (
//     <Box 
//       height="100%" 
//       overflowY="auto" 
//       bg={bgColor}
//       p={4}
//       borderRadius="lg"
//     >
//       {messages?.length === 0 ? (
//         <VStack 
//           height="100%" 
//           justify="center" 
//           align="center" 
//           color="gray.500"
//         >
//           <Text>No messages yet</Text>
//         </VStack>
//       ) : (
//         messages?.map((message, index) => (
//           <MessageItem
//             key={message._id}
//             message={message}
//             index={index}
//             messages={messages}
//             user={user}
//             onImageClick={handleImageClick}
//           />
//         ))
//       )}
//       <div ref={bottomRef} />

//       <Modal 
//         isOpen={isOpen} 
//         onClose={handleClose} 
//         size="full"
//         isCentered
//       >
//         <ModalOverlay bg="blackAlpha.700" />
//         <ModalContent 
//           bg="transparent" 
//           boxShadow="none" 
//           maxW="90vw" 
//           maxH="90vh"
//         >
//           <ModalBody 
//             display="flex"
//             justifyContent="center"
//             alignItems="center"
//             onWheel={handleZoom}
//           >
//             <Image
//               src={selectedImage}
//               alt="Expanded Image"
//               objectFit="contain"
//               maxW="full"
//               maxH="full"
//               transform={`scale(${scale})`}
//               transition="transform 0.3s ease"
//               cursor="zoom-out"
//               onClick={handleClose}
//             />
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//     </Box>
//   );
// };

// export default React.memo(ScrollableChat);


// ==========upar wala code gajab hai======




import React, { useEffect, useRef, useState, memo } from "react";
import { 
  Avatar, 
  Box, 
  Text, 
  Image, 
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Tooltip,
  VStack,
  HStack,
  useColorModeValue,
  IconButton,
  
} from "@chakra-ui/react";
import moment from "moment";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";
import { DeleteIcon } from "@chakra-ui/icons";


import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { SocketAddress } from "net";


// Simple function to check media file type
const checkMediaFile = (filePath) => {
  if (typeof filePath !== 'string') return { isImage: false, isVideo: false };
  
  const imageRegex = /\.(jpeg|jpg|gif|png|bmp|svg)$/i;
  const videoRegex = /\.(mp4|webm|ogg|mov)$/i;
  
  return {  //returns an object
    isImage: imageRegex.test(filePath.toLowerCase()),
    isVideo: videoRegex.test(filePath.toLowerCase())
  };
};


const handleDelete = async (messageId, setMessages,socket,selectedChat) => {              
  try {
    
    const res = await axios.delete(`http://localhost:5000/api/message/${messageId}` );
     // Update messages state in SingleChat , so re-render the component , messages array is not a state of this componet (then how are we using setMessages )
     //  it was given to us by singlechat component(and in single chat component ,we have messages array as a state and when messages array state was passed as 
     // a prop to scrollable chat, we also passed setMessages as well ,so ,we can update the messages state ,but, why re-render here ? since, re-rendre happens 
     // when if isi component ka state changed or is component me passed kiya gaya prop changed ,as messages was prop to this compoennt, changing the prop rerenders
     //  this component also. ) , 

     if(res.status === 404){
      console.log("unable to delete the message ")
      return ;
     }
     
     setMessages((prevMessages) =>{   //setter func can also take in argument and when it takes argument,then argument holds the current state of this state ,so,here prevMessage holds the current state of messages array 
      console.log(prevMessages); // Log the previous state
      return prevMessages.map((msg) =>
        msg._id === messageId ? { ...msg, isDeleted: true } : msg
      )});

      socket.emit("message deleted",{messageId , chatId:selectedChat._id})  //selectedChat is an whole object (mychat.js me jaakar dekh lo)
  } catch (error) {
    console.log("message cannot be deleted", error.message)
    
  }
};

// Memoized single message component for performance
const MessageItem = memo(({   //receive the props
  message, 
  index, 
  messages, 
  user, 
  onImageClick ,
  setMessages,
  socket,
  selectedChat
}) => {
  // Use the function directly
  const { isImage, isVideo } = checkMediaFile(message.file);    //destructure the object returned by checkMediaFile function
  
  return (
    <Box 
      display="flex" 
      justifyContent={message.sender._id === user._id ? "flex-end" : "flex-start"}
      mb={2}
      width="100%"
    >
      {(isSameSender(messages, message, index, user._id) ||
        isLastMessage(messages, index, user._id)) && message.sender._id !== user._id && (
        <Tooltip 
          label={message.sender.name} 
          placement="bottom-start" 
          hasArrow
        >
          <Avatar
            mt="7px"
            mr={2}
            size="sm"
            cursor="pointer"
            name={message.sender.name}
            src={message.sender.pic}
          />
        </Tooltip>
      )}
      
      <Box 
        maxWidth="70%"
        ml={isSameSenderMargin(messages, message, index, user._id)}
      >
        <Box
          position="relative"
          bg={message.sender._id === user._id ? "blue.100" : "green.100"}
          borderRadius="xl"
          p={3}
          boxShadow="sm"
          minWidth="100px"
        >
          <VStack align="stretch" spacing={2}>
            {message.isDeleted ? (//messages is an array and each elem of it(traversing with iterator named message , in scrollable component (see neeche me bhi ek component hai. )) is an object , so , dot operator used.
              <Text fontStyle="italic" color="gray.500">
                This message was deleted
              </Text>
            ) : message.type === "file" && isImage ? (//this parenthesis used just to show them like a single expression
              <VStack align="stretch" spacing={2}> {/*messages is an array and each elem of it is an object , so , dot operator used.*/}
                <Box position="relative">
                  <Image
                    src={message.file}
                    alt="Sent Image"
                    maxH="250px"
                    width="100%"
                    objectFit="cover"
                    borderRadius="md"
                    onClick={() => onImageClick(message.file)}
                    cursor="pointer"
                    transition="transform 0.2s"
                    _hover={{ transform: "scale(1.02)" }}
                  />
                  {message.sender._id === user._id && !message.isDeleted && (
                    <IconButton
                      icon={<DeleteIcon />}
                      size="xs"
                      position="absolute"
                      top={2}
                      right={2}
                      bg="gray.200"
                      _hover={{ bg: "red.200" }}
                      onClick={() => handleDelete(message._id, setMessages,socket,selectedChat)}
                      aria-label="Delete message"
                    />
                  )}
                </Box>
                {/*show the text if it is accompanied with some text (if not, then nothing will be printed, so,no issue ) */}
                {message.content && (
                  <Text>{message.content}</Text>  //in case image is sent along with the some textual content
                )}
              </VStack>
            ) : message.type === "file" && isVideo ? (
              <VStack align="stretch" spacing={2}>
                <Box position="relative">
                  <video
                    controls
                    src={message.file}
                    style={{
                      maxHeight: "250px",
                      width: "100%",
                      borderRadius: "8px",
                    }}
                  />
                  {message.sender._id === user._id && !message.isDeleted && (
                    <IconButton
                      icon={<DeleteIcon />}
                      size="xs"
                      position="absolute"
                      top={2}
                      right={2}
                      bg="gray.200"
                      _hover={{ bg: "red.200" }}
                      onClick={() => handleDelete(message._id, setMessages,socket,selectedChat)}
                      aria-label="Delete message"
                    />
                  )}
                </Box>
                {/*show the text if it is accompanied with some text (if not, then nothing will be printed, so,no issue ) */}
                {message.content && (
                  <Text>{message.content}</Text>  //in case video is sent along with some text
                )}
              </VStack>
            ) : (
              <HStack justify="space-between" align="flex-start">
                <Text>{message.content}</Text>
                {message.sender._id === user._id && !message.isDeleted && (
                  <IconButton
                    icon={<DeleteIcon />}
                    size="xs"
                    bg="gray.200"
                    _hover={{ bg: "red.200" }}
                    onClick={() => handleDelete(message._id, setMessages,socket,selectedChat)}
                    aria-label="Delete message"
                  />
                )}
              </HStack>
            )}
  
            {/* Improved timestamp layout */}
            <HStack 
              spacing={1} 
              justify="flex-end" 
              fontSize="xs" 
              color="gray.500"
              fontStyle="italic"
            >
              <Text>{moment(message.timestamp).format('LT')}</Text>
              <Text>•</Text>
              <Text>{moment(message.timestamp).format('ll')}</Text>
            </HStack>
          </VStack>
        </Box>
      </Box>
    </Box>
  );
});

const ScrollableChat = ({ messages , setMessages , socket , selectedChat}) => {   //messages is an array (containing all the messages of this chat , and each element of the messages array is an obj (and each obj has multiple fields like sender , timestamp , isDeleted , etc ,ie. all those things defined inside the messages schema)) , here destructuring the props object with the same key name sent from there (since, props is object)
  const { user } = ChatState();
  const bottomRef = useRef(null);
  const toast = useToast();
  
  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [scale, setScale] = useState(1);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setSelectedImage(null);
    setScale(1);
  };

  const handleZoom = (e) => {
    e.preventDefault();
    const delta = e.deltaY;
    const zoomFactor = delta > 0 ? 0.9 : 1.1;
    setScale(prevScale => {
      const newScale = prevScale * zoomFactor;
      return Math.min(Math.max(newScale, 0.5), 3);
    });
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const bgColor = useColorModeValue("gray.50", "gray.800");

  return (
    <Box 
      height="100%" 
      overflowY="auto" 
      bg={bgColor}
      p={4}
      borderRadius="lg"
    >
      {messages?.length === 0 ? (
        <VStack 
          height="100%" 
          justify="center" 
          align="center" 
          color="gray.500"
        >
          <Text>No messages yet</Text>
        </VStack>
      ) : (
        messages?.map((message, index) => (//  //messages is an array(so, map is used) , each elem is an object, so, message (wihtout s ) is object
          <MessageItem    //pass the props.
            key={message._id}
            message={message}  //object
            index={index}
            messages={messages}  //array
            user={user}
            onImageClick={handleImageClick}
            setMessages={setMessages} //if this is not passed ,then MessageItem component cant use it 
            socket={socket}
            selectedChat={selectedChat}  //will use socket nad selectedchat for delete message event emit in handle delete function which is called from the MessageItem component
          />
        ))
      )}
      <div ref={bottomRef} />

      <Modal 
        isOpen={isOpen} 
        onClose={handleClose} 
        size="full"
        isCentered
      >
        <ModalOverlay bg="blackAlpha.700" />
        <ModalContent 
          bg="transparent" 
          boxShadow="none" 
          maxW="90vw" 
          maxH="90vh"
        >
          <ModalBody 
            display="flex"
            justifyContent="center"
            alignItems="center"
            onWheel={handleZoom}
          >
            <Image
              src={selectedImage}
              alt="Expanded Image"
              objectFit="contain"
              maxW="full"
              maxH="full"
              transform={`scale(${scale})`}
              transition="transform 0.3s ease"
              cursor="zoom-out"
              onClick={handleClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default React.memo(ScrollableChat);


