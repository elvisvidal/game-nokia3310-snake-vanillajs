document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div');
  const scoreDisplay = document.querySelector('.score span');
  const startBtn = document.querySelector('.start');

  const width = 10;
  let currentIndex = 0;
  let appleIndex = 0;
  let currentSnake = [2,1,0]; // 2 = head, 1 = body, 0 = tail
  let direction = 1;
  let score = 0;
  let speed = 0.9;
  let intervalTime = 0;
  let interval = 0;

  // to start and reset game
  function startGame () {
    currentSnake.forEach(index => squares[index].classList.remove('snake'));
    squares[appleIndex].classList.remove('apple');
    clearInterval(interval);
    score = 0;
    randomApple();
    direction = 1;
    scoreDisplay.textContent = score;
    intervalTime = 1000;
    currentSnake = [2,1,0];
    currentIndex = 0;
    currentSnake.forEach(index => squares[index].classList.add('snake'));
    interval = setInterval(moveOutcomes, intervalTime);
  }

  // deals with all the move outcomes of the snake
  function moveOutcomes() {
    // deals with snake hitting border and snake hitting self
    if (
      // snake hits bottom
      (currentSnake[0] + width >= (width*width) && direction === width) ||
      // snake hits right wall
      (currentSnake[0] % width === width-1 && direction === 1) ||
      // snake hits left wall
      (currentSnake[0] % width === 0 && direction === -1) ||
      // snake hits the top
      (currentSnake[0] - width < 0 && direction === -width) ||
      // snake hits itself
      squares[currentSnake[0] + direction].classList.contains('snake')
    ) {
      return clearInterval(interval);
    }

    const tail = currentSnake.pop(); // removes last item of array and shows it
    squares[tail].classList.remove('snake'); // removes class of snake from tail
    currentSnake.unshift(currentSnake[0] + direction); // gives direction to head

    // deals with snake getting apple
    if (squares[currentSnake[0]].classList.contains('apple')) {
      squares[currentSnake[0]].classList.remove('apple')
      squares[tail].classList.add('snake');
      currentSnake.push(tail);
      randomApple();
      score++;
      scoreDisplay.textContent = score;
      clearInterval(interval);
      intervalTime = intervalTime * speed;
      interval = setInterval(moveOutcomes, intervalTime);
    }
    squares[currentSnake[0]].classList.add('snake');
  }

  // generate new apple once apple is eaten
  function randomApple() {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    }
    // if apple appears on the snake, reset apple
    while (squares[appleIndex].classList.contains('snake')) {
      squares[appleIndex].classList.add('apple');
    }
  }

  // assign functions to keycordes
  function control(e) {
    squares[currentIndex].classList.remove('snake');

    // right arrow
    if (e.keyCode === 39) {
      direction = 1;
    }
    // up arrow
    else if (e.keyCode === 38) {
      direction = -width;
    }
    // left arrow
    else if (e.keyCode === 37) {
      direction = -1;
    }
    // down arrow
    else if (e.keyCode === 40) {
      direction = +width;
    }
  }
  document.addEventListener('keyup', control);
  startBtn.addEventListener('click', startGame);
});
