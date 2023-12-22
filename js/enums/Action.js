function Enum(object) {
  const newObject = {};

  for (const property in object) {
    if (object.hasOwnProperty(property)) {
      newObject[property] = Symbol(object[property]);
    }
  }

  return Object.freeze(newObject);
}

const Action = Enum({
  UNKNOWN: -1,
  UP: 0,
  RIGHT: 1,
  DOWN: 2,
  LEFT: 3,
  ATTACK: 4,
});

function getDirectionCode(indexDiff, jndexDiff) {
  if (indexDiff === -1 && jndexDiff === 0) {
    return Action.UP;
  }
  if (indexDiff === 0 && jndexDiff === 1) {
    return Action.RIGHT;
  }
  if (indexDiff === 1 && jndexDiff === 0) {
    return Action.DOWN;
  }
  if (indexDiff === 0 && jndexDiff === -1) {
    return Action.LEFT;
  }
  return Action.UNKNOWN;
}

function getIndexes(direction) {
  switch (direction) {
    case Action.UP:
      return { indexDiff: -1, jndexDiff: 0 };
    case Action.RIGHT:
      return { indexDiff: 0, jndexDiff: 1 };
    case Action.DOWN:
      return { indexDiff: 1, jndexDiff: 0 };
    case Action.LEFT:
      return { indexDiff: 0, jndexDiff: -1 };
    default:
      return { indexDiff: 0, jndexDiff: 0 };
  }
}
