import React, { Component, Fragment } from 'react';
import { GAME_STATUS, DIRECTION_KEYS, DIRECTION_MAP } from '../util';
import Cell from './Cell';
import Snake from './Snake';

const ENTER = 'Enter';
const ESCAPE = 'Escape';
const SPACEBAR = ' ';

const SIZE = 25;
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

  handleGameStatus = () => {
    const { status, foodLocation } = this.state;
    let newStatus = status === GAME_STATUS.inProgress ? GAME_STATUS.paused : GAME_STATUS.inProgress;
    let newFoodLocation = foodLocation;
    if (status === GAME_STATUS.ended) {
      this.snake.body = [[0, 0]];
      this.snake.direction = DIRECTION_MAP.ArrowRight;
      newFoodLocation = this.generateRandomFoodLocation();
    }
    this.setState(
      prevState => ({
        status: newStatus,
        foodLocation: newFoodLocation,
      }),
      () => {
        if (this.state.status === GAME_STATUS.inProgress)
          this.animationRequestId = window.requestAnimationFrame(this.handleMove);
      }
    );
  };

  handleMove = () => {
    const { snakeBody, ateFood, isDead } = this.snake.move(this.state.foodLocation, SIZE);
    if (this.state.status === GAME_STATUS.inProgress) {
      const foodLocation = ateFood ? this.generateRandomFoodLocation() : this.state.foodLocation;
      const status = isDead ? GAME_STATUS.ended : this.state.status;
      this.setState(
        prevState => ({
          snakeBody,
          foodLocation,
          status,
        }),
        () => {
          this.snake.body = snakeBody;
          if (this.state.status === GAME_STATUS.inProgress)
            this.animationRequestId = window.requestAnimationFrame(this.handleMove);
        }
      );
    }
  };

  shouldUpdateDirection = ((t1 = Date.now()) => (t2 = Date.now()) => {
    if (t2 - t1 > 50) {
      t1 = t2;
      return true;
    }
    return false;
  })();

  handleKeyPress = ({ key }) => {
    // console.log(this.snake);
    if (DIRECTION_KEYS.includes(key)) {
      const val = DIRECTION_MAP[key];
      const snakeDirection = this.snake.direction;
      // console.log(val, snakeDirection);
      if (
        !((snakeDirection[0] === 0 && val[0] === 0) || (snakeDirection[1] === 0 && val[1] === 0))
      ) {
        if (this.shouldUpdateDirection()) {
          this.snake.direction = val;
        }
      }
    } else if (key === ENTER || key === SPACEBAR) {
      this.handleGameStatus();
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
      <Fragment>
        <div>{this.state.status}</div>
        <div
          className="game"
          style={{
            height: SIZE * 10,
            width: SIZE * 10,
          }}
        >
          {this.renderCells()}
        </div>
      </Fragment>
    );
  }
}
