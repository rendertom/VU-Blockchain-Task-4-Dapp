import React, { useState } from 'react';

import Button from './Button';
import InputText from './InputText';
import Radio from './Radio';

import styles from "../styles/Dialog.module.css";

const Dialog = ({onStakeClick, onUnstakeClick}) => {
  const [value, setValue] = useState(0);
  const [animal, setAnimal] = useState("chicken");

  const _onStakeClick = () => {
    onStakeClick(value, animal);
  }

  const _onUnstakeClick = () => {
    onUnstakeClick(value, animal);
  }

  const onRadioChange = (animal) => {
    setAnimal(animal)
  }

  return (
    <div className={styles.background}>
      <p>Stake your € and earn some animals</p>
      <div className={styles.row}>
        <InputText onChange={setValue} />
        <Radio
          activeItem={animal}
          onClick={onRadioChange}
        />
      </div>
      <div className={styles.row}>
        <Button title="stake" onClick={_onStakeClick} />
        <Button title="withdraw" onClick={_onUnstakeClick} />
      </div>
    </div>
  )
}

export default Dialog;