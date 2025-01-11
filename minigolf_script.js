const canvas = document.getElementById('golfCourse');
const ctx = canvas.getContext('2d');

let ball = {
    x: 50,
    y: 350,
    radius: 10,
    vx: 0,
    vy: 0,
    friction: 0.98,
    color: 'white'
};

let hole = {
    x: 750,
    y: 350,
    radius: 15,
    color: 'black'
};

let isGameActive = true;

function drawBall() {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
    ctx.fillStyle = ball.color;
    ctx.fill();
    ctx.closePath();
}

function drawHole() {
    ctx.beginPath();
    ctx.arc(hole.x, hole.y, hole.radius, 0, Math.PI * 2);
    ctx.fillStyle = hole.color;
    ctx.fill();
    ctx.closePath();
}

function update() {
    if (isGameActive) {
        ball.x += ball.vx;
        ball.y += ball.vy;

        // Apply friction
        ball.vx *= ball.friction;
        ball.vy *= ball.friction;

        // Simple boundary collision
        if (ball.x - ball.radius < 0 || ball.x + ball.radius > canvas.width) {
            ball.vx = -ball.vx;
        }
        if (ball.y - ball.radius < 0 || ball.y + ball.radius > canvas.height) {
            ball.vy = -ball.vy;
        }

        // Check if the ball is in the hole
        if (Math.hypot(ball.x - hole.x, ball.y - hole.y) < ball.radius + hole.radius) {
            alert('Congratulations! You got the ball in the hole!');
            isGameActive = false;
        }
    }

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawHole();
    requestAnimationFrame(update);
}

function shoot(event) {
    if (isGameActive) {
        const rect = canvas.getBoundingClientRect();
        const mouseX = event.clientX - rect.left;
        const mouseY = event.clientY - rect.top;

        // Calculate angle and power
        const angle = Math.atan2(mouseY - ball.y, mouseX - ball.x);
        const power = Math.min(5, Math.hypot(mouseX - ball.x, mouseY - ball.y) / 10);

        ball.vx = Math.cos(angle) * power;
        ball.vy = Math.sin(angle) * power;
    }
}

function resetGame() {
    ball.x = 50;
    ball.y = 350;
    ball.vx = 0;
    ball.vy = 0;
    isGameActive = true;
    update();
}

// Event listeners
canvas.addEventListener('click', shoot);
update();
