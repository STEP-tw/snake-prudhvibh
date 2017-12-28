let numberOfRows=60;
let numberOfCols=120;

let game = new Game(numberOfRows,numberOfCols);

let animator=undefined;

const stopGame = function() {
  clearInterval(animator);
  printResult();
}

const animateSnake=function() {
  let oldHead=game.snake.getHead();
  let oldTail=game.snake.move();
  let head=game.snake.getHead();
  if(game.hasSnakeHittedWall()) {
    stopGame();
    return;
  }
  paintBody(oldHead);
  unpaintSnake(oldTail);
  paintHead(head);
  if(game.snake.hasEatenItself()){
    stopGame();
  }
  if(head.isSameCoordAs(game.food)) {
    game.snake.grow();
    createFood(numberOfRows,numberOfCols);
    drawFood(game.food);
  }
};

const changeSnakeDirection=function(event) {
  switch (event.code) {
    case "KeyA":
      snake.turnLeft();
      break;
    case "KeyD":
      snake.turnRight();
      break;
    case "KeyC":
      snake.grow();
      break;
    default:
  }
}

const addKeyListener=function() {
  let grid=document.getElementById("keys");
  grid.onkeyup=changeSnakeDirection;
  grid.focus();
}

const createSnake=function() {
  let tail=new Position(12,10,"east");
  let body=[];
  body.push(tail);
  body.push(tail.next());
  let head=tail.next().next();
  snake=new Snake(head,body);
  game.addSnake(snake);
}

const createFood=function(numberOfRows,numberOfCols) {
  game.food=generateRandomPosition(numberOfCols,numberOfRows);
}

const startGame=function() {
  createSnake();
  drawGrids(numberOfRows,numberOfCols);
  drawSnake(snake);
  createFood(numberOfRows,numberOfCols);
  drawFood(game.food);
  addKeyListener();
  animator=setInterval(animateSnake,140);
};

window.onload=startGame;
