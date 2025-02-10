// import { AddIcon } from "@chakra-ui/icons";
// import { Box, Stack, Text } from "@chakra-ui/layout";
// import { useToast } from "@chakra-ui/toast";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { getSenderFull } from "../config/ChatLogics";
// import ChatLoading from "./ChatLoading";
// import GroupChatModal from "./miscellaneous/GroupChatModal";
// import { Button,  Avatar, Flex  } from "@chakra-ui/react";
// import { ChatState } from "../Context/ChatProvider";

// const MyChats = ({ fetchAgain }) => {
//   const [loggedUser, setLoggedUser] = useState();

//   const { selectedChat, setSelectedChat, user, chats, setChats , notification, setNotification, } = ChatState();

//   const toast = useToast();

//   const fetchChats = async () => {
//     // console.log(user._id);
//     try {
//       const config = {
//         headers: {
//           Authorization: `Bearer ${user.token}`,
//         },
//       };

//       const { data } = await axios.get("/api/chat", config);
      
//       setChats(data);
//     } catch (error) {
//       toast({
//         title: "Error Occured!",
//         description: "Failed to Load the chats",
//         status: "error",
//         duration: 5000,
//         isClosable: true,
//         position: "bottom-left",
//       });
//     }
//   };
//   useEffect(() => {
//     const userInfo = JSON.parse(localStorage.getItem("userInfo"));
//     setLoggedUser(userInfo);
//     console.log("Logged User:", userInfo); // Debugging log
//     fetchChats();
//     // eslint-disable-next-line
//   }, [fetchAgain]);  //so, whenever someone toggles fetchAgain(or changes it's value, doesn't matter true or false,myChats component(list of all the chats whom i have talked to (on left side)) will re-render)

  
//   return (  //Note : whatever is written inside the return is shown in the ui
//       <Box
//         d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
//         flexDir="column"
//         alignItems="center"
//         p={3}
//         bg="white"
//         w={{ base: "100%", md: "31%" }}
//         borderRadius="lg"
//         borderWidth="1px"
//       >
//         <Box
//           pb={3}
//           px={3}
//           fontSize={{ base: "28px", md: "30px" }}
//           fontFamily="Work sans"
//           d="flex"
//           w="100%"
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           My Chats
//           <GroupChatModal>
//             <Button
//               d="flex"
//               fontSize={{ base: "17px", md: "10px", lg: "17px" }}
//               rightIcon={<AddIcon />}
//             >
//               New Group Chat
//             </Button>
//           </GroupChatModal>
//         </Box>
//         <Box
//           d="flex"
//           flexDir="column"
//           p={3}
//           bg="#F8F8F8"
//           w="100%"
//           h="100%"
//           borderRadius="lg"
//           overflowY="hidden"
//         >
//           {chats ? (
//             <Stack overflowY="scroll">
//               {chats.map((chat) => {
//                 if (!chat.users || chat.users.length === 0) return null;
//                 return (
//                   <Box
//                     key={chat._id}
//                     onClick={() => {
//                       setSelectedChat(chat);
//                       setNotification((prevNotifications) =>
//                         prevNotifications.filter((n) => n.chat._id !== chat._id)
//                       );
//                     }}
//                     cursor="pointer"
//                     bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
//                     color={selectedChat === chat ? "white" : "black"}
//                     px={3}
//                     py={2}
//                     borderRadius="lg"
//                     display="flex"
//                     alignItems="center"
//                   >
//                     <Avatar
//                       mr={3} // Space between avatar and text
//                       size="md"
//                       name={!chat.isGroupChat && chat.users ? getSenderFull(loggedUser, chat.users).name : chat.chatName}  
//                       src={!chat.isGroupChat && chat.users ? getSenderFull(loggedUser, chat.users).pic : undefined}  // Sender's image or group initials
//                     />
                   
//                     <Flex direction="column" overflow="hidden">
//                       <Text fontWeight="bold" isTruncated>
//                         {!chat.isGroupChat ? getSenderFull(loggedUser, chat.users).name : chat.chatName}
//                       </Text>
//                       {chat.latestMessage ? (
//                         <Text fontSize="xs" isTruncated>
//                           <b>
//                             {chat.latestMessage.sender?._id === loggedUser?._id
//                               ? "You"
//                               : chat.latestMessage.sender?.name}
//                           </b>
//                           {": " + chat.latestMessage.content}
//                         </Text>
//                       ) : (
//                         <Text fontSize="xs">
//                           <i>No messages yet</i>
//                         </Text>
//                       )}
//                     </Flex>
//                   </Box>
//                 );
//               })}
//             </Stack>
//           ) : (
//             <ChatLoading />
//           )}
//         </Box>
//       </Box>
//     );
//   };
  
//   export default MyChats;



import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSenderFull } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button, Avatar, Flex } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain }) => {  //fetchAgain is accepted as a prop just becoz. lifting state up ka fayda utha saku,right side me socket ke through jaise jaise new messages listen and emit hoga ,i would toggle value of fetchAgain ,so,parent compoennt(chatPage will re-render and hence-> Mychats will also re-render ,becoz,of which new messages dekhne ko milega on left side like who sent the message and what is sent .even message deletion (successfully listen and emit, in the chatBox ke children)  ke baad bhi i toggled fetchAgain , due to which ,mychats component(which is the child of chatPage is re-rendred.,so, this message is deleted ka message bhi left side me sync me dekhne ko milega) )
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, user, chats, setChats, notification, setNotification } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    if (!user) {
      toast({
        title: "User not authenticated",
        description: "Please log in to fetch your chats",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,  //user from the one received from the context api(inside the context api,i already extracted the userInfo and token and exported them ,so other component can use them by destructuring informations from chatState() )
        },
      };

      const { data } = await axios.get("https://convohub-l7f3.onrender.com/api/chat", config);//backend me find method se output is returned which is an array (as find returns an array)
      setChats(data || []); // if ,data aaya hai from backend ,then chat will be an array and  each element of the array is an object (will have multiple fields like id ,name,etc,which are mentioned in chat schema)
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));   //redundant ,could have used user given to us from the contextapi
    if (!userInfo) {
      toast({
        title: "No user info found",
        description: "Please log in again",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      return;
    }
    setLoggedUser(userInfo);
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        d="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="100%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats && chats.length > 0 ? (
          <Stack overflowY="scroll">  
            {chats.map((chat) => {  //since,chats is an array,so ,map is used and each elem (traversed using chat is an object having multiple fields like id,name , latest message etc,whcih are mentioned in chat schema.)
              if (!chat.users || chat.users.length < 2) return null; // Ensure at least 2 users in the chat

              const sender = !chat.isGroupChat && chat.users.length >= 2 ? getSenderFull(loggedUser, chat.users) : null;  //frontend/config/chatLogics.js

              return (
                <Box
                  key={chat._id}
                  onClick={() => {
                    setSelectedChat(chat);  //so,selected chat is an object (having multiple fields like id ,name etc which are mentioned in the chat schema)
                    setNotification((prevNotifications) =>
                      prevNotifications.filter((n) => n.chat._id !== chat._id)
                    );
                  }}
                  cursor="pointer"
                  bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                  color={selectedChat === chat ? "white" : "black"}
                  px={3}
                  py={2}
                  borderRadius="lg"
                  display="flex"
                  alignItems="center"
                >
                  <Avatar
                    mr={3}
                    size="md"
                    name={sender ? sender.name : chat.chatName}  
                    src={sender ? sender.pic : undefined} 
                  />

                  <Flex direction="column" overflow="hidden">
                    <Text fontWeight="bold" isTruncated>
                      {!chat.isGroupChat ? sender?.name : chat.chatName}
                    </Text>
                    {chat.latestMessage ? (
                      <Text fontSize="xs" isTruncated>
                        <b>
                          {chat.latestMessage.sender?._id === loggedUser?._id
                            ? "You"
                            : chat.latestMessage.sender?.name || "Unknown Sender"}
                        </b>
                        { " : " + (chat.latestMessage.isDeleted ?  " This message was deleted" : chat.latestMessage.content)
                         }  {/*to show real time change ,i need to re-render the component again and again,so,need to change some state involved inthis component. so,idea->update the chats state (part of this component) by emitting the event when  */}
                      </Text>
                    ) : (
                      <Text fontSize="xs">
                        <i>No messages yet</i>
                      </Text>
                    )}
                  </Flex>
                </Box>
              );
            })}
          </Stack>
        ) : (
          <Text fontSize="lg" fontWeight="semibold" color="gray.500" textAlign="center" mt={5}>
            You haven't started any conversations yet! 🗨️  
          </Text>
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
