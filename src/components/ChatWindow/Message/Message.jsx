import React from "react";
import styles from "./Message.module.css";


const Message = ({ message, uid }) => {
  const { image, from, id, to, time, type, content } = message;
  const messageClass = from === uid ? styles.message : styles.messageRight;
  return (
    <div className={messageClass}>
      {/* <div className={styles.avatar}>
        <img src={image} alt="avatar" />
      </div> */}
      <div className={styles.messageText}>{content}</div>
      <span className={styles.messageTime}>{time}</span>
    </div>
  );
};

export default Message;
