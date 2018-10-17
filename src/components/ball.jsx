import React from "react";

const Ball = props => {
  return <span className={setRunClass(props.runs)}>{setRuns(props.runs)}</span>;
};

let setRunClass = runs => {
  let runClass = "badge-pill badge-secondary m-1";
  if (runs === 5) {
    runClass = "badge-pill badge-danger m-1";
  } else if (runs === 4 || runs === 6) {
    runClass = "badge-pill badge-primary m-1";
  }
  return runClass;
};

let setRuns = runs => {
  if (runs === 5) return "W";
  else if (runs === 0) return ".";

  return runs;
};

export default Ball;
