import React from 'react';
import styles from "../styles/Table.module.css";

const Table = ({ items, farmBalance }) => {
  return (
    <table className={styles}>
      <tbody>
        <tr>
          <th></th>
          <th>Balance</th>
          <th>Reward</th>
        </tr>
        {items.map((item, index) => {
          return (
            <tr key={index}>
              <td>{item.symbol}</td>
              <td>{farmBalance ? farmBalance[item.symbol] : "---"} <small>(EUR)</small></td>
              <td>{item.balance} <small>({item.symbol})</small></td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export default Table;