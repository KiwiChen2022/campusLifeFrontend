import React from 'react';

const ChatListItem = ({ chat, isActive, onClick }) => {
  return (
    <div className={`chat-list-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img src={chat.avatar} alt={chat.name} />
      <div className="chat-details">
        <h4>{chat.name}</h4>
        <p>Last message goes here</p>
      </div>
    </div>
  );
};

export default ChatListItem;
