function attractionFactor(value, d, rmin, rmax) {
  if (d >= rmax) return 0;
  if (d <= rmin) return ((d - rmin) / rmin) * 4;

  const mid = (rmax + rmin) / 2;
  const midDistance = (rmax - rmin) / 2 + rmin;

  let force;
  if (d < midDistance) {
    force = (value / (midDistance - rmin)) * (d - rmin);
  } else {
    force = (value / (rmax - midDistance)) * (rmax - d);
  }

  return force;
}

export default attractionFactor;
