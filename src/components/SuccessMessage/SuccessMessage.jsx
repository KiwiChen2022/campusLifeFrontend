import React from 'react';
import styles from './SuccessMessage.module.css';
import { FaTimes } from 'react-icons/fa';

const SuccessMessage = ({ message, onClose }) => {
  return (
    <div className={styles.successMessage}>
      <p>{message}</p>
      <button className={styles.closeButton} onClick={onClose}>
        <FaTimes />
      </button>
    </div>
  );
};

export default SuccessMessage;
