import React from 'react';
import Button from './Button.js';

import styles from './Card.module.css';
const assets = require('../utils/assets.js')

const Card = ({symbol, name, totalSupply, issued, onIssueTokensClick}) => {
  return (
    <div className={styles.card}>
      <h3>{symbol.toUpperCase()}</h3>
      <p>{name}</p>
      <h5>total supply: {totalSupply}</h5>
      <h5>available: {issued}</h5>
      <img className={styles.icon} src={assets[symbol.toLowerCase()]} alt={symbol.toLowerCase()} />
      <Button title="issue" onClick={onIssueTokensClick}/>
    </div>
  )
}

export default Card;