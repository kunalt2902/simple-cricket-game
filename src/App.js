import React, { Component } from "react";
import "./App.css";
import Over from "./components/over";
import Score from "./components/score";
import ScoreTitle from "./components/score-title";
import Play from "./components/play";
import Message from "./components/message";
import Overs from "./components/overs";
import team from "../src/constants/BattingTeam";
import Players from "./components/players";
import _ from "lodash";

class App extends Component {
  state = {
    overs: [{ id: 0, balls: [] }],
    reverseOvers: [],
    runs: 0,
    battingTeam: "India",
    noOfOvers: "0.0",
    totalOvers: 10,
    totalRuns: 0,
    totalWickets: 0,
    players: team,
    striker: 1,
    nonStriker: 2
  };

  handlePlay = () => {
    let run = _.random(0, 6);
    let currentState = { ...this.state };
    currentState.runs = run;
    currentState.overs = this.handleOvers(run, currentState.overs);
    currentState.reverseOvers.reverse();
    currentState.noOfOvers = this.handleNoOfOvers(currentState.overs);
    currentState.totalRuns = currentState.totalRuns + (run === 5 ? 0 : run);
    currentState.totalWickets = currentState.totalWickets + (run === 5 ? 1 : 0);
    currentState.players = this.handlePlayers(currentState, run);
    this.setState(currentState);
  };

  handleOvers = (run, overs) => {
    let noOfOvers = overs.length;
    if (overs[noOfOvers - 1].balls.length === 6) {
      overs.push({ id: noOfOvers, balls: [run] });
    } else {
      overs[noOfOvers - 1].balls.push(run);
    }
    return overs;
  };

  handleNoOfOvers(overs) {
    //return overs.length - 1 + "." + overs[overs.length - 1].balls.length === 6 ? ;

    let noOfovers =
      ((overs.length - 1) * 6 + overs[overs.length - 1].balls.length) / 6;
    let noOfBalls =
      ((overs.length - 1) * 6 + overs[overs.length - 1].balls.length) % 6;
    return Math.floor(noOfovers) + (noOfBalls === 0 ? "" : "." + noOfBalls);
  }

  handlePlayers(currentState, run) {
    //update runs
    currentState.players.get(currentState.striker).runs =
      currentState.players.get(currentState.striker).runs +
      (run === 5 ? 0 : run);
    //update balls
    currentState.players.get(currentState.striker).balls =
      currentState.players.get(currentState.striker).balls + 1;
    //update 4's and 6's
    //if run == 4 update fours
    if (run === 4) {
      currentState.players.get(currentState.striker).fours =
        currentState.players.get(currentState.striker).fours + 1;
    } //if run == 6 update sixes
    else if (run === 6) {
      currentState.players.get(currentState.striker).sixes =
        currentState.players.get(currentState.striker).sixes + 1;
    }
    //if runs are 'odd' change players
    if (run % 2 !== 0) {
      currentState = this.changePlayers(currentState, run);
    }

    //if over ends change players
    if (currentState.overs[currentState.overs.length - 1].balls.length === 6) {
      currentState = this.changePlayers(currentState, 1);
    }

    return currentState.players;
  }
  changePlayers(currentState, run) {
    if (run === 1 || run == 3) {
      let temp = currentState.striker;
      currentState.striker = currentState.nonStriker;
      currentState.nonStriker = temp;
      return currentState;
    } else {
      currentState.players.get(currentState.striker).status = "Out";
      if (currentState.totalWickets < 10) {
        currentState.striker = currentState.totalWickets + 2;
        currentState.players.get(currentState.striker).status = "Not Out";
      }
      return currentState;
    }
  }

  render() {
    return (
      // div for container
      <div className="container">
        {/* div for card */}
        <div className="card m-1 fullWidth">
          {this.state.totalOvers.toString() !== this.state.noOfOvers &&
            this.state.totalWickets < 10 && (
              <Play
                onPlay={this.handlePlay}
                runs={this.state.runs}
                noOfOvers={this.state.noOfOvers}
              />
            )}

          {(this.state.totalOvers.toString() === this.state.noOfOvers ||
            this.state.totalWickets === 10) && (
            <Message message={"End Of Innings"} />
          )}
          <div className="row">
            <ScoreTitle />
            <div className="col-md-4" />
            <div className="col-md-4 mt-1">
              <span>
                <b>Current Over:</b>
              </span>
              <Over
                over={this.state.overs[this.state.overs.length - 1]}
                id={"currentOvers"}
              />
            </div>
          </div>
          <Overs overs={this.state.overs} />
          <Players players={this.state.players} striker={this.state.striker} />
          <Score
            totalRuns={this.state.totalRuns}
            noOfOvers={this.state.noOfOvers}
            totalOvers={this.state.totalOvers}
            wickets={this.state.totalWickets}
          />
        </div>
      </div>
    );
  }
}

export default App;
