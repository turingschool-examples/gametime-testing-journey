const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext('2d');
const Dingus = require('./dingus');
let dingus = new Dingus({ ctx: ctx });

// Start a loop to animate the game
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dingus.draw();
  dingus.scoot();
  requestAnimationFrame(animate);
}

animate();
