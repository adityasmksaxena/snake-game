import React from 'react';

export default function Cell({ isSnakeBody, isFood }) {
  return (
    <div className={`cell ${isSnakeBody ? 'cell--snake' : ''}${isFood ? 'cell--food' : ''}`} />
  );
}
