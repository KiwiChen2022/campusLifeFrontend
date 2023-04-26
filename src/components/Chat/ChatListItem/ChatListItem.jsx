import React from 'react';
import styles from './ChatListItem.module.css';

const ChatListItem = ({ chat, isActive, onClick }) => {
  const isUrl = (url) => {
    const pattern = new RegExp(
      '^https?:\\/\\/' // protocol (http or https)
    );
    return !!pattern.test(url);
  };
  
  const getImageUrl = (imageUrl) => {
    const baseUrl = "http://127.0.0.1:8081/ipfs/";
    return isUrl(imageUrl) ? imageUrl : baseUrl + imageUrl;
  };
  return (
    <div
      className={`${styles.chatListItem} ${isActive ? styles.active : ''}`}
      onClick={onClick}
    >
      <img src={getImageUrl(chat.image)} alt={chat.username} />
      <div className={styles.chatDetails}>
        <h2>{chat.username}</h2>
      </div>
    </div>
  );
};

export default ChatListItem;
