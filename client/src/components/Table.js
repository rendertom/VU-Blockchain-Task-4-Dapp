import React from 'react';

const Table = ({ items, farmBalance }) => {
  return (
    <table>
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