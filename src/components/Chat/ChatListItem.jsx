import React from 'react';

const ChatListItem = ({ chat, isActive, onClick }) => {
  return (
    <div className={`chat-list-item ${isActive ? 'active' : ''}`} onClick={onClick}>
      <img src={chat.image} alt={chat.username} />
      <div className="chat-details">
        <h2>{chat.username}</h2>
        <p>Last message goes here</p>
      </div>
    </div>
  );
};

export default ChatListItem;
