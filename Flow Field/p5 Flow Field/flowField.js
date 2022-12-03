// https://p5js.org/reference/#/p5
// https://www.youtube.com/watch?v=BjoM9oKOAKY (The Coding Train - Coding Challenge #24: Perlin Noise Flow Field)

//DOM Elements
const framerateHeader = document.getElementById("framerate");

//Canvas
const gridSize = 800;
const backgroundColorRed = 0;
const backgroundColorGreen = 0;
const backgroundColorBlue = 0;
let canvasHasPerlinNoise = false;
let canvasHasFlowLines = false;

//Perlin Noise
const noiseScale = 0.01;
const resolution = 20;
const zSpeed = 0.1;
let zOffset = 0;

//Particle Appearance 
const particleCount = 10000;
const particleStrokeWeight = .5;
const particleColorRed = 255;
const particleColorGreen = 255;
const particleColorBlue = 255;
let particleTransparency = 20;

//Flow Field Physics
const adherence = .1;
const particleMaxSpeed = 1;

let particles = [];
let flowField = [];


function setup () {
  createCanvas(gridSize, gridSize); //finds the "<main>" tag and adds a canvas to it with the the specifications
  for (let i = 0; i < particleCount; i++) {
    particles[i] = new Particle();
  }
  for (let i = 0; i <= gridSize; i += resolution) {
    flowField[i] = [];
  }
  background(color(backgroundColorRed, backgroundColorGreen, backgroundColorBlue));
}

function draw () {
  framerateHeader.innerText = `Framerate: ${floor(frameRate())}`;
  if (canvasHasFlowLines) {
    background(0);
  }
  for (let x = 0; x < gridSize; x += resolution) {
    for (let y = 0; y < gridSize; y += resolution) {
      let noiseVal = noise(x * noiseScale, y * noiseScale, zOffset * noiseScale);
      let v = p5.Vector.fromAngle(noiseVal * TWO_PI);

      if (canvasHasPerlinNoise) {
        particleTransparency = 100;
        showPerlinNoise(x, y, noiseVal);
      }
      if (canvasHasFlowLines) {
        particleTransparency = 100;
        showFlowLines(x, y, v);
      }

      v.setMag(adherence);
      flowField[x][y] = v;
    }
    zOffset += zSpeed;
  }
  showFlowField();

}

function showPerlinNoise (x, y, noiseVal) {
  noStroke();
  fill(noiseVal * 255);
  rect(x, y, resolution, resolution);
}

function showFlowLines (x, y, v) {

  push();
  stroke(255);
  strokeWeight(.4);
  translate(x, y);
  rotate(v.heading());
  line(0, 0, resolution, 0);
  pop();
}

function showFlowField () {
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].edging();
    particles[i].show();
    particles[i].follow();
  }
}