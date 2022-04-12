let score = document.querySelector('.score');
let carGame = document.querySelector('.carGame');
let startBtn = document.querySelector('.startBtn');

startBtn.addEventListener('click', start);

let gameArea = document.querySelector('.gameArea');

let carPlayer = { speed: 5, score: 0 }


/*** Arrow keys ***/
let keys = { ArrowUp: false, ArrowDown: false, ArrowLeft: false, ArrowRight: false }

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(event) {
  keys[event.key] = true;
};

function keyUp(event) {
  keys[event.key] = false;
};



/*** Start game ***/
function start() {

  startBtn.classList.add('hide');
  score.classList.remove('hide');
  gameArea.classList.remove('hide');

  carPlayer.start = true;
  carPlayer.score = 0;
  window.requestAnimationFrame(runCars);
  // window.setInterval(runCars, 1000 / 60)

  /*** Create 5 lines in road ***/
  for (j = 0; j < 5; j++) {
    let roadLine = document.createElement('div');
    roadLine.setAttribute('class', 'roadLine');
    roadLine.y = (j * 150);
    roadLine.style.top = roadLine.y + 'px';
    gameArea.appendChild(roadLine);
  }

  /*** Locate carPlayer ***/
  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);
  carPlayer.x = car.offsetLeft; //0
  carPlayer.y = car.offsetTop; //546 because 746-(80+120)


  /*** Create 3 rival cars ***/
  for (i = 0; i < 3; i++) {
    let rivalCars = document.createElement('div');
    rivalCars.setAttribute('class', 'rivalCars');
    gameArea.appendChild(rivalCars);
    rivalCars.y = (i * 350) // 0 350 700
    rivalCars.style.top = rivalCars.y + 'px';
  }


}



/*** Run cars ***/
function runCars() {
  let carPlayerElm = document.querySelector('.car');
  let sizeGameArea = gameArea.getBoundingClientRect();
  // DOMRect {x: 220, y: 0, left: 220, width: 400, height: 745.6000366210938, top: 0, bottom: 745.6000366210938, width: 400...}

  if (carPlayer.start) {
    linesMoving();
    rivalCarsMoving(carPlayerElm);

    if (keys.ArrowUp && carPlayer.y > sizeGameArea.top) { carPlayer.y -= carPlayer.speed };
    if (keys.ArrowDown && carPlayer.y < (sizeGameArea.bottom - 80)) { carPlayer.y += carPlayer.speed }; //class="car": height = 80
    if (keys.ArrowLeft && carPlayer.x > sizeGameArea.y) { carPlayer.x -= carPlayer.speed };
    if (keys.ArrowRight && carPlayer.x < (sizeGameArea.width - 50)) { carPlayer.x += carPlayer.speed }; //class="car": width = 50

    //carPlayer : <div class="car" style = "left: 0px; top: 546px"></div> 
    carPlayerElm.style.left = carPlayer.x + 'px';
    carPlayerElm.style.top = carPlayer.y + 'px';

    carPlayer.score++;
    console.log(carPlayer.score);
    score.innerHTML = `Score : ${carPlayer.score}`

    window.requestAnimationFrame(runCars);
  }
}



/*** Make rival cars moving ***/
//rivalCars : <div class="rivalCars" style = "left: ...px; top: ...px"></div>
function rivalCarsMoving(carPlayerElm) {
  let rivalCarsElm = document.querySelectorAll('.rivalCars');
  rivalCarsElm.forEach(item => {
    if (detectCollision(carPlayerElm, item)) {
      endGame();
    };

    if (item.y > 700) {
      item.y = -300; //to reappear rivalCars
      item.style.left = Math.floor(Math.random() * 350) + 'px';
    }
    item.y += carPlayer.speed;
    item.style.top = item.y + 'px';
    console.log(item.style.top);
  })
}


function linesMoving() {
  let roadLineElm = document.querySelectorAll('.roadLine');
  roadLineElm.forEach(item => {
    if (item.y >= 700) {
      item.y = item.y - 750;
    }

    item.y += carPlayer.speed;
    item.style.top = item.y + 'px';
  })
}



/*** Collision ***/
function detectCollision(car1, car2) {
  car1Rect = car1.getBoundingClientRect();
  car2Rect = car2.getBoundingClientRect();
  return (car1Rect.x < car2Rect.x + car2Rect.width &&
    car1Rect.x + car1Rect.width > car2Rect.x &&
    car1Rect.y < car2Rect.y + car2Rect.height &&
    car1Rect.height + car1Rect.y > car2Rect.y)
}


/*** Game Over ***/
function endGame() {
  carPlayer.start = false;
  console.log('Game over');
  startBtn.classList.remove('hide');

  gameArea.classList.add('hide');
  gameArea.innerHTML = '';

  score.classList.add('hide');

  startBtn.innerHTML = 'Game Over <br> Your score : ' + carPlayer.score + '<br> Click here to Restart';
}


