import React from 'react';

const Header = ({ account, balance }) => {
  const styles = {
    header: {
      alignItems: "center",
      color: "white",
      display: "flex",
      flexDirection: "column",
      width: "50%",
      padding: "50px",
    },
    hr: {
      backgroundColor: "white",
      height: "2px",
      margin: "20px",
      width: "100%",
    }
  }

  return (
    <div style={styles.header}>
      <p>User {account}</p>
      <hr style={styles.hr} />
      <h1>Balance: {balance}€</h1>
    </div>
  )
}

export default Header;