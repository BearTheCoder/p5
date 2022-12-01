// https://p5js.org/reference/#/p5

let noiseScale = 0.02;
const resolution = 3;
let xOffset = 10;
let yOffset = 0;

function setup () {
  createCanvas(800, 800);
  background(100);
  line(15, 25, 70, 90);
}

function draw () {
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let noiseVal = noise((x + xOffset) * noiseScale, (y + yOffset) * noiseScale);
      fill(noiseVal * 255);
      noStroke();
      rect(x, y, resolution, resolution);
    }

  }
}