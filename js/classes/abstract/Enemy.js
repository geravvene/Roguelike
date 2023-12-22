function Enemy(i, j, health, power, moveType) {
  Entity.call(this, i, j, health, power);
  this.moveType = moveType;
  this.isAttacking = false;
}

Enemy.prototype.__proto__ = Entity.prototype;

Enemy.prototype.draw = function (cell) {
  Entity.prototype.draw.call(this, cell);
  cell.addClass("enemy");
  this.drawHealthBar(cell);

  if (this.isAttacking) {
    cell.addClass("attack");
  }
};
