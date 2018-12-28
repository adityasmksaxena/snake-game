const GAME_STATUS = {
  notStarted: 0,
  inProgress: 1,
  paused: 2,
  ended: 3,
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
