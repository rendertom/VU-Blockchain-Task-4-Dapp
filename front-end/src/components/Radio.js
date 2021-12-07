import React from 'react';
import styles from '../styles/Radio.module.css';
const assets = require('../utils/assets.js');

const Radio = ({activeItem, onClick}) => {
  const images = ['chicken', 'cow', 'goat'];

  const getClassName = (item) => styles.radioImage + ' ' + (activeItem === item && styles.round);

  return (
    images.map((item, index) => {
      return (
        <img key={index} alt={item}
          className={getClassName(item)}
          src={assets[item]}
          onClick={() => {onClick(item)}}
        />
      )
    })
  )
}

export default Radio;