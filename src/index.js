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

const run = () => {
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

  const x = 100;
  const y = 100;
  const r = 50;
  const color = "rgba(255, 0, 0, 1)";

  drawParticle(context, color, x, y, r);
};

run();
