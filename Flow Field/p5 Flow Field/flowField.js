// https://p5js.org/reference/#/p5

const gridSize = 400;
const noiseScale = 0.01;
const resolution = 20;
const particleCount = 10000;
const adherence = .5;
const zSpeed = 0.0005;
const strWeight = .5;
const transparency = 15;
const maxSpeed = 3;

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
  background(0);
}

function draw () {

  for (let x = 0; x < gridSize; x += resolution) {
    for (let y = 0; y < gridSize; y += resolution) {
      let noiseVal = noise(x * noiseScale, y * noiseScale, zOff * noiseScale);
      let v = p5.Vector.fromAngle(noiseVal * TWO_PI);
      v.setMag(adherence);
      flowField[x][y] = v;
    }
    zOff += zSpeed;
  }

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].edging();
    particles[i].show();
    particles[i].follow();
  }
}