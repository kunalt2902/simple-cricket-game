import React from "react";
const Button = props => {
  return (
    <button type="button" className={props.styles} onClick={props.click}>
      {props.buttonText}
    </button>
  );
};

export default Button;
