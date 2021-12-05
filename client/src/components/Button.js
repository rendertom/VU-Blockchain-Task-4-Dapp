import React from 'react';

const Button = ({ title, onClick }) => {
  const style = {
    button: {
      backgroundColor: "#DE2769",
      border: "none",
      borderRadius: "10px",
      color: "white",
      fontSize: "16px",
      fontWeight: "300",
      margin: "5px",
      padding: "20px",
      textTransform: "uppercase",
      display: "flex",
      width: "100%",
      justifyContent: "center",
    }
  }

  return (
    <button
      style={style.button}
      onClick={onClick}
    >{title}</button>
  )
}

export default Button;