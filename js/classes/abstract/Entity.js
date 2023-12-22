function Entity(i, j, health, power) {
  Tile.call(this, i, j, false);
  this.health = health;
  this.maxHealth = health;
  this.power = power;
  this.direction = 0;
}

Entity.prototype.__proto__ = Tile.prototype;

Entity.prototype.draw = function (cell) {
  this.mirrorFlip(cell);
};

Entity.prototype.drawHealthBar = function (cell) {
  const healthCount = Math.ceil((this.health / this.maxHealth) * 100);
  const healthBar = $("<div></div>");

  healthBar.attr("class", "health");
  healthBar.css("width", healthCount + "%");

  cell.append(healthBar);
};

Entity.prototype.changeDirection = function (direction) {
  if (direction === Action.RIGHT) {
    this.direction = 1;
  }
  if (direction === Action.LEFT) {
    this.direction = -1;
  }
};

Entity.prototype.mirrorFlip = function (cell) {
  if (this.direction > 0) {
    cell.addClass("right");
  } else {
    cell.addClass("left");
  }
};
