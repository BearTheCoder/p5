// https://p5js.org/reference/#/p5

let gridSizeX = 1000;
let gridSizeY = 1700;
let noiseScale = 0.02;
let resolution = 5;
let xOff = 0;
let yOff = 10;

function setup () {
  createCanvas(gridSizeX, gridSizeY);
}

function draw () {
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let noiseVal = noise((x + xOff) * noiseScale, (y + yOff) * noiseScale);
      noStroke();
      fill(noiseVal * 255);
      rect(x, y, resolution, resolution);
    }
  }
  // xOff += 5;
}