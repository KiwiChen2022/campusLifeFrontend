import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "../ChatWindow/ChatWindow";
import Notification from "./Notification";
import { getlist } from "../../api/friend";


const Chats = () => {
  // State to store the active chat ID
  const [activeChatId, setActiveChatId] = useState(null);

  const [list, setList] = useState([]);

  useEffect(()=>{
    getlist().then(res=>{
      setList(res.data)
    })
    },[])
  

  return (
    <div>
        <Sidebar
          chats={list}
          activeChatId={activeChatId}
          onChatClick={setActiveChatId}
        />
        {activeChatId ? (
          <ChatWindow
            uid={activeChatId}
          />
        ) : (
          <Notification text="Select a chat to start messaging" />
        )}
      </div>
    
  );
};

export default Chats;
