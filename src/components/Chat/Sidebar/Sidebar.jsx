import { ChatListItem } from '../ChatListItem';
import styles from './Sidebar.module.css';
import React, { useContext } from "react";
import UserImageContext from '../../../contexts/UserImageContext';

const Sidebar = (props) => {
  const userUrl = useContext(UserImageContext);

  return (
    <div className={styles.sidebar}>
      <img src={userUrl} alt="User avatar" />
      <div className={styles.search}>
        <input type="text" placeholder="Search" />
      </div>
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
