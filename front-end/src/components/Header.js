import React from 'react';
import styles from "../styles/Header.module.css";

const Header = ({ account, balance }) => {
  return (
    <div className={styles.header}>
      <p>User {account}</p>
      <hr className={styles.hr} />
      <h1>Balance: {balance}€</h1>
    </div>
  )
}

export default Header;