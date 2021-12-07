import React from 'react';
import styles from '../styles/Button.module.css';

const Button = ({ title, onClick, size = "large" }) => {
  return (
    <button
      className={styles.button + ' ' + (size === "large" ? styles.large : styles.small)}
      onClick={onClick}
    >{title}</button>
  )
}

export default Button;