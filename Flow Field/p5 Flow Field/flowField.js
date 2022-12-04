// https://p5js.org/reference/#/p5
// https://www.youtube.com/watch?v=BjoM9oKOAKY (The Coding Train - Coding Challenge #24: Perlin Noise Flow Field)

//DOM Elements
const framerateHeader = document.getElementById("framerate");

let canvasHasPerlinNoise = false;
let canvasHasFlowLines = false;
let xOffset = 0;
let yOffset = 0;
let zOffset = 0;

let settings = {
  //Canvas Settings
  gridSizeX: 1200,
  gridSizeY: 800,

  // BG Settings
  backgroundColorRed: 0, //yes
  backgroundColorGreen: 0, //yes
  backgroundColorBlue: 0, //yes

  //Particle Settings
  particleCount: 10000, //yes
  particleStrokeWeight: .5, //yes
  particleColorRed: 255,//yes
  particleColorGreen: 255,//yes
  particleColorBlue: 255,//yes
  particleTransparency: 20,//yes

  //Noise Settings
  noiseScale: .01,
  resolution: 10,
  xSpeed: 0,
  ySpeed: 0,
  zSpeed: 0,

  //Physics Settings
  adherence: 1,
  particleMaxSpeed: 2,
  flowAngle: 2,
};

let particles = [];
let flowField = [];

function setup () {
  particles = [];
  xOffset = Math.random() * 1000;
  yOffset = Math.random() * 1000;
  zOffset = Math.random() * 1000;
  createCanvas(settings.gridSizeX, settings.gridSizeY); //finds the "<main>" tag and adds a canvas to it with the the specifications
  for (let i = 0; i < settings.particleCount; i++) {
    particles[i] = new Particle();
  }


  for (let i = 0; i <= settings.gridSizeX; i += settings.resolution) {
    flowField[i] = [];
  }



  background(
    color(settings.backgroundColorRed, settings.backgroundColorGreen, settings.backgroundColorBlue));
}

function draw () {
  framerateHeader.innerText = `Framerate: ${floor(frameRate())}`;
  if (canvasHasFlowLines) {
    background(0);
  }
  for (let x = 0; x < settings.gridSizeX; x += settings.resolution) {
    for (let y = 0; y < settings.gridSizeY; y += settings.resolution) {
      let noiseVal = noise((x + xOffset) * settings.noiseScale, (y + yOffset) * settings.noiseScale, zOffset * settings.noiseScale);
      let v = p5.Vector.fromAngle(noiseVal * (PI * settings.flowAngle));

      if (canvasHasPerlinNoise) {
        settings.particleTransparency = 100;
        showPerlinNoise(x, y, noiseVal);
      }
      if (canvasHasFlowLines) {
        settings.particleTransparency = 100;
        showFlowLines(x, y, v);
      }

      v.setMag(settings.adherence);
      flowField[x][y] = v;
    }
    xOffset += settings.xSpeed;
    yOffset += settings.ySpeed;
    zOffset += settings.zSpeed;
  }
  showFlowField();

}

function showPerlinNoise (x, y, noiseVal) {
  noStroke();
  fill(noiseVal * 255);
  rect(x, y, settings.resolution, settings.resolution);
}

function showFlowLines (x, y, v) {
  push();
  stroke(255);
  strokeWeight(.4);
  translate(x, y);
  rotate(v.heading());
  line(0, 0, settings.resolution, 0);
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