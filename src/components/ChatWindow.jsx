import React, { useState } from 'react';
import Message from './Message';
import InputBox from './InputBox';

const ChatWindow = (props) => {
  const [newMessage, setNewMessage] = useState('');

  const handleInputChange = (event) => {
    setNewMessage(event.target.value);
  };

  const handleSend = () => {
    console.log({newMessage});
    props.onSend(newMessage);
    setNewMessage('');
  };

  return (
    <div className="chat-window">
      <h2>{props.chat.name}</h2>
      <div className="messages">
        {props.messages.map((message) => (
          <Message key={message.id} message={message} />
        ))}
      </div>
      <InputBox
        value={newMessage}
        onChange={handleInputChange}
        onSend={handleSend}
      />
    </div>
  );
};

export default ChatWindow;
