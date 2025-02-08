import React, { createContext, useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const ChatContext = createContext();

const ChatProvider = ({ children }) => {
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();  //initially , the type of the user is undefined
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState();

  const history = useHistory();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    setUser(user);   //saved an object inside the user state, so the nature of user state is now an object ,this user obj contains token , id, name , email .

    if (!user) history.push("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history]);  //best practice is to use the history as the dependency, so, useEffect will run everytime so,  the information about the user will be stored in the local Storage everytime history/or the route/or navigating to different page(url) is changed,so, if i go to the new url(or new route), then history changed(so, Still to have the information about the logged in user, prefer to keep history here), although most of the time , history is stable

  return (
    <ChatContext.Provider
      value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const ChatState = () => {
  return useContext(ChatContext);
};

export default ChatProvider;



//since, App.js me App component is wrapped around ChatProvider ,so ,any change /updation in the states exported from chatProvider(context api) will re-render the component in which they are called/imported . 
  //so,if for example  i called the user and setUser part from the context api in a component , so,  when i update the user ,so all the components (which imported the user state from the context api will re-render ,obviously the one which are currently active will re-render )
  //but, note -> those components wont be re-rendred where "user" state is just imported from context api but never used .
  //also , parent component of the components (which are getting re-render) will also re-render even they did not import the "user" state from the context api,but,since the child is getting re-rendered ,the parent will also re-render
  

  // example ->
  // component xyz -> parent of children

  // so  , in child component ,i imported user and setUser from the context api ,chatState() .
  // in the child component, if i use the update the user state ,  then xyz component will also re-WebGL2RenderingContext
  // this behaviour can be stopped using React.memo. 