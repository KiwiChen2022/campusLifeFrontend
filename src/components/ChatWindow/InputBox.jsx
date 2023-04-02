import React, { useState } from 'react';

const InputBox = (props) => {
  const [message, setMessage] = useState('');

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.onSend(message);
      setMessage('');
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleButtonClick = () => {
    props.onSend(message);
    setMessage('');
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Type a message"
        onKeyDown={handleKeyDown}
        value={message}
        onChange={handleInputChange}
      />
      <button onClick={handleButtonClick}>Send</button>
    </div>
  );
};

export default InputBox;
