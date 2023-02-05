// Adapted from: https://www.youtube.com/watch?v=4066MndcyCk

const canvasWidth = 200;
const canvasHeight = 200;
const resolution = 2;
const vPoints = 50;
let allVPoints = [];

class voronoiPoint {
  constructor () {
    this.x = random(0, canvasWidth);
    this.y = random(0, canvasHeight);
    this.mDirX = random(-1, 1);
    this.mDirY = random(-1, 1);
    // this.drawVPoint();
  }

  moveVPoint () {
    this.x += this.mDirX;
    this.y += this.mDirY;
    if (this.y > canvasHeight || this.y < 0) this.mDirY = -this.mDirY;
    if (this.x > canvasWidth || this.x < 0) this.mDirX = -this.mDirX;
  }

  drawVPoint () {
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
  updateNoise();
}

function draw () {
  background(0);
  updateNoise();
  updateVPoints();
  // updateMidpoints();
  console.log(frameRate());
}

function updateVPoints () {
  for (let i = 0; i < allVPoints.length; i++) {
    allVPoints[i].moveVPoint();
    // allVPoints[i].drawVPoint();
  }
}

function updateMidpoints () {
  for (let i = 0; i < allVPoints.length; i++) {
    const closestPoint = returnClosestPoint(allVPoints[i]);
    spawnMidpoint(getMidpoint(allVPoints[i], closestPoint));
  }
}

function updateNoise () {
  for (let y = 0; y < canvasHeight; y += resolution) {
    for (let x = 0; x < canvasWidth; x += resolution) {
      let distance = returnClosetDistance(x, y);
      fill(color(map(distance, 0, canvasWidth / (vPoints / 8), 255, 0)));
      noStroke();
      square(x, y, resolution);
    }
  }
}

function spawnPoints () {
  for (let i = 0; i < vPoints; i++) {
    allVPoints.push(new voronoiPoint());
  }
}

function returnClosetDistance (x, y) {
  let distance = 1000000; // Arbitrarily high number
  for (let i = 0; i < allVPoints.length; i++) {
    const distance2 = dist(x, y, allVPoints[i].x, allVPoints[i].y);
    if (distance2 < distance) distance = distance2;
  }
  return distance;
}

function returnClosestPoint (currentPoint) {
  let closestPoint = null;
  let distance = 10000000;
  for (let i = 0; i < allVPoints.length; i++) {
    if (currentPoint !== allVPoints[i]) {
      const distance2 = dist(currentPoint.x, currentPoint.y, allVPoints[i].x, allVPoints[i].y);
      if (distance2 < distance) {
        distance = distance2;
        closestPoint = allVPoints[i];
      }
    }
  }
  return closestPoint;
}

function getMidpoint (p1, p2) {
  this.x = (p2.x + p1.x) / 2;
  this.y = (p2.y + p1.y) / 2;
  return { x, y };
}

function spawnMidpoint (point) {
  push();
  fill(color(0, 255, 0));
  noStroke();
  circle(point.x, point.y, 1);
  pop();
}