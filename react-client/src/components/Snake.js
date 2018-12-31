// import React, { Component } from 'react';
import { DIRECTION_MAP } from '../util';

export default class Snake {
  constructor() {
    this.body = [[0, 0]];
    this.direction = DIRECTION_MAP.ArrowRight;
  }

  find(i, j) {
    return !!this.body.find(cell => cell[0] === i && cell[1] === j);
  }

  move(foodLocation, SIZE) {
    const curHead = this.body[this.body.length - 1];
    const i = curHead[0] + this.direction[0];
    const j = curHead[1] + this.direction[1];
    let isDead = false;
    if (i === SIZE || i === -1 || j === SIZE || j === -1) isDead = true;
    const newHead = [i, j];
    let curSnakeBody = this.body;
    let ateFood = true;
    if (!(newHead[0] === foodLocation[0] && newHead[1] === foodLocation[1])) {
      curSnakeBody = this.body.slice(1);
      ateFood = false;
    }
    const newBody = [...curSnakeBody, newHead];
    return { snakeBody: newBody, ateFood, isDead };
  }
}
