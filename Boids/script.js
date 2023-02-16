const canvasHeight = 400;
const canvasWidth = 400;
const boidCount = 40;
const flock = [];

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  for (let i = 0; i < boidCount; i++) {
    flock.push(new boid(width / 2, height / 2));
  }
}

function draw () {
  background(0);
  for (let i = 0; i < flock.length; i++) {
    flock[i].updateLocation();

  }
}