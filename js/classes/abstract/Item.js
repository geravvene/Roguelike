function Item(i, j, buff) {
  Tile.call(this, i, j, false);
  this.buff = buff;
}

Item.prototype.__proto__ = Tile.prototype;
