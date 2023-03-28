import React from 'react';

const ChatList = (props) => {
  return (
    <div className="chat-list">
      <h2>Chats</h2>
      <ul>
        {props.chats.map(chat => (
          <li key={chat.id} onClick={() => props.selectChat(chat.id)}>
            <div className="chat-item">
              <img src={chat.avatar} alt={chat.name} />
              <div className="chat-details">
                <h3>{chat.name}</h3>
                <p>{chat.lastMessage}</p>
              </div>
              <div className="chat-meta">
                <span className="time">{chat.time}</span>
                {chat.unreadCount > 0 && (
                  <span className="unread">{chat.unreadCount}</span>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatList;
