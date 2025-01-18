// Global variables for chase mode
let mousePosition = [0, 0]; // Current position of the mouse
let catPosition = [1, 1]; // Initial position of the "cat"
let gameOver = false;

function startChaseMode() {
    mousePosition = [0, 0];
    canvas.onmousemove = updateMousePosition; // Update mouse position on movement
    gameOver = false; // Reset game state
    chaseLoop(); // Start the chase loop
}
function endChaseMode() {
    canvas.onmousemove = function(ev) { if(ev.buttons == 1) { click(ev) }}; // Update mouse position on movement
}


function updateMousePosition(ev) {
    [mousePosition[0], mousePosition[1]] = convertCoordinatesEventToGL(ev);
}

function chaseLoop() {
    if (gameOver) return;

    // Move the "cat" towards the mouse
    const dx = mousePosition[0] - catPosition[0];
    const dy = mousePosition[1] - catPosition[1];
    const distance = Math.sqrt(dx * dx + dy * dy);

    // Cat movement speed
    const speed = 0.005;
    if (distance > 0.01) {
        catPosition[0] += (dx / distance) * speed;
        catPosition[1] += (dy / distance) * speed;
    }

    // Check for collision
    if (distance < 0.05) {
        gameOver = true;
        alert('Game Over! You got caught!');
        endChaseMode();
        return;
    }

    // Render
    renderChaseMode();
    requestAnimationFrame(chaseLoop);
}

function renderChaseMode() {
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Render the "mouse"
    const mouse = new Circle();
    mouse.position = mousePosition;
    mouse.color = [0.0, 0.9, 0.2, 1.0]; // Green for the mouse
    mouse.size = 10;
    mouse.render();

    // Render the "cat"
    const cat = new Triangle();
    cat.position = catPosition;
    cat.color = [1.0, 0.0, 0.4, 1.0]; // Red for the cat
    cat.size = 30;
    cat.render();
}
