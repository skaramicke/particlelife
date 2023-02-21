import setup from "./setup.js";
import attractionFactor from "./attractionFactor.js";
import drawParticle from "./drawParticle.js";
import drawActivationCurve from "./drawActivationCurve";
import drawAttractionMap, { attractionMapCells } from "./attractionMapUI.js";
import { clear } from "./clear";

const particle_radius = 2;
const particle_count = 600;
const color_count = 10;
const rmax =
  Math.min(window.innerWidth, window.innerHeight) / 3 - particle_radius * 2;
const rmin = particle_radius * 6;
const max_speed = 0.002;
const max_force = 0.001;
const attraction_constant = 0.00001;

// end of settings

let UI_visible = true;

const body = document.getElementsByTagName("body")[0];
var canvas = document.createElement("canvas");
body.appendChild(canvas);
canvas.style.position = "absolute";
canvas.style.top = 0;
canvas.style.left = 0;
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const context = canvas.getContext("2d");

// register scroll mouse event listener
const didScroll = (e) => {
  if (!UI_visible) {
    return;
  }

  // Figure out which color cell the mouse is over
  // and update the attraction map
  const x = e.clientX;
  const y = e.clientY;

  let indexSet = findIndexSet(x, y);

  if (!indexSet) {
    return;
  }

  const { i, j } = indexSet;

  attraction_map[i][j] += e.deltaY * 0.001;
  // cap attraction at 1
  if (attraction_map[i][j] > 1) {
    attraction_map[i][j] = 1;
  }
  // cap attraction at -1
  if (attraction_map[i][j] < -1) {
    attraction_map[i][j] = -1;
  }
};
window.addEventListener("wheel", didScroll);

window.addEventListener("click", (e) => {
  // Figure out which color cell the mouse is over

  let indexSet = findIndexSet(e.clientX, e.clientY);

  // If click on github link
  if (
    UI_visible &&
    e.clientX > 20 &&
    e.clientX < 200 &&
    e.clientY > canvas.height - 30 &&
    e.clientY < canvas.height - 10
  ) {
    window.open("https://github.com/skaramicke/particlelife");
    return;
  }

  if (!UI_visible || !indexSet) {
    // Toggle UI visibility
    UI_visible = !UI_visible;
    return;
  }

  const { i, j } = indexSet;

  attraction_map[i][j] = 0;
});

clear(context, canvas);

var {
  attraction_map,
  particle_positions,
  particle_colors,
  particle_speeds,
  colors,
} = setup(particle_count, color_count, max_speed, canvas);

let last_time = Date.now() - 1 / 60;
const loop = () => {
  const now = Date.now();
  const dt = now - last_time;
  last_time = now;

  clear(context, canvas);

  for (let i = 0; i < particle_count; i++) {
    const p = particle_positions[i];
    const c = particle_colors[i];
    const s = particle_speeds[i];

    // Define force vector
    let { fx, fy } = calculateForces(i, p, c);

    // Apply force to particle
    s.x += fx * dt;
    s.y += fy * dt;

    // Apply friction
    s.x *= 0.9;
    s.y *= 0.9;

    // Cap speed to max_force
    const speed = Math.sqrt(fx * fx + fy * fy);
    if (speed > max_speed) {
      s.x = (s.x / speed) * max_speed;
      s.y = (s.y / speed) * max_speed;
    }

    // Move particle
    p.x += s.x * dt;
    p.y += s.y * dt;

    if (p.x < 0) p.x = canvas.width;
    if (p.x > canvas.width) p.x = 0;
    if (p.y < 0) p.y = canvas.height;
    if (p.y > canvas.height) p.y = 0;

    drawParticle(context, colors[c], p.x, p.y, particle_radius);
  }

  if (UI_visible) {
    // Draws activation curve graph
    drawActivationCurve(context, dt);

    // Draws the attraction map UI
    drawAttractionMap(context, attraction_map, colors);

    // Write instructions
    context.fillStyle = "white";
    context.font = "12px Arial";
    context.fillText(
      "Scroll on circle diagram to change top color attraction to left color.",
      20,
      canvas.height - 40
    );
    context.fillText(
      "Click circle diagram to reset top color attraction/repellation to left color.",
      20,
      canvas.height - 60
    );
    context.fillStyle = "yellow";
    context.font = "12px Arial";
    context.fillText(
      "github.com/skaramicke/particlelife, please contribute.",
      20,
      canvas.height - 20
    );
  }

  // Call the loop function again in 1/60th of a second
  requestAnimationFrame(loop);
};

loop();

function findIndexSet(x, y) {
  let indexSet;
  attractionMapCells.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (
        x >= cell.x &&
        x <= cell.x + cell.width &&
        y >= cell.y &&
        y <= cell.y + cell.height
      ) {
        indexSet = { i, j };
      }
    });
  });
  return indexSet;
}

function calculateForces(i, p, c) {
  let fx = 0.0;
  let fy = 0.0;

  for (let j = 0; j < particle_count; j++) {
    if (i == j) continue;

    const p2 = particle_positions[j];
    const c2 = particle_colors[j];

    // Calculate closest distance between particles across edges
    // Possible distances
    const distances = [
      { dx: p2.x - p.x, dy: p2.y - p.y },
      { dx: p2.x - p.x + canvas.width, dy: p2.y - p.y },
      { dx: p2.x - p.x - canvas.width, dy: p2.y - p.y },
      { dx: p2.x - p.x, dy: p2.y - p.y + canvas.height },
      { dx: p2.x - p.x, dy: p2.y - p.y - canvas.height },
      { dx: p2.x - p.x + canvas.width, dy: p2.y - p.y + canvas.height },
      { dx: p2.x - p.x - canvas.width, dy: p2.y - p.y - canvas.height },
      { dx: p2.x - p.x + canvas.width, dy: p2.y - p.y - canvas.height },
      { dx: p2.x - p.x - canvas.width, dy: p2.y - p.y + canvas.height },
    ].filter((d) => {
      return Math.sqrt(d.dx * d.dx + d.dy * d.dy) < rmax;
    });

    if (distances.length == 0) continue;

    // Find the shortest distance
    let shortest_distance = distances[0];
    for (let k = 1; k < distances.length; k++) {
      if (
        Math.sqrt(
          distances[k].dx * distances[k].dx + distances[k].dy * distances[k].dy
        ) <
        Math.sqrt(
          shortest_distance.dx * shortest_distance.dx +
            shortest_distance.dy * shortest_distance.dy
        )
      ) {
        shortest_distance = distances[k];
      }
    }

    const dx = shortest_distance.dx;
    const dy = shortest_distance.dy;

    const d = Math.sqrt(dx * dx + dy * dy);

    // Absolute attraction
    let a = attractionFactor(attraction_map[c][c2], d, rmin, rmax);

    // normal vector
    const nx = dx / d;
    const ny = dy / d;

    fx += nx * a * attraction_constant;
    fy += ny * a * attraction_constant;

    // context.strokeStyle = "rgb(255, 255, 255)";
    // context.strokeWidth = 5 * Math.abs(a);
    // context.beginPath();
    // context.moveTo(p.x, p.y);
    // context.lineTo(p2.x, p2.y);
    // context.stroke();
    // context.closePath();
  }

  // Apply max force
  const force = Math.sqrt(fx * fx + fy * fy);
  if (force > max_force) {
    fx = (fx / force) * max_force;
    fy = (fy / force) * max_force;
  }

  return { fx, fy };
}
