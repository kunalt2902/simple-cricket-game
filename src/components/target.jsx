import React from "react";
import Message from "./message";

const Target = props => {
  return (
    <div className="row">
      <div className="col-md-4">
        {props.target > 0 && (
          <span className="badge badge-dark m-2">
            Target : {props.target + 1} ({props.totalOvers} Overs)
          </span>
        )}
      </div>
      <div className="col-md-4">
        <Message styles="badge badge-info m-2" message={setMessage(props)} />
      </div>
      <div className="col-md-4" />
    </div>
  );
};

let setMessage = props => {
  let ballsRemaining =
    props.totalOvers * 6 -
    ((props.overs.length - 1) * 6 +
      props.overs[props.overs.length - 1].balls.length);
  let runsRemaing = props.target - props.totalRuns;
  let wicketsRemaining = 10 - props.wickets;

  //mid innings summary
  if (props.target < 0) {
    return (
      props.bowlingTeam +
      " needs " +
      (props.totalRuns + 1) +
      " runs in " +
      props.totalOvers * 6 +
      " balls to win"
    );
  }

  //if batting team wins
  if (props.totalRuns > props.target) {
    return (
      props.battingTeam +
      " wins by " +
      wicketsRemaining +
      " wickets & " +
      ballsRemaining +
      " balls"
    );
  }

  //if batting team lost or match is tied
  if (props.maxOvers || props.wickets >= 10) {
    //match tied
    if (props.totalRuns === props.target) {
      return "Match Tied";
    } else {
      return props.bowlingTeam + " wins by " + runsRemaing + " runs";
    }
  }

  //match is still in progress
  return (
    props.battingTeam +
    " needs " +
    (runsRemaing + 1) +
    " runs in " +
    ballsRemaining +
    " balls with " +
    wicketsRemaining +
    " wickets in hand"
  );
};
export default Target;
