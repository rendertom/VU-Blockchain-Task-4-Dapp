import React from 'react';
import Card from './Card';

const Footer = ({ items, onIssueTokensClick }) => {
  const styles = {
    row: {
      display: "flex",
      margin: "50px"
    }
  }

  return (
    <div style={styles.row}>
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