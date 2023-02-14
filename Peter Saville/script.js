const canvasWidth = 600;
const canvasHeight = 600;
const resolution = 5;
const noiseScale = .02;
const maxAmp = 150;
const minAmp = 10;
const startPoint = 80;
let xOffset = 0;

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  sketch(random(0, canvasWidth));
}

function draw () {
  background(0);
  sketch(xOffset);
  xOffset += 1;
}

function sketch (offset) {
  for (let y = startPoint; y < canvasHeight - startPoint; y += resolution) {

    //Draw Black Infill
    let priorNoise = 0;
    for (let x = startPoint; x < canvasWidth - startPoint; x++) {
      let newAmp = getAmplitude(x);
      const pNoise = noise((x + offset) * noiseScale, y * noiseScale) * newAmp;
      if (priorNoise === 0) priorNoise = pNoise;
      drawLine(x, y - priorNoise, x, canvasHeight, 0, 2);
      priorNoise = pNoise;
    }

    // Draw White Line
    priorNoise = 0;
    for (let x = startPoint; x < canvasWidth - startPoint; x++) {
      let newAmp = getAmplitude(x);
      const pNoise = noise((x + offset) * noiseScale, y * noiseScale) * newAmp;
      if (priorNoise === 0) priorNoise = pNoise;
      drawLine(x, y - priorNoise, x + 1, y - pNoise, 255, .75);
      priorNoise = pNoise;
    }
  }
}

function getAmplitude (j) {
  if (j < (canvasWidth / 3) || j > canvasWidth - (canvasWidth / 3)) return minAmp;
  if (j <= canvasWidth / 2) {
    let topNumber = (j - (canvasWidth / 3));
    let bottomNumber = canvasWidth / 3;
    return ((topNumber / bottomNumber) * maxAmp) + minAmp;
  }
  else {
    let topNumber = (((canvasWidth / 2) - (j - (canvasWidth / 2))) - (canvasWidth / 3));
    let bottomNumber = (canvasWidth / 3);
    return ((topNumber / bottomNumber) * maxAmp) + minAmp;
  }
}

function drawLine (p1, p2, p3, p4, color, sWeight) {
  push();
  stroke(color);
  strokeWeight(sWeight);
  line(p1, p2, p3, p4);
  pop();
}