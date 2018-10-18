import React from "react";

const Score = props => {
  return (
    <div className="row">
      <div className="col-md-4 badge badge-dark ml-3">
        <h5>
          {props.battingTeam} {props.totalRuns}/{props.wickets} (
          {props.noOfOvers}/{props.totalOvers} Overs)
        </h5>
      </div>
    </div>
  );
};

export default Score;
