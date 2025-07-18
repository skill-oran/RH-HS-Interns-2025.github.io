// Load classic DOOM
Dos(document.getElementById("jsdos")).run("doom.jsdos");

// Fullscreen function for DOOM container
function enterFullscreen() {
    const dosContainer = document.getElementById("jsdos");
    if (dosContainer.requestFullscreen) {
        dosContainer.requestFullscreen();
    } else if (dosContainer.webkitRequestFullscreen) {
        dosContainer.webkitRequestFullscreen();
    } else if (dosContainer.msRequestFullscreen) {
        dosContainer.msRequestFullscreen();
    }
}

// Show the secret message
function showMessage() {
    document.getElementById('secret').classList.remove('hidden');
}

// Mini click game logic
const box = document.getElementById('box');
const scoreDisplay = document.getElementById('score');
const timeDisplay = document.getElementById('time');
const gameArea = document.getElementById('game-area');

let score = 0;
let timeLeft = 30;
let gameInterval, timerInterval;

function moveBox() {
    const x = Math.random() * (gameArea.clientWidth - 50);
    const y = Math.random() * (gameArea.clientHeight - 50);
    box.style.left = `${x}px`;
    box.style.top = `${y}px`;
    box.style.display = 'block';
}

box.addEventListener('click', () => {
    score++;
    scoreDisplay.textContent = score;
    moveBox();
});

function startGame() {
    score = 0;
    timeLeft = 30;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = timeLeft;

    moveBox();

    gameInterval = setInterval(moveBox, 1000);

    timerInterval = setInterval(() => {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(gameInterval);
            clearInterval(timerInterval);
            box.style.display = 'none';
            alert(`Game over! Your score is ${score}`);
        }
    }, 1000);
}

window.onload = startGame;
