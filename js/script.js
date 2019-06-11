'use strict';

// GAME SETTINGS

const btnsTimeout = 1000;

const gameField = document.querySelector('#game-winner');
const playerScoreField = document.querySelector('#player-score');
const robotScoreField = document.querySelector('#robot-score');
const roundCountField = document.querySelector('#round-count');
const gameSection = document.querySelector('#game-section');
const resultsSection = document.querySelector('#results-section');
const startGameBtn = document.querySelector('#start-btn');
const winnerField = document.querySelector('#winner');
let maxRoundsCountField = document.querySelector('#max-rounds-count');
const gameBtns = document.querySelectorAll('.btn-game');

// let playerScore = 0;
// let robotScore = 0;
// let roundCount = 1;
// let maxRoundsCount;
roundCountField.innerHTML = 1;

const params = {
  playerScore: 0,
  robotScore: 0,
  roundCount: 1,
  maxRoundsCount: 0,
  progress: []
};

startGameBtn.addEventListener('click', function() {
  params.maxRoundsCount = prompt(
    'How many rounds you want to play?',
    'Input must be integer'
  );

  params.maxRoundsCount = parseInt(params.maxRoundsCount);
  params.maxRoundsCount++;

  maxRoundsCountField.innerHTML = params.maxRoundsCount - 1;
  let maxRoundsCount = params.maxRoundsCount;
  if (Number.isInteger(maxRoundsCount)) {
    gameSection.style.display = 'block';
    startGameBtn.classList.toggle('active');
  } else {
    alert('Please, type in integer');
  }
});

// ------------------------------------------------------
// RULES: ------------------------------------------
// ------------------------------------------------------

/*
ROCK PAPER SCISSORS

1 - Rock
2 - Paper
3 - Scissors
*/

// FUNCTIONS: ------------------------------------------

// HELPER FUNCTION -> changing value into move
function numberToMove(attr) {
  switch (attr) {
    case 1:
      return 'rock';
    case 2:
      return 'paper';
    case 3:
      return 'scissors';
    default:
      return attr;
  }
}

// generates random integer - range <0, x>
const randomChar = x => {
  return Math.round(Math.random() * (x - 1)) + 1;
};

// evaluates who wins, player or robot or both
const whoWins = (x, y) => {
  console.log(`player ${x} -------  robot ${y}`);
  if (
    (x === 'rock' && y === 1) ||
    (x === 'paper' && y === 2) ||
    (x === 'scissors' && y === 3)
  ) {
    let whoWins = 'draw';
    params.progress.push({
      rndNo: params.roundCount,
      playerMove: x,
      robotMove: y,
      whoWins: whoWins,
      playerPoints: params.playerScore,
      robotPoints: params.robotScore
    });
    return 'draw';
  } else if (
    (x === 'rock' && y === 3) ||
    (x === 'paper' && y === 1) ||
    (x === 'scissors' && y === 2)
  ) {
    params.playerScore++;
    playerScoreField.innerHTML = params.playerScore;
    scoreAnimation(playerScoreField);
    let whoWins = 'player';
    params.progress.push({
      rndNo: params.roundCount,
      playerMove: x,
      robotMove: y,
      whoWins: whoWins,
      playerPoints: params.playerScore,
      robotPoints: params.robotScore
    });
    return 'player';
  } else if ((x === 'rock' && y === 2) || (x === 'paper' && y === 3)) {
    params.robotScore++;
    robotScoreField.innerHTML = params.robotScore;
    scoreAnimation(robotScoreField);
    let whoWins = 'robot';
    params.progress.push({
      rndNo: params.roundCount,
      playerMove: x,
      robotMove: y,
      whoWins: whoWins,
      playerPoints: params.playerScore,
      robotPoints: params.robotScore
    });
    return 'robot';
  } else {
    params.robotScore++;
    robotScoreField.innerHTML = params.robotScore;
    scoreAnimation(robotScoreField);
    let whoWins = 'robot';
    params.progress.push({
      rndNo: params.roundCount,
      playerMove: x,
      robotMove: y,
      whoWins: whoWins,
      playerPoints: params.playerScore,
      robotPoints: params.robotScore
    });
    return 'robot';
  }
};

// shows the robot's move
const aiMoveShow = x => {
  const aiBtns = document.querySelectorAll('.btn-game-robot');
  aiBtns.forEach(x => {
    x.classList.remove('active');
  });
  aiBtns[x - 1].classList.add('active');
};

// ANIMATIONS
const gameAnimation = x => {
  const container = document.querySelector('#robot-move');
  setTimeout(function() {
    container.classList.add('animated', 'bounce');
  }, 150);
  setTimeout(function() {
    gameField.classList.add('animated', 'tada');
    gameField.style.display = 'block';
  }, 50);
  gameField.style.display = 'none';
  container.classList.remove('animated', 'bounce');
  gameField.classList.remove('animated', 'tada');
};

const scoreAnimation = x => {
  setTimeout(function() {
    x.classList.add('animated', 'bounce');
  }, 150);
  setTimeout(function() {
    x.classList.add('animated', 'rotateIn');
    x.style.display = 'block';
  }, 50);
  x.style.display = 'none';
  x.classList.remove('animated', 'bounce');
  x.classList.remove('animated', 'rotateIn');
};

// MAX round count and then:
const gameFinish = (maxRounds, roundNumber) => {
  if (maxRounds === roundNumber) {
    maxRoundsCountField.innerHTML = 'Game has ended';
    maxRoundsCountField.style.color = 'red';
    setTimeout(x => {
      let test = document.querySelector('#test');
      let test2 = document.querySelector('#test2');
      test.style.display = 'none';
      test2.style.display = 'none';
    }, 1800);
    roundCountField.style.display = 'none';
    gameBtns.forEach(x => {
      x.classList.toggle('off');
    });
    setTimeout(x => {
      resultsSection.style.display = 'block';
      document.querySelector('#modal').classList.add('show');
    }, 2000);

    let winner;
    if (params.playerScore === params.robotScore) {
      winner = 'draw';
    } else if (params.playerScore > params.robotScore) {
      winner = 'player';
    } else {
      winner = 'robot';
    }
    winnerField.innerHTML = winner;
    params.progress.forEach(x => {
      let text = document.createElement('tr');
      text.insertAdjacentHTML(
        'beforeend',
        `
      <th scope="row">${x.rndNo}</th>
      <td>${x.playerMove}</td>
      <td>${numberToMove(x.robotMove)}</td>
      <td>${x.whoWins}</td>
      <td>${x.playerPoints} - ${x.robotPoints}</td>
      `
      );
      document.querySelector('#results-table').appendChild(text);
    });
    console.log(params.progress);
  }
};

// CODE: ------------------------------------------

// !!!!!!!! CODE CHANGE FOR V2 of the GAME

function playerMove(attr) {
  gameBtns.forEach(x => {
    x.classList.toggle('block');
  });
  let aiMove = randomChar(3);
  gameField.innerHTML = whoWins(attr, aiMove);
  aiMoveShow(aiMove);
  gameAnimation();
  params.roundCount++;
  roundCountField.innerHTML = params.roundCount;
  gameFinish(params.maxRoundsCount, params.roundCount);
  setTimeout(x => {
    gameBtns.forEach(x => {
      x.classList.toggle('block');
    });
  }, btnsTimeout);
}

gameBtns.forEach(x => {
  x.addEventListener('click', function() {
    playerMove(this.getAttribute('data-move'));
  });
});
