function gaussian(x, mu, sigma) {
  return (
    (1 / (sigma * Math.sqrt(2 * Math.PI))) *
    Math.exp(-Math.pow(x - mu, 2) / (2 * Math.pow(sigma, 2)))
  );
}

function attractionFactor(value, d, rmin, rmax) {
  if (d >= rmax) return 0;
  if (d <= rmin) return (d - rmin) / rmin;

  const mu = (rmax + rmin) / 3;
  const sigma = 7;

  return value * sigma * 2 * gaussian(d, mu, sigma);
}

export default attractionFactor;
