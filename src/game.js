const Game = function(numberOfRows,numberOfCols){
  this.rows = numberOfRows;
  this.cols = numberOfCols;
  this.snake = {};
  this.food = {};
};

Game.prototype.addSnake = function (snake) {
  this.snake = snake;
};

Game.prototype.hasSnakeHittedWall = function () {
  let head = this.snake.getHead();
  let topRight = [0,0];
  let bottomLeft = [this.rows,this.cols];
  return head.isInRange(topRight,bottomLeft);
};
