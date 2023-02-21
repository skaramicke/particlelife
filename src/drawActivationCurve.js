import attractionFactor from "./attractionFactor.js";

let time = 0;
export function drawActivationCurve(context, dt) {
  time += dt;

  const value = Math.sin(time / 500);

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
  context.fillText(" 0", ox - 20, oy + 5);
  context.fillText(" 1", ox - 20, oy - height_scale + 5);
  context.fillText("-1", ox - 20, oy + height_scale + 5);

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
  context.fillText("rmin", ox + graph_rmin * width_scale - 13, oy + 35);

  context.beginPath();
  context.moveTo(ox + graph_rmax * width_scale, oy - 20);
  context.lineTo(ox + graph_rmax * width_scale, oy + 20);
  context.stroke();
  context.closePath();
  context.fillText("rmax", ox + graph_rmax * width_scale - 13, oy + 35);

  context.beginPath();
  context.strokeStyle = "rgba(255, 255, 255, 0.5)";
  for (let i = 0; i <= graph_distance; i++) {
    const d = i;
    const a = attractionFactor(value, d, graph_rmin, graph_rmax);
    const x = ox + d * width_scale;
    const y = oy + -a * height_scale;
    context.lineTo(x, y);
  }
  context.stroke();
  context.closePath();
  context.fillText("distance", ox + graph_distance * width_scale + 5, oy + 5);
  context.fillText("attraction", ox - 24, oy + height_scale + 20);
  context.fillText(
    `value: ${Math.round(value * 100) / 100}`,
    ox + 80,
    oy - height_scale - 5
  );
}

export default drawActivationCurve;
