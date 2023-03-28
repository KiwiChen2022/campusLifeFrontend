import React from 'react';

const InputBox = (props) => {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      props.onSend();
    }
  };

  return (
    <div className="input-box">
      <input
        type="text"
        placeholder="Type a message"
        value={props.value}
        onChange={props.onChange}
        onKeyDown={handleKeyDown}
      />
      <button onClick={props.onSend}>Send</button>
    </div>
  );
};

export default InputBox;
