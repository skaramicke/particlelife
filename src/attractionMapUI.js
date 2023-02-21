let attractionMapCells = [];

const drawAttractionMap = (context, attraction_map, colors) => {
  const width = context.canvas.width;
  const height = context.canvas.height;
  const cell_size = 20;
  const padding = 20;
  const gap = 3;
  const map_width = (attraction_map.length + 1) * cell_size;
  const map_height = (attraction_map.length + 1) * cell_size;

  const x = width - map_width - padding;
  const y = height - map_height - padding;

  if (attractionMapCells.length === 0) {
    attractionMapCells = Array(attraction_map.length)
      .fill()
      .map(() => Array(attraction_map.length).fill(0));
  }

  attraction_map.forEach((row, i) => {
    context.fillStyle = colors[i];
    context.fillRect(
      x + (cell_size + gap) * i,
      y - (cell_size + gap) - padding / 2,
      cell_size,
      cell_size
    );
    row.forEach((attraction, j) => {
      if (attractionMapCells[i][j] === 0) {
        attractionMapCells[i][j] = {
          x: x + (cell_size + gap) * i,
          y: y + (cell_size + gap) * j,
          width: cell_size,
          height: cell_size,
        };
      }

      context.fillStyle = colors[j];
      context.fillRect(
        x - (cell_size + gap) - padding / 2,
        y + (cell_size + gap) * j,
        cell_size,
        cell_size
      );

      const color = `hsl(${(attraction + 1) * 60}, 100%, 50%)`;
      context.fillStyle = color;

      // Draw pie chart diagram for positive side of attraction
      if (attraction > 0) {
        context.beginPath();
        context.moveTo(
          x + (cell_size + gap) * i + cell_size / 2,
          y + (cell_size + gap) * j + cell_size / 2
        );
        context.arc(
          x + (cell_size + gap) * i + cell_size / 2,
          y + (cell_size + gap) * j + cell_size / 2,
          cell_size / 2,
          0,
          attraction * Math.PI * 2
        );
        context.closePath();
        context.fill();
      }

      if (attraction < 0) {
        context.beginPath();
        context.moveTo(
          x + (cell_size + gap) * i + cell_size / 2,
          y + (cell_size + gap) * j + cell_size / 2
        );
        context.arc(
          x + (cell_size + gap) * i + cell_size / 2,
          y + (cell_size + gap) * j + cell_size / 2,
          cell_size / 2,
          0,
          attraction * Math.PI * 2,
          true
        );
        context.closePath();
        context.fill();
      }
    });
  });
};

export default drawAttractionMap;
export { attractionMapCells };
