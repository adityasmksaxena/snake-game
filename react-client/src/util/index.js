const GAME_STATUS = {
  notStarted: 'Press Enter or Spacebar to start the game',
  inProgress: 'Playing',
  paused: 'Paused',
  ended: 'Game Ended',
};

const DIRECTION_KEYS = ['ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft'];

const DIRECTION_MAP = {
  ArrowUp: [-1, 0],
  ArrowRight: [0, 1],
  ArrowDown: [1, 0],
  ArrowLeft: [0, -1],
};

module.exports = {
  GAME_STATUS,
  DIRECTION_KEYS,
  DIRECTION_MAP,
};
