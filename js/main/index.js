var map = {};
let multiplier = 35;

function draw() {
  const field = $('.field');

  for (let i = 0; i < map.height; i += 1) {
    for (let j = 0; j < map.width; j += 1) {
      const tile = map.mapMatrix[i][j];
      if (!tile.isEmpty) {
        const cell = $('<div></div>');
        cell.attr('class', 'tile');
        cell.width(multiplier).height(multiplier);
        cell.offset({ top: multiplier * i, left: multiplier * j });
        tile.draw(cell);
        field.append(cell);
      }
    }
  }
}

function isGameOver() {
  const player = getObjectsByInstanceOf(map, Player)[0];
  const enemies = getObjectsByInstanceOf(map, Enemy);
  if (enemies.length === 0 || player.health <= 0) {
    const status = enemies.length === 0 ? 'Win' : 'Lose';
    setTimeout(function () {
      confirm('Game Over: ' + status);
      window.location.reload();
    }, 0);
  }
}

function update(playerAction) {
  $('.field').empty();
  gameStep(map, playerAction);
  draw();
  isGameOver();
}

document.addEventListener('keypress', (event) => {
  const keyName = event.key.toLocaleLowerCase();

  let playerAction = Action.UNKNOWN;
  switch (keyName) {
    case 'w':
    case 'ц':
      playerAction = Action.UP;
      break;
    case 'd':
    case 'в':
      playerAction = Action.RIGHT;
      break;
    case 's':
    case 'ы':
      playerAction = Action.DOWN;
      break;
    case 'a':
    case 'ф':
      playerAction = Action.LEFT;
      break;
    case ' ':
      playerAction = Action.ATTACK;
      break;
  }
  update(playerAction);
});


window.addEventListener('load', async (event) => {
  const initData = Settings;
  map = gameInit(initData);
  const pageWidth = $(window).width();
  const pageHeight = $(window).height();

  const mapWidth = map.width;
  const mapHeight = map.height;

  multiplier = Math.ceil(
    Math.min(pageWidth / mapWidth, pageHeight / mapHeight) * 0.95
  );

  const field = $('.field');

  field.width(multiplier * mapWidth).height(multiplier * mapHeight);
  field.css('background-size', `${multiplier}px`);

  field.empty();
  draw();
});
