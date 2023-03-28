import React from 'react';

const Message = (props) => {
  const { message } = props;

  return (
    <div className="message">
      <div className="avatar">
        <img src={message.sender.avatar} alt={message.sender.name} />
      </div>
      <div className="content">
        <p>{message.text}</p>
        <div className="time">{message.time}</div>
      </div>
    </div>
  );
};

export default Message;
