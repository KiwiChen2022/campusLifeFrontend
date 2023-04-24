import React from "react";
import styles from "./Message.module.css";

const Message = ({ message, uid }) => {
  const { from, time, type, content } = message;
  const messageClass = from === uid ? styles.message : styles.messageRight;

  const renderContent = () => {
    if (type === 2) {
      return <img src={content} alt="photo" className={styles.image} />;
    } else {
      return <div className={styles.messageText}>{content}</div>;
    }
  };

  return (
    <div className={messageClass}>
      {renderContent()}
      <span className={styles.messageTime}>{time}</span>
    </div>
  );
};

export default Message;
