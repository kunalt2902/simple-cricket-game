import React from "react";
import Ball from "./ball";

const Over = props => {
  return (
    <span className="badge badge-pill badge-light border border-success">
      <span className="m-1 badge badge-pill badge-warning">
        Over {props.over.id}
      </span>
      {props.over.balls.map((ball, index) => (
        <Ball key={props.id + props.over.id + "_id_" + index} runs={ball} />
      ))}
    </span>
  );
};

export default Over;
