function setup(particle_count, color_count, max_speed, canvas) {
  const particle_positions = Array(particle_count)
    .fill()
    .map((i) => {
      return {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
      };
    });

  const particle_speeds = Array(particle_count)
    .fill()
    .map((i) => {
      return {
        x: (Math.random() * 2 - 1) * max_speed,
        y: (Math.random() * 2 - 1) * max_speed,
      };
    });

  const colors = Array(color_count)
    .fill()
    .map((i, index) => {
      return `hsl(${(index / color_count) * 360}, 100%, 50%)`;
    });

  const particle_colors = Array(particle_count)
    .fill()
    .map((i, index) => {
      return Math.floor((index / particle_count) * color_count);
    });

  let attraction_map = Array(color_count)
    .fill()
    .map((i) => {
      return Array(color_count)
        .fill()
        .map((j) => Math.random() * 2 - 1);
    });
  return {
    attraction_map,
    particle_positions,
    particle_colors,
    particle_speeds,
    colors,
  };
}

export default setup;
