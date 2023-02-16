const canvasWidth = 523;
const canvasHeight = 168;
let logo;
const locations = [];
const selectedLocations = [];
const circles = [];
const circleCount = 40;
let circleSize = .1;
let growSize = .001;

function preload () {
  logo = loadImage('./images/fedex_logo.png');
}

function setup () {
  background(0);
  createCanvas(canvasWidth, canvasHeight);
  for (let x = 0; x < logo.width; x++) {
    for (let y = 0; y < logo.height; y++) {
      if (x % 10 === 0 && y % 10 === 0) {
        if (logo.get(x, y)[3] !== 0) {
          locations.push({ x: x / 10, y: y / 10 });
        }
      }
    }
  }


  for (let i = 0; i < circleCount; i++) {
    push();
    fill(color(0, 0, 0, 0));
    stroke(0);
    strokeWeight(2);
    const randNum = Math.floor(Math.random() * locations.length);
    const location = locations[randNum];
    selectedLocations.push(location);
    circles.push(circle(location.x, location.y, 1));
    pop();
  }


}

function draw () {
  background(0);
  for (let i = 0; i < circleCount; i++) {
    circle(selectedLocations[i].x, selectedLocations[i].y, circleSize += growSize);
  }
}