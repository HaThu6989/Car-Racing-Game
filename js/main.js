const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');

startBtn.addEventListener('click', start);

let carPlayer = { speed: 6 }

/*** Arrow keys ***/
let keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
}

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

function keyDown(e) {
  e.preventDefault();
  console.log(e.key)//ArrowUp ArrowDown f d z a ...
  keys[e.key] = true;//change false => true
  console.log(keys);
};

function keyUp(e) {
  e.preventDefault();
  keys[e.key] = false;//change true => false
};


/*** Make rivalCars moving automatic - random multi-position ***/
function rivalCars() {
  let rivalCars = document.querySelectorAll('.rivalCars');

  rivalCars.forEach(item => {
    if (item.y > 700) {
      item.y = -300; //to reappear rivalCars
      item.style.left = Math.floor(Math.random() * 350) + 'px'; //random - position x of rivalCars between 350px
    }
    item.y += carPlayer.speed;
    // console.log(item.y);
    item.style.top = item.y + 'px';
  })
}


function runGame() {

  let car = document.querySelector('.car');
  let sizeGameArea = gameArea.getBoundingClientRect();
  // console.log(sizeGameArea)
  // DOMRect {x: 220, y: 0, left: 220, width: 400, height: 745.6000366210938, top: 0, bottom: 745.6000366210938, width: 400...}
  // y = top , x = left


  //Condition to move carPlayer
  if (carPlayer.start) {
    rivalCars();

    if (keys.ArrowUp && carPlayer.y > sizeGameArea.top) { carPlayer.y -= carPlayer.speed };//sizeGameArea.top = 0
    if (keys.ArrowDown && carPlayer.y < (sizeGameArea.bottom - 80)) { carPlayer.y += carPlayer.speed }; //class='car': height = 80
    if (keys.ArrowLeft && carPlayer.x > 0) { carPlayer.x -= carPlayer.speed }; // DOMRect y = 0
    if (keys.ArrowRight && carPlayer.x < (sizeGameArea.width - 50)) { carPlayer.x += carPlayer.speed }; //class='car': width = 50

    //carPlayer : <div class="car" style = "left: 0px; top: 546px"></div> 
    car.style.left = carPlayer.x + 'px';
    car.style.top = carPlayer.y + 'px';
    // console.log(car.style.left);//0px
    // console.log(car.style.top);//546px

    window.requestAnimationFrame(runGame);
  }

}

function start() {
  gameArea.classList.remove('hide');
  startBtn.classList.add('hide');

  carPlayer.start = true;

  window.requestAnimationFrame(runGame);

  //<div class="car"></div>
  let car = document.createElement('div');
  car.setAttribute('class', 'car');
  gameArea.appendChild(car);

  //offsetLeft, offsetTop : upper left/top corner of class CAR to the left/to within the class parent GAMEAREA.
  carPlayer.x = car.offsetLeft;
  // console.log(carPlayer.x)//0
  carPlayer.y = car.offsetTop;
  // console.log(carPlayer.y)//546

  /*** Create 3 rival cars ***/
  //<div class="rivalCars" style = "left: ...px; top: ...px"></div> => rivalCars
  for (x = 0; x < 3; x++) {
    let rivalCars = document.createElement('div');
    rivalCars.setAttribute('class', 'rivalCars');

    rivalCars.y = (x * 350) // rivalCars distance 350
    // console.log(rivalCars.y);// 0 350 700
    rivalCars.style.top = rivalCars.y + 'px';

    gameArea.appendChild(rivalCars);
  }

}

