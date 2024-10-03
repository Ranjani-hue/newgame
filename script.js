const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define the grid size and the unit for snake and food.
const grid = 20;
let count = 0;

// Initial snake settings
let snake = {
  x: grid * 5,
  y: grid * 5,
  dx: grid, // Horizontal movement (moving right initially)
  dy: 0,    // Vertical movement (no vertical movement initially)
  cells: [], // The segments of the snake
  maxCells: 4 // Snake starts with a length of 4
};

// Initial food position
let food = {
  x: grid * 10,
  y: grid * 10
};

// Key controls
document.addEventListener('keydown', function(e) {
  // Left arrow key
  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;
  }
  // Up arrow key
  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;
  }
  // Right arrow key
  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }
  // Down arrow key
  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }
});

// Game loop
function gameLoop() {
  requestAnimationFrame(gameLoop);
  if (++count < 20) {
    return;
  }
  count = 0;

  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Move the snake
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Wrap the snake position horizontally on edge of screen
  if (snake.x < 0) {
    snake.x = canvas.width - grid;
  } else if (snake.x >= canvas.width) {
    snake.x = 0;
  }

  // Wrap the snake position vertically on edge of screen
  if (snake.y < 0) {
    snake.y = canvas.height - grid;
  } else if (snake.y >= canvas.height) {
    snake.y = 0;
  }

  // Keep track of where the snake has been
  snake.cells.unshift({ x: snake.x, y: snake.y });

  // Remove cells as we move, keeping the length consistent
  if (snake.cells.length > snake.maxCells) {
    snake.cells.pop();
  }

  // Draw the food
  ctx.fillStyle = 'red';
  ctx.fillRect(food.x, food.y, grid - 1, grid - 1);

  // Draw the snake
  ctx.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    ctx.fillRect(cell.x, cell.y, grid - 1, grid - 1);

    // Check if the snake has eaten the food
    if (cell.x === food.x && cell.y === food.y) {
      snake.maxCells++;

      // Randomly place food on the grid
      food.x = Math.floor(Math.random() * (canvas.width / grid)) * grid;
      food.y = Math.floor(Math.random() * (canvas.height / grid)) * grid;
    }

    // Check if the snake collides with itself
    for (let i = index + 1; i < snake.cells.length; i++) {
      if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
        // Reset the game if the snake collides with itself
        snake.x = grid * 5;
        snake.y = grid * 5;
        snake.cells = [];
        snake.maxCells = 4;
        snake.dx = grid;
        snake.dy = 0;

        food.x = grid * 10;
        food.y = grid * 10;
      }
    }
  });
}

// Start the game
requestAnimationFrame(gameLoop);
