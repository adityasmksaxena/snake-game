// import React, { Component } from 'react';
import { DIRECTION_MAP } from '../util';

export default class Snake {
  constructor() {
    this.body = [[0, 0], [0, 1], [0, 2]];
    this.direction = DIRECTION_MAP.ArrowRight;
  }

  find(i, j) {
    return !!this.body.find(cell => cell[0] === i && cell[1] === j);
  }

  move() {
    const curHead = this.body[this.body.length - 1];
    const i = curHead[0] + this.direction[0];
    const j = curHead[1] + this.direction[1];
    const newHead = [i, j];
    const newBody = [...this.body.slice(1), newHead];
    return newBody;
  }
}
