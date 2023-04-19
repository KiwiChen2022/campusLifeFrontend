import React from 'react';
import styles from './Notification.module.css';

const Notification = (props) => {
  return (
    <div className={styles.notification}>
      <p>{props.text}</p>
    </div>
  );
};

export default Notification;
