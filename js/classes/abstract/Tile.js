function Tile(i, j, isEmpty) {
  this.i = i;
  this.j = j;
  this.isEmpty = isEmpty;
}

Tile.prototype.draw = function (cell) {
  cell.addClass("wall");
};
