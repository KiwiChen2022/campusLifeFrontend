import React from "react";
import styles from "./Message.module.css";

const Message = ({ message, uid }) => {

  const { from, time, type, content } = message;
  const messageClass = from === uid ? styles.message : styles.messageRight;

  const isTextMessage = type !== 2 && type !== 3;
  const messageBoxClass = from === uid ? styles.messageBox : styles.messageBoxRight;
  const combinedClass = isTextMessage ? `${messageClass} ${messageBoxClass}` : messageClass;

  const renderContent = () => {
    
    if (type === 2) {
      return <img src={content} alt="photo" className={styles.image} />;
    } else if (type === 3) {
      console.log(content)
      return (
        <a href={content} download className={styles.fileLink}>
          <div className={styles.fileIcon}>📁</div>
          <div className={styles.fileName}>Download File</div>
        </a>
      );
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
