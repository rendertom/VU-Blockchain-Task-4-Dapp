import React from 'react';
import Card from './Card';
import styles from "../styles/Footer.module.css";

const Footer = ({ items, onIssueTokensClick }) => {
  return (
    <div className={styles.row}>
      {items.map((item, index) => {
        return <Card
          key={index}
          symbol={item.symbol}
          name={item.name}
          totalSupply={item.totalSupply}
          issued={item.left}
          onIssueTokensClick={() => onIssueTokensClick(item.symbol)}
        />
      })}
    </div>
  )
}

export default Footer;