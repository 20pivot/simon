var state = 'press-key';
var patron = [];
var level = 0;
var indexPlayerPatron = 0;

var title = document.getElementById('title');
var red = document.getElementById('red');
var green = document.getElementById('green');
var blue = document.getElementById('blue');
var yellow = document.getElementById('yellow');

var button = [red, green, blue, yellow];

document.addEventListener('keypress', startGame);
red.addEventListener('click', buttonPress);
green.addEventListener('click', buttonPress);
blue.addEventListener('click', buttonPress);
yellow.addEventListener('click', buttonPress);

function startGame() {
  if (state === 'press-key' || state === 'gameover') {
    newLevel();
    patron = [];
    level = 0;
    indexPlayerPatron = 0;
  }
}

function newLevel() {
  state = 'waitting-patron';
  setTimeout(() => {
    level = level + 1;
    title.innerText = 'Nivel ' + level;
    var nextColor = Math.floor(Math.random() * 4);
    var nextButton = button[nextColor];

    lightButton(nextButton);
    patron.push(nextButton);

    indexPlayerPatron = 0;

    state = 'waitting-player';
  }, 500);
}

function lightButton(button) {
  var audio = new Audio('sounds/' + button.id + '.m4a');
  audio.play();
  button.classList.toggle('active');
  setTimeout(() => {
    button.classList.toggle('active');
  }, 200);
}

function buttonPress(event) {
  if (state === 'waitting-player') {
    var button = event.target;
    if (button === patron[indexPlayerPatron]) {
      indexPlayerPatron = indexPlayerPatron + 1;
      lightButton(button);
      if (indexPlayerPatron === patron.length) {
        newLevel();
      }
    } else {
      var audio = new Audio('sounds/gameover.m4a');
      audio.play();
      state = 'gameover';
      title.innerText = 'gameover';
    }
  }
}

console.clear();
