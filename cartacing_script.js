let score = 0;
let isGameOver = false;
const gameArea = document.getElementById('gameArea');
const playerCar = document.getElementById('playerCar');
const scoreDisplay = document.getElementById('score');

// Game settings
const gameWidth = 400;
const gameHeight = 600;
const carWidth = 50;
const carHeight = 100;
const obstacleWidth = 50;
const obstacleHeight = 100;

// Player car position
let carPositionX = (gameWidth - carWidth) / 2;
let carPositionY = gameHeight - carHeight - 20;

// Move player car based on arrow keys
document.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft' && carPositionX > 0) {
        carPositionX -= 10;
    } else if (event.key === 'ArrowRight' && carPositionX < gameWidth - carWidth) {
        carPositionX += 10;
    }
});

// Create obstacle
function createObstacle() {
    const obstacle = document.createElement('div');
    obstacle.classList.add('obstacle');
    obstacle.style.left = `${Math.random() * (gameWidth - obstacleWidth)}px`;
    obstacle.style.top = `-100px`; // Starts off-screen
    gameArea.appendChild(obstacle);

    moveObstacle(obstacle);
}

// Move obstacle down the screen
function moveObstacle(obstacle) {
    const obstacleSpeed = 2;
    let obstaclePositionY = -100;

    function move() {
        if (isGameOver) return;
        
        obstaclePositionY += obstacleSpeed;
        obstacle.style.top = `${obstaclePositionY}px`;

        // Check for collision
        if (obstaclePositionY + obstacleHeight >= carPositionY && obstaclePositionY <= carPositionY + carHeight) {
            if (parseInt(obstacle.style.left) + obstacleWidth >= carPositionX && parseInt(obstacle.style.left) <= carPositionX + carWidth) {
                endGame();
                return;
            }
        }

        // If the obstacle goes out of the screen, remove it
        if (obstaclePositionY >= gameHeight) {
            gameArea.removeChild(obstacle);
            score++;
            updateScore();
        }

        if (!isGameOver) {
            requestAnimationFrame(move);
        }
    }

    move();
}

// Update score display
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// End the game
function endGame() {
    isGameOver = true;
    alert('Game Over! Final Score: ' + score);
}

// Start the game
function startGame() {
    isGameOver = false;
    score = 0;
    updateScore();
    setInterval(createObstacle, 1500); // Create new obstacles every 1.5 seconds
    requestAnimationFrame(movePlayer);
}

// Move the player car in the game area
function movePlayer() {
    playerCar.style.left = `${carPositionX}px`;
    if (!isGameOver) {
        requestAnimationFrame(movePlayer);
    }
}

startGame();
