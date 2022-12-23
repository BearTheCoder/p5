const width = 750;
const height = 500;
const noiseScale = .005;
const noiseAmplifier = 300;
const noiseResolution = 10;

let yVal = 0;
let priorVal = 0;
let basePoint = 400;
let offset = 1;

function setup () {
  createCanvas(width, height);
  frameRate(60);
}

function draw () {
  background(255);
  stroke(255);

  push();
  noStroke();
  fill(color(255, 0, 0));
  circle(width / 3, height / 3, 100);
  pop();

  for (let i = 0; i < width; i += noiseResolution, offset += .01) {
    yVal = noise((i + offset) * noiseScale, basePoint * noiseScale) * noiseAmplifier;

    push();

    strokeWeight(2);
    stroke(0);

    if (i === 0) {
      line(i, basePoint - yVal, i + noiseResolution, basePoint - yVal);
      line(i, basePoint - yVal, i, height);
    }
    else {
      line(i, priorVal, i + noiseResolution, basePoint - yVal);
      line(i, priorVal, i, height);
    }

    priorVal = basePoint - yVal;

    if (i === width / 2) circleHeight = basePoint - yVal;
    pop();
  }

  push();
  noStroke();
  fill(255);
  pop();
}