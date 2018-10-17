import React from "react";

const Score = props => {
  return (
    <div className="row">
      <div className="col-md-4" />
      <div className="col-md-4 badge badge-dark m-2">
        <h5>
          {props.totalRuns}/{props.wickets} ({props.noOfOvers}/
          {props.totalOvers} Overs)
        </h5>
      </div>
      <div className="col-md-4" />
    </div>
  );
};

export default Score;
