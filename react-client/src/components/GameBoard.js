import React, { Component } from 'react';
import { GAME_STATUS } from '../util/util';
import Cell from './Cell';
export default class GameBoard extends Component {
  state = {
    size: 60,
    status: GAME_STATUS.notStarted,
  };

  renderCells = () => {
    const { size } = this.state;
    const res = [];
    for (let i = 0; i < size; i++) {
      for (let i = 0; i < size; i++) {
        res.push(<Cell />);
      }
    }
    return res;
  };
  render() {
    return <div className="game">{this.renderCells()}</div>;
  }
}
