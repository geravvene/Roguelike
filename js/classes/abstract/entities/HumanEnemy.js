function HumanEnemy(i, j, health, power, moveType) {
  Enemy.call(this, i, j, health, power, moveType);
}

HumanEnemy.prototype.__proto__ = Enemy.prototype;

HumanEnemy.prototype.draw = function (cell) {
  Enemy.prototype.draw.call(this, cell);
  cell.addClass('human');
};

HumanEnemy.prototype.step = function (map, player) {
  let queue = [];

  const width = map.width;
  const height = map.height;

  let matrix = copyMapMatrix(map);
  matrix[this.i][this.j] = false;
  queue.push([{ i: this.i, j: this.j }]);

  while (queue.length > 0) {
    let path = queue.shift();
    let position = path[path.length - 1];
    let direction = [
      [position.i + 1, position.j + 0],
      [position.i + 0, position.j + 1],
      [position.i - 1, position.j + 0],
      [position.i + 0, position.j - 1],
    ];

    for (let i = 0; i < direction.length; i += 1) {
      if (direction[i][0] === player.i && direction[i][1] === player.j) {
        let direction = -1;
        if (path.length > 1) {
          const firstStep = path[1];
          direction = getDirectionCode(
            firstStep.i - this.i,
            firstStep.j - this.j
          );

          if (direction === Action.UNKNOWN) {
            if (firstStep.i === height - 1 && this.i === 0) {
              direction = Action.UP;
            }
            if (firstStep.j === 0 && this.j === width - 1) {
              direction = Action.RIGHT;
            }
            if (firstStep.i === 0 && this.i === height - 1) {
              direction = Action.DOWN;
            }
            if (firstStep.j === width - 1 && this.j === 0) {
              direction = Action.LEFT;
            }
          }
        }
        this.changeDirection(direction);

        return direction;
      }

      direction[i][0] = mapTeleport(direction[i][0], map.height);
      direction[i][1] = mapTeleport(direction[i][1], map.width);

      if (matrix[direction[i][0]][direction[i][1]] === false) {
        continue;
      }

      matrix[direction[i][0]][direction[i][1]] = false;
      queue.push(path.concat({ i: direction[i][0], j: direction[i][1] }));
    }
  }
};
