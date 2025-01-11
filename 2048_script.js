const gameContainer = document.getElementById("game-container");
const scoreBox = document.getElementById("score-box");

let grid = [];
let score = 0;

// Initialize the game
function initGame() {
    grid = Array(4).fill(null).map(() => Array(4).fill(0));
    addNewTile();
    addNewTile();
    renderGrid();
    updateScore();
}

// Add a new tile to the grid
function addNewTile() {
    let emptyCells = [];
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) {
                emptyCells.push({ row, col });
            }
        }
    }

    if (emptyCells.length > 0) {
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        grid[randomCell.row][randomCell.col] = Math.random() < 0.9 ? 2 : 4;
    }
}

// Render the grid
function renderGrid() {
    gameContainer.innerHTML = "";
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            tile.textContent = grid[row][col] === 0 ? "" : grid[row][col];
            tile.style.backgroundColor = getTileColor(grid[row][col]);
            gameContainer.appendChild(tile);
        }
    }
}

// Get tile color based on value
function getTileColor(value) {
    const colors = {
        0: "#ccc0b3",
        2: "#eee4da",
        4: "#ede0c8",
        8: "#f2b179",
        16: "#f59563",
        32: "#f67c5f",
        64: "#f65e3b",
        128: "#edcf72",
        256: "#edcc61",
        512: "#edc850",
        1024: "#edc53f",
        2048: "#edc22e",
    };
    return colors[value] || "#3c3a32";
}

// Handle key presses
function handleKeyPress(event) {
    let moved = false;

    switch (event.key) {
        case "ArrowUp":
            moved = moveUp();
            break;
        case "ArrowDown":
            moved = moveDown();
            break;
        case "ArrowLeft":
            moved = moveLeft();
            break;
        case "ArrowRight":
            moved = moveRight();
            break;
    }

    if (moved) {
        addNewTile();
        renderGrid();
        updateScore();
        if (checkWinner()) {
            alert("Congratulations! You reached 2048!");
        } else if (checkGameOver()) {
            alert("Game Over! Your score: " + score);
        }
    }
}

// Update the score display
function updateScore() {
    scoreBox.textContent = `Score: ${score}`;
}

// Move tiles up
function moveUp() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
        let values = [];
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== 0) {
                values.push(grid[row][col]);
            }
        }

        let merged = mergeTiles(values);
        for (let row = 0; row < 4; row++) {
            if (grid[row][col] !== merged[row]) {
                moved = true;
            }
            grid[row][col] = merged[row] || 0;
        }
    }

    return moved;
}

// Move tiles down
function moveDown() {
    let moved = false;

    for (let col = 0; col < 4; col++) {
        let values = [];
        for (let row = 3; row >= 0; row--) {
            if (grid[row][col] !== 0) {
                values.push(grid[row][col]);
            }
        }

        let merged = mergeTiles(values);
        for (let row = 3, index = 0; row >= 0; row--, index++) {
            if (grid[row][col] !== merged[index]) {
                moved = true;
            }
            grid[row][col] = merged[index] || 0;
        }
    }

    return moved;
}

// Move tiles left
function moveLeft() {
    let moved = false;

    for (let row = 0; row < 4; row++) {
        let values = grid[row].filter(value => value !== 0);

        let merged = mergeTiles(values);
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] !== merged[col]) {
                moved = true;
            }
            grid[row][col] = merged[col] || 0;
        }
    }

    return moved;
}

// Move tiles right
function moveRight() {
    let moved = false;

    for (let row = 0; row < 4; row++) {
        let values = grid[row].filter(value => value !== 0).reverse();

        let merged = mergeTiles(values).reverse();
        for (let col = 3, index = 0; col >= 0; col--, index++) {
            if (grid[row][col] !== merged[index]) {
                moved = true;
            }
            grid[row][col] = merged[index] || 0;
        }
    }

    return moved;
}

// Merge tiles
function mergeTiles(values) {
    let merged = [];

    while (values.length > 0) {
        if (values.length > 1 && values[0] === values[1]) {
            merged.push(values[0] * 2);
            score += values[0] * 2;
            values.splice(0, 2);
        } else {
            merged.push(values[0]);
            values.splice(0, 1);
        }
    }

    return merged;
}

// Check if the player has won
function checkWinner() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 2048) return true;
        }
    }
    return false;
}

// Check if the game is over
function checkGameOver() {
    for (let row = 0; row < 4; row++) {
        for (let col = 0; col < 4; col++) {
            if (grid[row][col] === 0) return false;

            if (
                (row > 0 && grid[row][col] === grid[row - 1][col]) ||
                (col > 0 && grid[row][col] === grid[row][col - 1])
            ) {
                return false;
            }
        }
    }

    return true;
}

// Start the game
document.addEventListener("keydown", handleKeyPress);
initGame();
