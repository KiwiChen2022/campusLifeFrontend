import React from "react";
import styles from "./Message.module.css";

const Message = ({ message, uid }) => {
  const { from, time, type, content } = message;
  const messageClass = from === uid ? styles.message : styles.messageRight;
  // const ipfsGateway = "http://127.0.0.1:8081/ipfs/"
  // console.log(content)
  // const imageURL = `${ipfsGateway}${content}`;

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
