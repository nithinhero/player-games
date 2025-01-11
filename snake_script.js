const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');

const gridSize = 20;
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];
let snakeDirection = { x: 0, y: 0 };
let food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
let score = 0;

// Listen for arrow key presses to change direction
window.addEventListener('keydown', (e) => {
    switch (e.key) {
        case 'ArrowUp':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (snakeDirection.y === 0) snakeDirection = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (snakeDirection.x === 0) snakeDirection = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (snakeDirection.x === 0) snakeDirection = { x: 1, y: 0 };
            break;
    }
});

function gameLoop() {
    // Move snake
    const newHead = { 
        x: snake[0].x + snakeDirection.x, 
        y: snake[0].y + snakeDirection.y 
    };

    // Check for collisions with wall
    if (newHead.x < 0 || newHead.x >= cols || newHead.y < 0 || newHead.y >= rows || snakeCollision(newHead)) {
        resetGame();
        return;
    }

    // Add new head to snake
    snake.unshift(newHead);

    // Check for collisions with food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
        food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
    } else {
        snake.pop();
    }

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Draw snake
    ctx.fillStyle = 'orange';
    snake.forEach(segment => ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize));

    setTimeout(gameLoop, 100);
}

// Check if snake collides with itself
function snakeCollision(head) {
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === head.x && snake[i].y === head.y) return true;
    }
    return false;
}

// Reset the game after collision
function resetGame() {
    snake = [{ x: 10, y: 10 }];
    snakeDirection = { x: 0, y: 0 };
    score = 0;
    scoreElement.textContent = `Score: 0`;
    food = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) };
}

// Start the game loop
gameLoop();
