import React from "react";
import Ball from "./ball";
const Play = props => {
  return (
    <div className="row">
      <div className="col-md-5" />
      <div className="col-md-4">
        <button
          type="button"
          className="btn btn-success"
          onClick={props.onPlay}
        >
          Play (Over {props.noOfOvers})
        </button>
        {props.noOfOvers !== "0.0" && <Ball runs={props.runs} />}
      </div>
      <div className="col-md-3" />
    </div>
  );
};

export default Play;
