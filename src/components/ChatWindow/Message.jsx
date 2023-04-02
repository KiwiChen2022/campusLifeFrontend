import React from "react";

const Message = ({ message }) => {
  const { image, from, id, to, time, type, content } = message;

  return (
    <div className="message">
      <div className="avatar">
        <img src={image} alt="avatar" />
      </div>
      <div className="message-content">
        <div className="message-header">
          <span className="message-from">{from}</span>
          <span className="message-time">{time}</span>
        </div>
        <div className="message-text">{content}</div>
      </div>
    </div>
  );
};

export default Message;
