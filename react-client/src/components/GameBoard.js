import React, { Component } from 'react';
import { GAME_STATUS, DIRECTION_KEYS, DIRECTION_MAP } from '../util';
import Cell from './Cell';
import Snake from './Snake';

const ENTER = 'Enter';
const ESCAPE = 'Escape';
const SPACEBAR = ' ';

const SIZE = 30;
export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.snake = new Snake();
    this.state = {
      size: SIZE,
      snakeBody: this.snake.body,
      foodLocation: [20, 20],
      status: GAME_STATUS.notStarted,
    };
  }

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    clearInterval(this.handleMoveInterval);
  }

  generateRandomFoodLocation = () => {
    const i = Math.floor(Math.random() * SIZE);
    const j = Math.floor(Math.random() * SIZE);
    if (this.snake.find([i, j])) return this.generateRandomFoodLocation();
    return [i, j];
  };

  handleEnter = () => {
    this.setState(
      prevState =>
        prevState.status === GAME_STATUS.inProgress
          ? { status: GAME_STATUS.paused }
          : { status: GAME_STATUS.inProgress },
      () => {
        if (this.state.status === GAME_STATUS.inProgress)
          this.animationRequestId = window.requestAnimationFrame(this.handleMove);
      }
    );
  };

  handleMove = () => {
    const snakeBody = this.snake.move();
    if (this.state.status === GAME_STATUS.inProgress) {
      this.setState(
        () => ({ snakeBody }),
        () => {
          this.snake.body = snakeBody;
          if (this.state.status === GAME_STATUS.inProgress)
            this.animationRequestId = window.requestAnimationFrame(this.handleMove);
        }
      );
    }
  };

  shouldUpdateDirection = ((t1 = Date.now()) => (t2 = Date.now()) => {
    console.log(t2 - t1);
    if (t2 - t1 > 50) {
      t1 = t2;
      return true;
    }
    return false;
  })();

  handleKeyPress = ({ key }) => {
    console.log(this.snake);
    if (DIRECTION_KEYS.includes(key)) {
      const val = DIRECTION_MAP[key];
      const snakeDirection = this.snake.direction;
      console.log(val, snakeDirection);
      if (
        !((snakeDirection[0] === 0 && val[0] === 0) || (snakeDirection[1] === 0 && val[1] === 0))
      ) {
        if (this.shouldUpdateDirection()) {
          this.snake.direction = val;
        }
      }
    } else if (key === ENTER || key === SPACEBAR) {
      this.handleEnter();
    } else if (key === ESCAPE) {
      this.setState(() => ({ status: GAME_STATUS.ended }));
    }
  };

  renderCells = () => {
    const { size } = this.state;
    const res = [];
    for (let i = 0; i < size; i++) {
      for (let j = 0; j < size; j++) {
        const props = {
          isSnakeCell: this.snake.find(i, j),
          isFoodCell: this.state.foodLocation[0] === i && this.state.foodLocation[1] === j,
        };
        res.push(<Cell key={`${i}-${j}`} {...props} />);
      }
    }
    return res;
  };
  render() {
    return (
      <div
        className="game"
        style={{
          height: SIZE * 10,
          width: SIZE * 10,
        }}
      >
        {this.renderCells()}
      </div>
    );
  }
}
