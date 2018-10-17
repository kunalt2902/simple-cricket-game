import React from "react";
import Over from "./over";

const Overs = props => {
  return (
    <div className="row">
      <div className="col-md-1" />
      <div className="row flex-row flex-nowrap col-md-10 overs-section">
        {getReverseOvers(props.overs).map((over, index) => (
          <Over
            over={over}
            id={"perviousOvers_" + index}
            key={"perviousOvers_" + index}
          />
        ))}
      </div>
    </div>
  );
};

let getReverseOvers = overs => {
  let reverseOvers = [];
  overs.map(over => reverseOvers.push(over));
  reverseOvers = reverseOvers.reverse().filter((over, index) => index > 0);
  return reverseOvers;
};

export default Overs;
