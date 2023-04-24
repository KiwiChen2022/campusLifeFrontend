import React, { useState } from 'react';
import styles from './InputBox.module.css';

const InputBox = (props) => {
  const [message, setMessage] = useState('');
  const [file, setFile] = useState(null);

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  const handleInputChange = (event) => {
    setMessage(event.target.value);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleButtonClick = () => {
    handleSend();
  };

  const handleSend = () => {
    if (message !== '') {
      props.onSend({ type: 'text', content: message });
      setMessage('');
    }
    if (file) {
      props.onSend({ type: 'image', content: file });
      setFile(null);
      document.getElementById('imageInput').value = '';
    }
  };

  return (
    <div className={styles.inputBox}>
      <input
        type="text"
        placeholder="Type a message"
        onKeyDown={handleKeyDown}
        value={message}
        onChange={handleInputChange}
      />
      <input
        type="file"
        id="imageInput"
        accept="image/*"
        onChange={handleFileChange}
      />
      <button onClick={handleButtonClick}>Send</button>
    </div>
  );
};

export default InputBox;
