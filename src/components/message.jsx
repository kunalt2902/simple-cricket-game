import React from "react";
const Message = props => {
  return <span className={props.styles}>{props.message}</span>;
};

export default Message;
