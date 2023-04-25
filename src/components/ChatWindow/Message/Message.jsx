import React from "react";
import styles from "./Message.module.css";

const Message = ({ message, uid }) => {

  const { from, time, type, content } = message;
  const messageClass = from === uid ? styles.message : styles.messageRight;

  const isTextMessage = type !== 2;
  const messageBoxClass = from === uid ? styles.messageBox : styles.messageBoxRight;
  const combinedClass = isTextMessage ? `${messageClass} ${messageBoxClass}` : messageClass;

  const renderContent = () => {
    
    if (type === 2) {
      return <img src={content} alt="photo" className={styles.image} />;
    } else {
      return <div className={styles.messageText}>{content}</div>;
    }
  };

  return (
    <div className={combinedClass}>
      {renderContent()}
    </div>
  );
};

export default Message;
