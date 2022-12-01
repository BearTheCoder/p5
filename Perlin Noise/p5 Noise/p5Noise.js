// https://p5js.org/reference/#/p5

let noiseScale = 0.02;
let resolution = 5;
let xOff = 0;
let yOff = 10;

function setup () {
  createCanvas(500, 500);
  background(100);
  line(15, 25, 70, 90);
}

function draw () {
  background(0);
  for (let x = 0; x < width; x += resolution) {
    for (let y = 0; y < height; y += resolution) {
      let noiseVal = noise((x + xOff) * noiseScale, (y + yOff) * noiseScale);
      noStroke();
      fill(noiseVal * 255);
      rect(x, y, resolution, resolution);
    }
  }
  xOff += 5;
  console.log(floor(frameRate()));
}