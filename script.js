let score = 0;
let questionCount = 5;
let currentQuestion = 0;
let correctAnswer = 0;

function askQuestion() {
    if (currentQuestion < questionCount) {
        document.getElementById('message').textContent = ''; // Clear previous messages
        
        const num1 = Math.floor(Math.random() * 50) + 1;
        const num2 = Math.floor(Math.random() * 50) + 1;
        const operations = ['+', '-', '*', '/'];
        const operation = operations[Math.floor(Math.random() * operations.length)];
        
        let questionText;
        if (operation === '+') {
            correctAnswer = num1 + num2;
            questionText = `What is ${num1} + ${num2}?`;
        } else if (operation === '-') {
            correctAnswer = num1 - num2;
            questionText = `What is ${num1} - ${num2}?`;
        } else if (operation === '*') {
            correctAnswer = num1 * num2;
            questionText = `What is ${num1} * ${num2}?`;
        } else if (operation === '/') {
            correctAnswer = Math.round((num1 / num2) * 100) / 100; // Round to 2 decimal places
            questionText = `What is ${num1} / ${num2}?`;
        }

        document.getElementById('question').textContent = questionText;
        document.getElementById('answer').value = '';
        currentQuestion++;
    } else {
        endGame();
    }
}

function submitAnswer() {
    const userAnswer = document.getElementById('answer').value;
    
    if (isNaN(userAnswer)) {
        document.getElementById('message').textContent = 'Invalid input! Enter a number.';
        return;
    }

    const answer = parseFloat(userAnswer);

    if (Math.abs(answer - correctAnswer) < 0.01) {
        score++;
        document.getElementById('score').textContent = score;
        askQuestion();
    } else {
        document.getElementById('message').textContent = 'Incorrect! Try again.';
    }
}

function endGame() {
    document.getElementById('question').textContent = `Game Over! Your score: ${score}`;
    document.getElementById('answer').style.display = 'none';
    document.querySelector('button').style.display = 'none';
}

window.onload = askQuestion;
