import React from 'react';

const InputText = ({ onChange }) => {
  const styles = {
    input: {
      border: "none",
      borderRadius: "10px",
      color: "gray",
      fontSize: "20px",
      fontWeight: "300",
      height: "50px",
      margin: "20px 0",
      outlineColor: "#DE2769",
      borderColor: "red",
      padding: "10px",
      width: "100%",
    }
  }

  return (
    <input
      type="text"
      style={styles.input}
      autoFocus
      placeholder="Enter amount"
      onChange={(event) => onChange(event.target.value)}
    />
  )
}

export default InputText;