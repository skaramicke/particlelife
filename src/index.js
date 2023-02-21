const clear = (context, canvas) => {
  // Set the fill color to black
  context.fillStyle = "#000";

  // Fill the canvas with the color
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Set draw style to white
  context.strokeStyle = "rgba(255, 255, 255, 1)";
};

function drawParticle(context, color, x, y, r) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fill();
  context.closePath();
}

const body = document.getElementsByTagName("body")[0];

var canvas = document.createElement("canvas");
body.appendChild(canvas);

// Make the canvas fill the page
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Get the 2D drawing context
var context = canvas.getContext("2d");

clear(context, canvas);

let x = 0;
let y = 0;

// Define a run loop
const loop = (dt) => {
  clear(context, canvas);

  x = 100 + 50 * Math.cos(dt / 1000);
  y = 100 + 50 * Math.sin(dt / 1000);

  // Draw a circle
  drawParticle(context, "red", x, y, 50);

  // Call the loop function again in 1/60th of a second
  requestAnimationFrame(loop);
};

loop();
