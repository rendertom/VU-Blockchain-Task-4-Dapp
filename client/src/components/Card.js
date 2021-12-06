import React from 'react';
import Button from './Button.js';
const assets = require('../utils/assets.js')

const Card = ({symbol, name, totalSupply, issued, onIssueTokensClick}) => {
  const styles = {
    card: {
      backgroundColor: "white",
      borderRadius: "20px",
      margin: "0 50px",
      padding: "20px",
      position: "relative",
    },
    icon: {
      width: "50px",
      height: "50px",
      position: "absolute",
      top: "-25px",
      right: "-25px",
    }
  }

  return (
    <div style={styles.card}>
      <h3>{symbol.toUpperCase()}</h3>
      <p>{name}</p>
      <h5>total supply: {totalSupply}</h5>
      <h5>available: {issued}</h5>
      <img style={styles.icon} src={assets[symbol.toLowerCase()]} alt={symbol.toLowerCase()} />
      <Button title="issue" onClick={onIssueTokensClick}/>
    </div>
  )
}

export default Card;