import React, { useState } from 'react';

import Button from './Button';
import InputText from './InputText';
import Radio from './Radio';

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

  const styles = {
    background: {
      backgroundColor: "#FFCA1F",
      borderRadius: "20px",
      padding: "30px",
      zIndex: "10",
      width: "420px"
    },
    row: {
      display: 'flex',
      alignItems: 'center',
    }
  };

  return (
    <div style={styles.background}>
      <h2>Stake tokens</h2>
      <div style={styles.row}>
        <InputText onChange={setValue} />
        <Radio
          activeItem={animal}
          onClick={onRadioChange}
        />
      </div>

      <div style={styles.row}>
        <Button title="stake" onClick={_onStakeClick} />
        <Button title="unstake" onClick={_onUnstakeClick} />
      </div>
    </div>
  )
}

export default Dialog;