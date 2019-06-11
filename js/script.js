'use strict';

// GAME SETTINGS

var btnsTimeout = 1000;


var gameField = document.querySelector("#game-winner");
var playerScoreField = document.querySelector("#player-score");
var robotScoreField = document.querySelector("#robot-score");
var roundCountField = document.querySelector("#round-count");
var gameSection = document.querySelector("#game-section");
var resultsSection = document.querySelector("#results-section");
var startGameBtn = document.querySelector("#start-btn");
var winnerField = document.querySelector("#winner");
var maxRoundsCountField = document.querySelector("#max-rounds-count");
var gameBtns = document.querySelectorAll(".btn-game");


var playerScore = 0;
var robotScore = 0;
var roundCount = 1;
var maxRoundsCount;
roundCountField.innerHTML = 1;


startGameBtn.addEventListener("click", function () {
    maxRoundsCount = prompt("How many rounds you want to play?", "Input must be integer");
    maxRoundsCount = parseInt(maxRoundsCount);
    maxRoundsCount++;
    maxRoundsCountField.innerHTML = maxRoundsCount - 1;
    if (Number.isInteger(maxRoundsCount)) {
        gameSection.style.display = "block";
        startGameBtn.classList.toggle("active");
    } else {
        alert("Please, type in integer");
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

// generates random integer - range <0, x>
var randomChar = x => {
    return Math.round(Math.random() * (x - 1)) + 1;
};

// evaluates who wins, player or robot or both
var whoWins = (x, y) => {
    if (x === y) {
        return "draw";
    } else if ((x === 1 && y === 3) || (x === 2 && y === 1) || (x === 3 && y === 2)) {
        playerScore++;
        playerScoreField.innerHTML = playerScore;
        scoreAnimation(playerScoreField);
        return "player";
    } else if ((x === 1 && y === 2) || (x === 2 && y === 3)) {
        robotScore++;
        robotScoreField.innerHTML = robotScore;
        scoreAnimation(robotScoreField);
        return "robot";
    } else {
        robotScore++;
        robotScoreField.innerHTML = robotScore;
        scoreAnimation(robotScoreField);
        return "robot";
    }
};

// shows the robot's move
var aiMoveShow = x => {
    var aiBtns = document.querySelectorAll(".btn-game-robot");
    aiBtns.forEach(x => {
        x.classList.remove("active");
    });
    aiBtns[x - 1].classList.add("active");
};

// ANIMATIONS
var gameAnimation = x => {
    var container = document.querySelector("#robot-move");
    setTimeout(function () {
        container.classList.add("animated", "bounce");
    }, 150);
    setTimeout(function () {
        gameField.classList.add("animated", "tada");
        gameField.style.display = "block"
    }, 50);
    gameField.style.display = "none";
    container.classList.remove("animated", "bounce");
    gameField.classList.remove("animated", "tada");
};

var scoreAnimation = x => {

    setTimeout(function () {
        x.classList.add("animated", "bounce");
    }, 150);
    setTimeout(function () {
        x.classList.add("animated", "rotateIn");
        x.style.display = "block"
    }, 50);
    x.style.display = "none";
    x.classList.remove("animated", "bounce");
    x.classList.remove("animated", "rotateIn");
};

// MAX round count and then:
var gameFinish = (maxRounds, roundNumber) => {
    if (maxRounds === roundNumber) {
        maxRoundsCountField.innerHTML = "Game has ended";
        maxRoundsCountField.style.color = "red";
        setTimeout(x => {
            var test = document.querySelector("#test");
            var test2 = document.querySelector("#test2");
            test.style.display = "none";
            test2.style.display = "none";
        }, 1800);
        roundCountField.style.display = "none";
        playerRock.classList.toggle("off");
        playerPaper.classList.toggle("off");
        playerScissors.classList.toggle("off");
        setTimeout(x => {
            resultsSection.style.display = "block";
        }, 2000);



        var winner;
        if (playerScore === robotScore) {
            winner = "draw";
        } else if (playerScore > robotScore) {
            winner = "player";
        } else {
            winner = "robot";
        }
        winnerField.innerHTML = winner;


    }
};


// CODE: ------------------------------------------


var playerRock = document.querySelector("#rock");
var playerPaper = document.querySelector("#paper");
var playerScissors = document.querySelector("#scissors");



playerRock.addEventListener('click', function () {
    gameBtns.forEach(x => {
        x.classList.toggle("block");
    });
    var aiMove = randomChar(3);
    aiMoveShow(aiMove);
    gameField.innerHTML = whoWins(1, aiMove);
    gameAnimation();
    roundCount++;
    roundCountField.innerHTML = roundCount;
    gameFinish(maxRoundsCount, roundCount);
    setTimeout(x => {
        gameBtns.forEach(x => {
            x.classList.toggle("block");
        });
    }, btnsTimeout);

});

playerPaper.addEventListener('click', function () {
    gameBtns.forEach(x => {
        x.classList.toggle("block");
    });
    var aiMove = randomChar(3);
    aiMoveShow(aiMove);
    gameField.innerHTML = whoWins(2, aiMove);
    gameAnimation();
    roundCount++;
    roundCountField.innerHTML = roundCount;
    gameFinish(maxRoundsCount, roundCount);
    setTimeout(x => {
        gameBtns.forEach(x => {
            x.classList.toggle("block");
        });
    }, btnsTimeout);
});

playerScissors.addEventListener('click', function () {
    gameBtns.forEach(x => {
        x.classList.toggle("block");
    });
    var aiMove = randomChar(3);
    aiMoveShow(aiMove);
    gameField.innerHTML = whoWins(3, aiMove);
    gameAnimation();
    roundCount++;
    roundCountField.innerHTML = roundCount;
    gameFinish(maxRoundsCount, roundCount);
    setTimeout(x => {
        gameBtns.forEach(x => {
            x.classList.toggle("block");
        });
    }, btnsTimeout);
});