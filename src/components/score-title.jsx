import React from "react";

const ScoreTitle = props => {
  return (
    <div className="col-md-4">
      <span className="badge badge-dark m-2">
        Scorecard - {props.battingTeam}
      </span>
    </div>
  );
};

export default ScoreTitle;
