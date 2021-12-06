import React, { useState } from 'react';

import Button from './Button';
import InputText from './InputText';
import Radio from './Radio';

import styles from "../styles/Dialog.module.css";

const Dialog = ({onStakeClick, onUnstakeClick, onSellClick}) => {
  const [value, setValue] = useState(0);
  const [animal, setAnimal] = useState("chicken");

  const _onStakeClick = () => {
    onStakeClick(value, animal);
  }

  const _onUnstakeClick = () => {
    onUnstakeClick(value, animal);
  }

  const _onSellClick = () => {
    onSellClick(value, animal);
  }

  const onRadioChange = (animal) => {
    setAnimal(animal)
  }

  return (
    <div className={styles.background}>
      <p className={styles.title}>Stake your € and earn some animals</p>
      <div className={styles.row + ' ' + styles.input}>
        <InputText onChange={setValue} />
        <Radio
          activeItem={animal}
          onClick={onRadioChange}
        />
      </div>
      <div className={styles.row}>
        <Button title="stake" onClick={_onStakeClick} />
        <Button title="withdraw" onClick={_onUnstakeClick} />
        <Button title="sell" onClick={_onSellClick} />
      </div>
    </div>
  )
}

export default Dialog;