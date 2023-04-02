import React from 'react';
import ChatListItem from './ChatListItem';
import { GoOrganization } from "react-icons/go";

const Sidebar = (props) => {
  return (
    <div className="sidebar">
      <div className="search">
        <input type="text" placeholder="Search" />
      </div>
      <ul className="chat-list">
        {props.chats.map((chat) => (
          <ChatListItem
            key={chat.id}
            chat={chat}
            isActive={props.activeChatId === chat.id}
            onClick={() => props.onChatClick(chat.id)}
          />
        ))}
      </ul>
    <GoOrganization className="icon"/>
    </div>
  );
};

export default Sidebar;
