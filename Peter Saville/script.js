const canvasWidth = 400;
const canvasHeight = 400;
const resolution = 10;
const noiseScale = .05;
const noiseAmp = 60;
const startPoint = 60;
let xOffset = 0;

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  drawLines(random(0, canvasWidth));
}

function draw () {
  background(0);
  drawLines(xOffset);
  xOffset += 1;
}

function drawLines (offset) {
  for (let i = startPoint; i < canvasHeight - startPoint; i += resolution) {

    let priorNoise = 0;
    for (let j = startPoint; j < canvasWidth - startPoint; j++) {
      let newAmp = getAmplitude(j);
      const pNoise = noise((j + offset) * noiseScale, i * noiseScale) * newAmp;
      drawLine(j, i - priorNoise, j, canvasHeight, 0, 2);
      priorNoise = pNoise;
    }

    priorNoise = 0;
    for (let j = startPoint; j < canvasWidth - startPoint; j++) {
      let newAmp = getAmplitude(j);
      const pNoise = noise((j + offset) * noiseScale, i * noiseScale) * newAmp;
      drawLine(j, i - priorNoise, j + 1, i - pNoise, 255, 1);
      priorNoise = pNoise;
    }
  }
}

function getAmplitude (j) {
  if (j < (canvasWidth / 4) || j > canvasWidth - (canvasWidth / 4)) {
    return 0;
  }
  if (j <= canvasWidth / 2) {
    let topNumber = (j - (canvasWidth / 4));
    let bottomNumber = canvasWidth / 4;
    return (topNumber / bottomNumber) * noiseAmp;
  }
  else {
    let topNumber = (((canvasWidth / 2) - (j - (canvasWidth / 2))) - (canvasWidth / 4));
    let bottomNumber = (canvasWidth / 4);
    return (topNumber / bottomNumber) * noiseAmp;
  }
}

function drawLine (p1, p2, p3, p4, color, sWeight) {
  push();
  stroke(color);
  strokeWeight(sWeight);
  line(p1, p2, p3, p4);
  pop();
}