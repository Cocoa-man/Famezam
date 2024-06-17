const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Rocket properties
let rocket = {
    x: canvas.width / 2,
    y: canvas.height - 50,
    width: 30,
    height: 50,
    velocity: 0,
    acceleration: 0.2,
    fuel: 100
};

// Game state
let keys = {};
let isRunning = true;

// Event listeners for keyboard input
window.addEventListener('keydown', (e) => {
    keys[e.code] = true;
});

window.addEventListener('keyup', (e) => {
    keys[e.code] = false;
});

function drawRocket() {
    ctx.fillStyle = 'white';
    ctx.fillRect(rocket.x - rocket.width / 2, rocket.y - rocket.height / 2, rocket.width, rocket.height);
}

function update() {
    if (keys['ArrowUp'] && rocket.fuel > 0) {
        rocket.velocity -= rocket.acceleration;
        rocket.fuel -= 1;
    } else {
        rocket.velocity += rocket.acceleration / 2;
    }

    rocket.y += rocket.velocity;

    if (rocket.y > canvas.height - rocket.height / 2) {
        rocket.y = canvas.height - rocket.height / 2;
        rocket.velocity = 0;
    }

    if (rocket.y < rocket.height / 2) {
        rocket.y = rocket.height / 2;
        rocket.velocity = 0;
    }

    if (rocket.fuel < 0) {
        rocket.fuel = 0;
    }
}

function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawRocket();
    drawFuel();

    if (isRunning) {
        requestAnimationFrame(render);
    }
}

function drawFuel() {
    ctx.fillStyle = 'green';
    ctx.fillRect(10, 10, rocket.fuel * 2, 20);

    ctx.strokeStyle = 'white';
    ctx.strokeRect(10, 10, 200, 20);
}

function gameLoop() {
    update();
    render();
}

gameLoop();
