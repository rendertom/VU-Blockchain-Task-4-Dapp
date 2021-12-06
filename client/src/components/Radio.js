import React from 'react';
const assets = require('../utils/assets.js')

const Radio = ({activeItem, onClick}) => {
  const images = ['chicken', 'cow', 'goat'];

  const getClassName = (item) => "radioImage " + (activeItem === item ? 'round' : null)

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