function Sword(i, j, buff) {
  Item.call(this, i, j, buff);
}

Sword.prototype.__proto__ = Item.prototype;

Sword.prototype.draw = function (cell) {
  cell.addClass("sword");
};
