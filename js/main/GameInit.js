function getEmptyCells(map) {
  let emptyCells = [];

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      if (map.mapMatrix[i][j].isEmpty) {
        const resultItem = { i, j };
        emptyCells.push(resultItem);
      }
    }
  }

  return emptyCells;
}

function isHaveEmptyCells(matrix, width, height) {
  for (let i = 0; i < height; i += 1) {
    for (let j = 0; j < width; j += 1) {
      if (matrix[i][j]) {
        return true;
      }
    }
  }

  return false;
}

function getEmptyCellsByBorders(matrix, borders) {
  let emptyCells = [];

  for (
    let i = borders.minVerticalBorder;
    i <= borders.maxVerticalBorder;
    i += 1
  ) {
    for (
      let j = borders.minHorizontalBorder;
      j <= borders.maxHorizontalBorder;
      j += 1
    ) {
      if (matrix[i][j]) {
        emptyCells.push({ i, j });
      }
    }
  }

  return emptyCells;
}

function createMapMatrix(width, height) {
  let mapMatrix = [];
  for (let i = 0; i < height; i += 1) {
    mapMatrix[i] = [];
    for (let j = 0; j < width; j += 1) {
      mapMatrix[i][j] = new Tile(i, j, false);
    }
  }

  return { mapMatrix, width, height };
}

function generateRooms(
  map,
  minRoomCount,
  maxRoomCount,
  minRoomSize,
  maxRoomSize
) {
  const roomCount = getRandomInRange(minRoomCount, maxRoomCount);

  let minVerticalBorder = map.height;
  let maxVerticalBorder = 0;
  let minHorizontalBorder = map.width;
  let maxHorizontalBorder = 0;

  for (let roomIndex = 0; roomIndex < roomCount; roomIndex += 1) {
    const randomWidth = getRandomInRange(minRoomSize, maxRoomSize);
    const randomHeight = getRandomInRange(minRoomSize, maxRoomSize);

    const startIndex = getRandomInRange(0, map.height - randomHeight);
    const startJndex = getRandomInRange(0, map.width - randomWidth);

    const endIndex = startIndex + randomHeight;
    const endJndex = startJndex + randomWidth;

    for (let i = startIndex; i < endIndex; i += 1) {
      for (let j = startJndex; j < endJndex; j += 1) {
        map.mapMatrix[i][j].isEmpty = true;
      }
    }

    if (startIndex < minVerticalBorder) {
      minVerticalBorder = startIndex;
    }
    if (endIndex > maxVerticalBorder) {
      maxVerticalBorder = endIndex;
    }
    if (startJndex < minHorizontalBorder) {
      minHorizontalBorder = startJndex;
    }
    if (endJndex > maxHorizontalBorder) {
      maxHorizontalBorder = endJndex;
    }
  }

  minVerticalBorder += minRoomSize;
  minHorizontalBorder += minRoomSize;
  maxVerticalBorder -= minRoomSize;
  maxHorizontalBorder -= minRoomSize;

  const borders = {
    minVerticalBorder,
    maxVerticalBorder,
    minHorizontalBorder,
    maxHorizontalBorder,
  };

  return borders;
}

function getRandomIndex(min, max, list) {
  while (true) {
    const randomIndex = getRandomInRange(min, max);
    if (list.indexOf(randomIndex) === -1) {
      list.push(randomIndex);
      return randomIndex;
    }
    list.push(randomIndex);
  }
}

function generateWays(map, minWaysCount, maxWaysCount, borders) {
  const waysCountHorizontal = getRandomInRange(minWaysCount, maxWaysCount);
  const waysCountVertical = getRandomInRange(minWaysCount, maxWaysCount);

  const usedVerticalIndexes = [];
  for (let i = 0; i < waysCountHorizontal; i += 1) {
    const randomVerticalIndex = getRandomIndex(
      borders.minVerticalBorder,
      borders.maxVerticalBorder,
      usedVerticalIndexes
    );

    for (let j = 0; j < map.width; j += 1) {
      map.mapMatrix[randomVerticalIndex][j].isEmpty = true;
    }
  }

  const usedHorizontalIndexes = [];
  for (let i = 0; i < waysCountVertical; i += 1) {
    const randomHorizontalIndex = getRandomIndex(
      borders.minHorizontalBorder,
      borders.maxHorizontalBorder,
      usedHorizontalIndexes
    );

    for (let i = 0; i < map.height; i += 1) {
      map.mapMatrix[i][randomHorizontalIndex].isEmpty = true;
    }
  }
}

function collectSteps(matrix, width, height, index, jndex, list) {
  if (index + 1 < height) {
    if (matrix[index + 1][jndex]) {
      list.push({ i: index + 1, j: jndex });
      matrix[index + 1][jndex] = false;
    }
  }
  if (jndex + 1 < width) {
    if (matrix[index][jndex + 1]) {
      list.push({ i: index, j: jndex + 1 });
      matrix[index][jndex + 1] = false;
    }
  }
  if (index - 1 >= 0) {
    if (matrix[index - 1][jndex]) {
      list.push({ i: index - 1, j: jndex });
      matrix[index - 1][jndex] = false;
    }
  }
  if (jndex - 1 >= 0) {
    if (matrix[index][jndex - 1]) {
      list.push({ i: index, j: jndex - 1 });
      matrix[index][jndex - 1] = false;
    }
  }
  matrix[index][jndex] = false;
}

function isMapHaveEmptySpaces(map, borders) {
  const width = map.width;
  const height = map.height;

  let matrix = copyMapMatrix(map);

  const emptyCells = getEmptyCellsByBorders(matrix, borders);
  const anyemptyCell = emptyCells[Math.ceil(emptyCells.length / 2)];
  const firstStep_i = anyemptyCell.i;
  const firstStep_j = anyemptyCell.j;

  let steps = [];
  collectSteps(matrix, width, height, firstStep_i, firstStep_j, steps);

  while (steps.length != 0) {
    let newSteps = [];
    for (let i = 0; i < steps.length; i += 1) {
      const move = steps[i];
      const index = move.i;
      const jndex = move.j;

      collectSteps(matrix, width, height, index, jndex, newSteps);
    }
    steps = newSteps;
  }

  return isHaveEmptyCells(matrix, width, height);
}

function spawnEntity(map, cell, values) {
  const i = cell.i;
  const j = cell.j;

  const className = values[0];
  const health = values[1];
  const power = values[2];
  const moveType = values[3];

  map.mapMatrix[i][j] = new className(i, j, health, power, moveType);
}

function spawnItem(map, cell, values) {
  const i = cell.i;
  const j = cell.j;

  const className = values[0];
  const buff = values[1];

  map.mapMatrix[i][j] = new className(i, j, buff);
}

function spawnObjects(map, count, callbackFunction, ...values) {
  for (let i = 0; i < count; i += 1) {
    const emptyCells = getEmptyCells(map);
    const randomIndex = getRandomInRange(0, emptyCells.length - 1);
    const cell = emptyCells[randomIndex];
    callbackFunction(map, cell, values);
  }
}

function gameInit(initData) {
  let map = {};
  let borders = {};
  do {
    map = createMapMatrix(initData.width, initData.height);
    borders = generateRooms(
      map,
      initData.minRoomCount,
      initData.maxRoomCount,
      initData.minRoomSize,
      initData.maxRoomSize
    );
    generateWays(map, initData.minWaysCount, initData.maxWaysCount, borders);
  } while (isMapHaveEmptySpaces(map, borders));

  spawnObjects(map, initData.swordCount, spawnItem, Sword, initData.swordBuff);
  spawnObjects(
    map,
    initData.potionCount,
    spawnItem,
    Potion,
    initData.potionBuff
  );
  spawnObjects(
    map,
    1,
    spawnEntity,
    Player,
    initData.playerHealth,
    initData.playerPower
  );

  let enemiesSpawner = [];
  const maxEnemyCount = initData.enemyCount;

  for (let i = 0; i < maxEnemyCount; i += 1) {
    let enemy = {};
    enemy.class_ = HumanEnemy;
    enemiesSpawner.push(enemy);
  }

  for (let i = 0; i < enemiesSpawner.length; i += 1) {
    const enemySpawner = enemiesSpawner[i];
    spawnObjects(
      map,
      1,
      spawnEntity,
      enemySpawner.class_,
      initData.enemyHealth,
      initData.enemyPower
    );
  }

  return map;
}
