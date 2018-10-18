import React, { Component } from "react";
import "./App.css";
import Over from "./components/over";
import Score from "./components/score";
import Overs from "./components/overs";
import BattingTeam from "../src/constants/BattingTeam";
import BowlingTeam from "../src/constants/BowlingTeam";
import Players from "./components/players";
import Ball from "./components/ball";
import Button from "./components/button";
import Target from "./components/target";
import _ from "lodash";

class App extends Component {
  state = {
    overs: [{ id: 0, balls: [] }],
    reverseOvers: [],
    runs: 0,
    battingTeam: "India",
    bowlingTeam: "England",
    noOfOvers: "0.0",
    totalOvers: 1,
    totalRuns: 0,
    totalWickets: 0,
    target: -1,
    players: new BattingTeam().team,
    striker: 1,
    nonStriker: 2
  };
  handleNewMatch = () => {
    let currentState = { ...this.state };
    currentState.overs = [{ id: 0, balls: [] }];
    currentState.reverseOvers = [];
    currentState.runs = 0;
    currentState.battingTeam = "India";
    currentState.bowlingTeam = "England";
    currentState.noOfOvers = "0.0";
    currentState.totalRuns = 0;
    currentState.totalWickets = 0;
    currentState.target = -1;

    currentState.players = new BattingTeam().team;

    currentState.striker = 1;
    currentState.nonStriker = 2;
    this.setState(currentState);
  };

  handleNextInnings = () => {
    let currentState = { ...this.state };
    let target = currentState.totalRuns;
    currentState.overs = [{ id: 0, balls: [] }];
    currentState.reverseOvers = [];
    currentState.runs = 0;
    let team = currentState.battingTeam;
    currentState.battingTeam = currentState.bowlingTeam;
    currentState.bowlingTeam = team;
    currentState.noOfOvers = "0.0";
    currentState.totalRuns = 0;
    currentState.totalWickets = 0;
    currentState.target = target;
    currentState.players = new BowlingTeam().team;
    currentState.striker = 1;
    currentState.nonStriker = 2;
    this.setState(currentState);
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

  handleNoOfOvers = overs => {
    //return overs.length - 1 + "." + overs[overs.length - 1].balls.length === 6 ? ;

    let noOfovers =
      ((overs.length - 1) * 6 + overs[overs.length - 1].balls.length) / 6;
    let noOfBalls =
      ((overs.length - 1) * 6 + overs[overs.length - 1].balls.length) % 6;
    return Math.floor(noOfovers) + (noOfBalls === 0 ? "" : "." + noOfBalls);
  };

  handlePlayers = (currentState, run) => {
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
  };
  changePlayers = (currentState, run) => {
    if (run === 1 || run === 3) {
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
  };

  isMaxOvers = () => {
    return (
      (this.state.overs.length - 1) * 6 +
        this.state.overs[this.state.overs.length - 1].balls.length >=
      this.state.totalOvers * 6
    );
  };

  isTargetAchieved = () => {
    return this.state.target > 0 && this.state.totalRuns >= this.state.target;
  };

  isEndOfInnings = () => {
    return (
      this.isMaxOvers() ||
      this.state.totalWickets >= 10 ||
      this.isTargetAchieved()
    );
  };

  render() {
    return (
      // div for container
      <div className="container">
        {/* div for card */}
        <div className="card m-1 fullWidth">
          <div className="row">
            <div className="col-md-5" />
            <div className="col-md-4">
              {!this.isEndOfInnings() && (
                <Button
                  styles="btn btn-success"
                  click={this.handlePlay}
                  buttonText={"Play (Over " + this.state.noOfOvers + ")"}
                />
              )}
              {this.isEndOfInnings() &&
                this.state.target < 0 && (
                  <Button
                    styles="btn btn-success"
                    buttonText={"Play Next Innings"}
                    click={this.handleNextInnings}
                  />
                )}
              {this.isEndOfInnings() &&
                this.state.target > 0 && (
                  <Button
                    styles="btn btn-success"
                    buttonText={"Play New Match"}
                    click={this.handleNewMatch}
                  />
                )}

              {!this.isEndOfInnings() &&
                this.state.noOfOvers !== "0.0" && (
                  <Ball runs={this.state.runs} />
                )}
            </div>
            <div className="col-md-3" />
          </div>
          <Score
            totalRuns={this.state.totalRuns}
            noOfOvers={this.state.noOfOvers}
            totalOvers={this.state.totalOvers}
            wickets={this.state.totalWickets}
            battingTeam={this.state.battingTeam}
          />
          {(this.state.target >= 0 || this.isEndOfInnings()) && (
            <Target
              target={this.state.target}
              totalRuns={this.state.totalRuns}
              wickets={this.state.totalWickets}
              maxOvers={this.isMaxOvers()}
              overs={this.state.overs}
              battingTeam={this.state.battingTeam}
              bowlingTeam={this.state.bowlingTeam}
              totalOvers={this.state.totalOvers}
            />
          )}
          <div className="row">
            <div className="col-md-4" />
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
        </div>
      </div>
    );
  }
}

export default App;
