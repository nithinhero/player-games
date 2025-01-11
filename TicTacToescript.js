const PLAYER_X = 'X';
const PLAYER_O = 'O';
let currentPlayer = PLAYER_X;
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

// Initialize the game board
function initBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = ''; // Clear the board content

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.addEventListener('click', () => makeMove(row, col));
            boardElement.appendChild(cell);
        }
    }
}

// Handle making a move
function makeMove(row, col) {
    // Check if the cell is empty and if the game is still ongoing
    if (board[row][col] === '') {
        board[row][col] = currentPlayer;  // Mark the current player's move on the board
        updateBoard();  // Update the visual representation of the board

        // Check for a winner or a full board (draw)
        if (checkWinner()) {
            document.getElementById('message').textContent = `Player ${currentPlayer} wins!`;
            resetBoard();
        } else if (isBoardFull()) {
            document.getElementById('message').textContent = "It's a draw!";
            resetBoard();
        } else {
            // Switch to the other player
            currentPlayer = currentPlayer === PLAYER_X ? PLAYER_O : PLAYER_X;
        }
    }
}

// Update the displayed board based on the current state of the 'board' array
function updateBoard() {
    const cells = document.querySelectorAll('.cell');
    let index = 0;
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            cells[index].textContent = board[row][col];
            index++;
        }
    }
}

// Check if the current player has won the game
function checkWinner() {
    // Check rows, columns, and diagonals for a win
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;  // Row win
        }
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;  // Column win
        }
    }

    // Check diagonals
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }
    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }

    return false;  // No win detected
}

// Check if the board is full (i.e., a draw)
function isBoardFull() {
    return board.flat().every(cell => cell !== '');
}

// Reset the game board for a new game
function resetBoard() {
    setTimeout(() => {
        board = [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ];
        currentPlayer = PLAYER_X;  // Reset to player X
        initBoard();  // Re-initialize the board visually
        document.getElementById('message').textContent = '';  // Clear any game over message
    }, 2000);  // Reset after 2 seconds
}

// Initialize the game when the page loads
window.onload = initBoard;
