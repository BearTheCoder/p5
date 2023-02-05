// Adapted from: https://www.youtube.com/watch?v=4066MndcyCk

const canvasWidth = 200;
const canvasHeight = 200;
const pixelResolution = 2;
const numberOfPoints = 50;
let Points = [];

class referencePoint {
  constructor () {
    this.x = random(0, canvasWidth);
    this.y = random(0, canvasHeight);
    this.movementX = random(-1, 1);
    this.movementY = random(-1, 1);
    // this.drawPoint();
  }

  movePoint () {
    this.x += this.movementX;
    this.y += this.movementY;
    if (this.y > canvasHeight || this.y < 0) this.movementY = -this.movementY;
    if (this.x > canvasWidth || this.x < 0) this.movementX = -this.movementX;
  }

  drawPoint () {
    push();
    fill(color(255, 0, 0));
    noStroke();
    circle(this.x, this.y, 2);
    pop();
  }
}

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  spawnPoints();
  updateCanvasPixels();
}

function draw () {
  background(0);
  updateCanvasPixels();
  updatePoints();
  // updateMidpoints();
}

function updatePoints () {
  for (let i = 0; i < Points.length; i++) {
    Points[i].movePoint();
    // Points[i].drawPoint();
  }
}

function updateMidpoints () {
  for (let i = 0; i < Points.length; i++) {
    const closestPoint = returnClosestPoint(Points[i]);
    spawnMidpoint(getMidpoint(Points[i], closestPoint));
  }
}

function updateCanvasPixels () {
  for (let y = 0; y < canvasHeight; y += pixelResolution) {
    for (let x = 0; x < canvasWidth; x += pixelResolution) {
      let distance = returnClosetDistance(x, y);
      fill(color(map(distance, 0, canvasWidth / (numberOfPoints / 8), 255, 0)));
      noStroke();
      square(x, y, pixelResolution);
    }
  }
}

function spawnPoints () {
  for (let i = 0; i < numberOfPoints; i++) {
    Points.push(new referencePoint());
  }
}

function returnClosetDistance (x, y) {
  let distance = 1000000; // Arbitrarily high number
  for (let i = 0; i < Points.length; i++) {
    const distance2 = dist(x, y, Points[i].x, Points[i].y);
    if (distance2 < distance) distance = distance2;
  }
  return distance;
}

function returnClosestPoint (currentPoint) {
  let closestPoint = null;
  let distance = 10000000;
  for (let i = 0; i < Points.length; i++) {
    if (currentPoint !== Points[i]) {
      const distance2 = dist(currentPoint.x, currentPoint.y, Points[i].x, Points[i].y);
      if (distance2 < distance) {
        distance = distance2;
        closestPoint = Points[i];
      }
    }
  }
  return closestPoint;
}

function getMidpoint (pointOne, pointTwo) {
  this.x = (pointTwo.x + pointOne.x) / 2;
  this.y = (pointTwo.y + pointOne.y) / 2;
  return { x, y };
}

function spawnMidpoint (currentPoint) {
  push();
  fill(color(0, 255, 0));
  noStroke();
  circle(currentPoint.x, currentPoint.y, 1);
  pop();
}