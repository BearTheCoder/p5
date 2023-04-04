const canvasWidth = 1000;
const canvasHeight = 1000;
const refResolution = 1;
const perlinScale = 10;
let xOffset = 1;
let yOffset = 1;

// Change to "draw()" for moving perlin noise.
function setup () {
  createCanvas(canvasWidth, canvasHeight);
  for (let x = 0; x < canvasWidth; x += refResolution) {
    for (let y = 0; y < canvasHeight; y += refResolution) {
      push();
      noStroke();
      const currentColor = perlinNoise((x + xOffset) * perlinScale, (y + yOffset) * perlinScale);
      fill(currentColor);
      square(x, y, refResolution);
      pop();
    }
  }
  xOffset++;
  yOffset++;
}

function perlinNoise (x, y) {

  // "Grid Definition"
  let referenceX = x / canvasWidth;
  let referenceY = y / canvasWidth;
  const cellOriginX = floor(referenceX);
  const cellOriginY = floor(referenceY);
  referenceX = referenceX - cellOriginX;
  referenceY = referenceY - cellOriginY;
  const angleA = getRandomAngle(cellOriginX, cellOriginY);
  const angleB = getRandomAngle(cellOriginX + 1, cellOriginY);
  const angleC = getRandomAngle(cellOriginX, cellOriginY + 1);
  const angleD = getRandomAngle(cellOriginX + 1, cellOriginY + 1);

  // Dot Product
  const dotProduct1 = getDotProduct(referenceX, referenceY, angleA, 0, 0);
  const dotProduct2 = getDotProduct(referenceX, referenceY, angleB, -1, 0);
  const dotProduct3 = getDotProduct(referenceX, referenceY, angleC, 0, -1);
  const dotProduct4 = getDotProduct(referenceX, referenceY, angleD, -1, -1);

  // Interpolation
  const lerpX1 = interpolate(dotProduct1, dotProduct2, referenceX);
  const lerpX2 = interpolate(dotProduct3, dotProduct4, referenceX);
  const lerpY = interpolate(lerpX1, lerpX2, referenceY);

  // Perlin Noise Grayscale Translation
  const currentColor = ((lerpY + 1) / 2) * 255;
  return currentColor;
}

function getRandomAngle (x, y) {

  // Based off of LCGs
  x += 100;
  y += 100;
  const h = 7140275233 + x * 374761393 + y * 668265263;
  const c = x * 374761393;
  const seedXn = ((x * 12) + 7140275233) % y;
  const m = 1012313;
  const result = ((h * seedXn) + c) % m;
  const normalizedNumber = result / m;

  // Translate to an angle
  return floor(normalizedNumber * 360);
}

function getDotProduct (x, y, angle, translationX, translationY) {
  // Get Component Form from Angle
  angleX = cos(angle);
  angleY = sin(angle);

  // Dot Product
  return (angleX * (x + translationX)) + (angleY * (y + translationY));
}

function interpolate (dp1, dp2, p) {
  // Smoothstep
  return (dp2 - dp1) * (3.0 - p * 2.0) * p * p + dp1;
}