import React, { PureComponent } from 'react';

export default class Cell extends PureComponent {
  render() {
    const { isSnakeCell, isFoodCell } = this.props;
    return (
      <div
        className={`cell ${isSnakeCell ? 'cell--snake' : ''}${isFoodCell ? 'cell--food' : ''}`}
      />
    );
  }
}
