import React from 'react';

const Notification = (props) => {
  return (
    <div className="notification">
      <p>{props.text}</p>
    </div>
  );
};

export default Notification;
