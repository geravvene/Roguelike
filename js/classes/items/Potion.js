function Potion(i, j, buff) {
  Item.call(this, i, j, buff);
}

Potion.prototype.__proto__ = Item.prototype;

Potion.prototype.draw = function (cell) {
  cell.addClass("potion");
};
