import React from 'react';
import Button from './Button.js';
import styles from '../styles/Card.module.css';

const assets = require('../utils/assets.js')

const Card = ({symbol, name, totalSupply, issued, onIssueTokensClick}) => {
  return (
    <div className={styles.card}>
      <h3>{symbol.toUpperCase()}</h3>
      <p className={styles.subtitle}>{name}</p>
      <div className={styles.stats}>
        <h5>total supply: {totalSupply}</h5>
        <h5>available: {issued}</h5>
      </div>
      <img className={styles.icon} src={assets[symbol.toLowerCase()]} alt={symbol.toLowerCase()} />
      <Button title="issue" onClick={onIssueTokensClick} size="small"/>
    </div>
  )
}

export default Card;