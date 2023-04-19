import React, { useState, useEffect } from "react";
import Sidebar from "./Sidebar/Sidebar";
import ChatWindow from "../ChatWindow/ChatWindow";
import { Notification } from "./Notification";
import { getlist } from "../../api/friend";
import styles from './Chats.module.css';


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
      <div className={styles.chats}>
        <div className={styles.sidebar}>
          <Sidebar
            chats={list}
            activeChatId={activeChatId}
            onChatClick={setActiveChatId}
          />
        </div>
        {activeChatId ? (
          <div className={styles.chatWindow}>
            <ChatWindow
              uid={activeChatId}
            />
          </div>
        ) : (
          <Notification text="Select a chat to start messaging" />
        )}
      </div>
    );
};

export default Chats;
