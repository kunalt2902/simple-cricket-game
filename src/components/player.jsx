import React from "react";

const Player = props => {
  return (
    <tr className={props.striker === props.id ? "table-success" : undefined}>
      <td>
        {props.player.name + (props.player.status === "Not Out" ? "*" : "")}
      </td>
      <td>{props.player.status}</td>
      <td>{props.player.runs + "(" + props.player.balls + ")"}</td>
      <td>{props.player.fours}</td>
      <td>{props.player.sixes}</td>
      <td>
        {/* {console.log(props.player.runs)} */}
        {props.player.balls === 0
          ? 0
          : Math.floor(
              (parseInt(props.player.runs) / parseInt(props.player.balls)) * 100
            )}
      </td>
    </tr>
  );
};

export default Player;
