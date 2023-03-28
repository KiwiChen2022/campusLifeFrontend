import React from 'react';
import ChatListItem from './ChatListItem';
// import ChatList from './ChatList';

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
    </div>
  );
};

export default Sidebar;
