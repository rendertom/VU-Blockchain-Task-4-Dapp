import React from 'react';
import styles from "../styles/InputText.module.css";

const InputText = ({ onChange }) => {
  return (
    <input
      type="text"
      className={styles.input}
      placeholder="Enter amount"
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default InputText;