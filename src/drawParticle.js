function drawParticle(context, color, x, y, r) {
  context.fillStyle = color;
  context.beginPath();
  context.arc(x, y, r, 0, 2 * Math.PI);
  context.fill();
  context.closePath();

  // Draw particle outside of canvas if it is too close to the edge
  if (x < r) {
    context.beginPath();
    context.arc(x + context.canvas.width, y, r, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  } else if (x > context.canvas.width - r) {
    context.beginPath();
    context.arc(x - context.canvas.width, y, r, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  } else if (y < r) {
    context.beginPath();
    context.arc(x, y + context.canvas.height, r, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  } else if (y > context.canvas.height - r) {
    context.beginPath();
    context.arc(x, y - context.canvas.height, r, 0, 2 * Math.PI);
    context.fill();
    context.closePath();
  }
}

export default drawParticle;
