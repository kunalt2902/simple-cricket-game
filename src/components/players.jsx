import React from "react";
import Player from "./player";

const Players = props => {
  return (
    <div>
      <table className="table table-sm">
        <thead>
          <tr>
            <th scope="col">Player</th>
            <th scope="col">Status</th>
            <th scope="col">Runs(Balls)</th>
            <th scope="col">4s</th>
            <th scope="col">6s</th>
            <th scope="col">SR</th>
          </tr>
        </thead>
        <tbody>
          {getPlayersList(props.players).map(player => (
            <Player
              key={"Players_" + player.id}
              player={player.value}
              id={player.id}
              striker={props.striker}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
let getPlayersList = players => {
  let playersList = [];
  players.forEach((value, key) => {
    playersList.push({
      id: key,
      value: value
    });
  });
  return playersList;
};
export default Players;
