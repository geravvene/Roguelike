function moveEntity(map, direction, entity) {
  const { indexDiff, jndexDiff } = getIndexes(direction);

  const entity_i = entity.i;
  const entity_j = entity.j;

  let finalIndex = mapTeleport(entity_i + indexDiff, map.height);
  let finalJndex = mapTeleport(entity_j + jndexDiff, map.width);

  let nextCell = map.mapMatrix[finalIndex][finalJndex];

  if (entity.__proto__ === Player.prototype) {
    entity.changeDirection(direction);
    if (nextCell.__proto__ === Potion.prototype) {
      entity.drinkPotion(nextCell);
      nextCell = new Tile(nextCell.i, nextCell.j, true);
    } else if (nextCell.__proto__ === Sword.prototype) {
      entity.takeSword(nextCell);
      nextCell = new Tile(nextCell.i, nextCell.j, true);
    }
  }

  if (nextCell.isEmpty) {
    map.mapMatrix[finalIndex][finalJndex] = entity;
    entity.i = finalIndex;
    entity.j = finalJndex;

    map.mapMatrix[entity_i][entity_j] = nextCell;
    nextCell.i = entity_i;
    nextCell.j = entity_j;
  }
}

function moveEnemies(map, enemies, player) {
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const direction = enemy.step(map, player);
    moveEntity(map, direction, enemy);
  }
}

function calculateAttacks(map, player, enemies, isPlayerAttacking) {
  const player_i = player.i;
  const player_j = player.j;

  let deadEnemies = [];
  for (let i = 0; i < enemies.length; i += 1) {
    const enemy = enemies[i];
    const enemy_i = enemy.i;
    const enemy_j = enemy.j;

    const isAttackZone =
      Math.abs(enemy_i - player_i) <= 1 && Math.abs(enemy_j - player_j) <= 1;
    enemy.isAttacking = isAttackZone;

    if (isAttackZone) {
      if (isPlayerAttacking) {
        enemy.health -= player.power;
      }
      if (enemy.health <= 0) {
        deadEnemies.push(enemy);
      } else {
        player.health -= enemy.power;
      }
    }
  }

  for (let i = deadEnemies.length - 1; i >= 0; i -= 1) {
    const enemy = deadEnemies[i];
    const enemy_i = enemy.i;
    const enemy_j = enemy.j;

    map.mapMatrix[enemy_i][enemy_j] = new Tile(enemy_i, enemy_i, true);
  }
}

const gameStep = (map, playerAction) => {
  const player = getObjectsByInstanceOf(map, Player)[0];
  let enemies = getObjectsByInstanceOf(map, Enemy);

  moveEnemies(map, enemies, player);

  if (playerAction !== Action.ATTACK) {
    moveEntity(map, playerAction, player);
  }

  calculateAttacks(map, player, enemies, playerAction === Action.ATTACK);
};
