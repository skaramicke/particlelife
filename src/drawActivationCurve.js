import attractionFactor from "./attractionFactor.js";

export function drawActivationCurve(context) {
  const graph_rmax = 50;
  const graph_rmin = 10;
  const graph_distance = 60;
  const ox = 60;
  const oy = 120;
  const width_scale = 5;
  const height_scale = 50;

  context.strokeStyle = "rgba(0, 255, 0, 0.5)";
  context.beginPath();
  context.moveTo(ox, oy);
  context.lineTo(ox + graph_rmax * width_scale, oy);
  context.stroke();
  context.closePath();

  // Print text
  context.fillStyle = "rgba(255, 255, 255, 0.5)";
  context.font = "12px Arial";
  context.fillText("0", ox - 10, oy + 5);
  context.fillText("1", ox - 10, oy - height_scale + 5);
  context.fillText("rmin", ox + graph_rmin * width_scale - 13, oy + 35);
  context.fillText("rmax", ox + graph_rmax * width_scale - 13, oy + 35);

  context.strokeStyle = "rgba(255, 0, 0, 0.5)";
  context.beginPath();
  context.moveTo(ox, oy + height_scale);
  context.lineTo(ox, oy - height_scale);
  context.stroke();
  context.closePath();

  // Mark rmin and rmax
  context.strokeStyle = "rgba(255, 255, 0, 0.5)";
  context.beginPath();
  context.moveTo(ox + graph_rmin * width_scale, oy - 20);
  context.lineTo(ox + graph_rmin * width_scale, oy + 20);
  context.stroke();
  context.closePath();
  context.beginPath();
  context.moveTo(ox + graph_rmax * width_scale, oy - 20);
  context.lineTo(ox + graph_rmax * width_scale, oy + 20);
  context.stroke();
  context.closePath();

  context.beginPath();
  context.strokeStyle = "rgba(255, 255, 255, 0.5)";
  for (let i = 0; i <= graph_distance; i++) {
    const d = i;
    const a = attractionFactor(1, d, graph_rmin, graph_rmax);
    const x = ox + d * width_scale;
    const y = oy + -a * height_scale;
    context.lineTo(x, y);
  }
  context.stroke();
  context.closePath();
}

export default drawActivationCurve;
