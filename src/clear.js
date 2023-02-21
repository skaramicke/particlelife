export const clear = (context, canvas) => {
  // Set the fill color to black
  context.fillStyle = "#000";

  // Fill the canvas with the color
  context.fillRect(0, 0, canvas.width, canvas.height);

  // Set draw style to white
  context.strokeStyle = "rgba(255, 255, 255, 1)";
};
