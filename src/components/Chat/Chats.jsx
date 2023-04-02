import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "../ChatWindow/ChatWindow";
import Notification from "./Notification";
import { getlist } from "../../api/friend";


const Chats = () => {
  // State to store the active chat ID
  const [activeChatId, setActiveChatId] = useState(null);

  // State to store the messages for each chat
  const [messages, setMessages] = useState(null);
  const [list, setList] = useState([]);

  useEffect(()=>{
    getlist().then(res=>{
      setList(res.data)
    })
    },[])
  
  
  // Function to handle sending a message
  // const handleSendMessage = (inputValue) => {
  //   if (inputValue.trim() !== "") {
  //     const newMessage = {
  //       id: new Date().getTime(),
  //       text: inputValue,
  //       time: new Date().toLocaleTimeString(),
  //       sender: {
  //         name: "User",
  //         avatar: "https://via.placeholder.com/50",
  //       },
  //     };
  //     setMessages((prevMessages) => {
  //       return {
  //         ...prevMessages,
  //         [activeChatId]: [...(prevMessages[activeChatId] || []), newMessage],
  //       };
  //     });
  //   }
  // };

  return (
    <div>
        <Sidebar
          chats={list}
          activeChatId={activeChatId}
          onChatClick={setActiveChatId}
        />
        {activeChatId ? (
          <ChatWindow
            // onSend={handleSendMessage}
            uid={activeChatId}
          />
        ) : (
          <Notification text="Select a chat to start messaging" />
        )}
      </div>
    
  );
};

export default Chats;
