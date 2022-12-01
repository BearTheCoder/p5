// https://p5js.org/reference/#/p5

const gridSize = 400;
const noiseScale = 0.01;
const resolution = 5;
const xOff = 0;
const yOff = 10;
const particleCount = 200;
let zOff = 0;
let particles = [];
let flowField = [];

function setup () {
  createCanvas(gridSize, gridSize);
  for (let i = 0; i < particleCount; i++) {
    particles[i] = new Particle();
  }
  for (let i = 0; i <= gridSize; i += resolution) {
    flowField[i] = [];
  }
  background(255);
}

function draw () {

  for (let x = 0; x < gridSize; x += resolution) {
    for (let y = 0; y < gridSize; y += resolution) {
      let noiseVal = noise((x + xOff) * noiseScale, (y + yOff) * noiseScale, zOff * noiseScale);
      let v = p5.Vector.fromAngle(noiseVal * TWO_PI);
      v.setMag(10);
      flowField[x][y] = v;
    }
    zOff += .0007;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    particles[i].edging();
    particles[i].follow();
  }
}