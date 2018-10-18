import React from "react";
import Player from "./player";
import Message from "./message";

const Players = props => {
  return (
    <React.Fragment>
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
            {getPlayersList(props.players)
              .filter(player => player.value.status !== "")
              .map(player => (
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
      <div className="row">
        <div className="col-md-1" />
        <div className="col-md-11">
          <Message styles={"yet-to-bat"} message={"Yet To Bat"} />
        </div>
        <div className="col-md-1" />
      </div>
      <div className="row">
        <div className="col-md-1" />
        <div className="row flex-row flex-nowrap col-md-10">
          {getPlayersList(props.players)
            .filter(player => player.value.status === "")
            .map(player => (
              <Message
                key={player.id + "yet_to_bat"}
                styles={
                  "m-1 badge badge-pill badge-light border border-primary"
                }
                message={player.value.name}
              />
            ))}
        </div>
        <div className="col=md-1" />
      </div>
    </React.Fragment>
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
