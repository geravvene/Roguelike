function getObjectsByInstanceOf(map, class_) {
  let result = [];

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      const object = map.mapMatrix[i][j];
      if (object instanceof class_) {
        result.push(object);
      }
    }
  }

  return result;
}

function getRandomInRange(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function mapTeleport(index, size) {
  if (index < 0) {
    index = size - 1;
  }
  if (index >= size) {
    index = 0;
  }

  return index;
}

function copyMapMatrix(map) {
  let matrix = [];
  for (let i = 0; i < map.height; i += 1) {
    matrix[i] = [];
    for (let j = 0; j < map.width; j += 1) {
      const isEmpty = map.mapMatrix[i][j].isEmpty;
      matrix[i][j] = isEmpty;
    }
  }

  return matrix;
}
