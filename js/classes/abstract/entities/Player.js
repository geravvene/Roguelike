function Player(i, j, health, power) {
  Entity.call(this, i, j, health, power);
}

Player.prototype.__proto__ = Entity.prototype;

Player.prototype.draw = function (cell) {
  Entity.prototype.draw.call(this, cell);
  this.__proto__.__proto__.draw.call(this, cell);

  cell.addClass("player");
  this.drawHealthBar(cell);
};

Player.prototype.drinkPotion = function (potion) {
  if (this.health < this.maxHealth) {
    this.health += potion.buff;
  }
};

Player.prototype.takeSword = function (sword) {
  this.power += sword.buff;
};
