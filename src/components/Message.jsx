import React from 'react';

const Message = (props) => {
  const { message } = props;

  return (
    <div className="message">
      <div className="sender">
        <img src={message.sender.avatar} alt={message.sender.name} />
      </div>
      <div className="text">
        <p>{message.text}</p>
        <div className="timestamp">{message.time}</div>
      </div>
    </div>
  );
};

export default Message;
