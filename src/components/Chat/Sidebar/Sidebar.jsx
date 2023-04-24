import { ChatListItem } from '../ChatListItem';
import styles from './Sidebar.module.css';
import React, { useContext } from "react";
import UserImageContext from '../../../contexts/UserImageContext';

const Sidebar = (props) => {
  const userUrl = useContext(UserImageContext);

  return (
    <div className={styles.sidebar}>
      <img className={styles.userAvatar} src={userUrl} alt="User avatar" />
      
      <ul className={styles.chatList}>
        {props.chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={props.activeChatId === chat.id}
            onClick={() => props.onChatClick(chat.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
