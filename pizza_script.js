const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 600;
canvas.height = 600;

let score = 0;
document.getElementById("score").textContent = `Score: ${score}`;

const player = {
    x: canvas.width / 2 - 25,
    y: canvas.height / 2 - 25,
    size: 50,
    speed: 5,
    color: "blue",
};

let blocks = [];

function spawnBlock() {
    const size = Math.floor(Math.random() * 40) + 10; // Random size between 10 and 50
    const x = Math.random() * (canvas.width - size);
    const y = Math.random() * (canvas.height - size);
    const color = size < player.size ? "green" : "red"; // Smaller blocks are green (food), bigger are red (danger)
    blocks.push({ x, y, size, color });
}

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.size, player.size);
}

function drawBlocks() {
    blocks.forEach(block => {
        ctx.fillStyle = block.color;
        ctx.fillRect(block.x, block.y, block.size, block.size);
    });
}

function movePlayer() {
    if (keys["ArrowUp"] && player.y > 0) {
        player.y -= player.speed;
    }
    if (keys["ArrowDown"] && player.y + player.size < canvas.height) {
        player.y += player.speed;
    }
    if (keys["ArrowLeft"] && player.x > 0) {
        player.x -= player.speed;
    }
    if (keys["ArrowRight"] && player.x + player.size < canvas.width) {
        player.x += player.speed;
    }
}

function checkCollision() {
    blocks = blocks.filter(block => {
        if (
            player.x < block.x + block.size &&
            player.x + player.size > block.x &&
            player.y < block.y + block.size &&
            player.y + player.size > block.y
        ) {
            if (block.size < player.size) {
                score += block.size; // Eating smaller blocks increases score
                document.getElementById("score").textContent = `Score: ${score}`;
                player.size += block.size / 10; // Player grows slightly after eating
                return false; // Remove the block
            } else {
                // Game over when the player hits a larger block
                alert("Game Over! Final score: " + score);
                resetGame();
            }
        }
        return true;
    });
}

function resetGame() {
    score = 0;
    player.size = 50;
    blocks = [];
    document.getElementById("score").textContent = `Score: ${score}`;
}

const keys = {};
document.addEventListener("keydown", (e) => {
    keys[e.key] = true;
});

document.addEventListener("keyup", (e) => {
    keys[e.key] = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    movePlayer();
    drawPlayer();
    drawBlocks();
    checkCollision();
    
    requestAnimationFrame(gameLoop);
}

setInterval(spawnBlock, 1000); // Spawn a new block every second
resetGame();
gameLoop();
