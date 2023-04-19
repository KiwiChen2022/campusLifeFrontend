import React from 'react';
import styles from './ChatListItem.module.css';

const ChatListItem = ({ chat, isActive, onClick }) => {
  return (
    <div
      className={`${styles.chatListItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <img src={chat.image} alt={chat.username} />
      <div className={styles.chatDetails}>
        <h2>{chat.username}</h2>
        <p>Last message goes here</p>
      </div>
    </div>
  );
};

export default ChatListItem;
