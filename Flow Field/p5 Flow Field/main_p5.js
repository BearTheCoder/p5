// https://p5js.org/reference/#/p5
// Iterated from: https://www.youtube.com/watch?v=BjoM9oKOAKY (The Coding Train - Coding Challenge #24: Perlin Noise Flow Field)

let particles = [];
let flowField = [];

function setup () {
  settings.xOffset = Math.random() * 1000;
  settings.yOffset = Math.random() * 1000;
  settings.zOffset = Math.random() * 1000;
  getDivBoundsForCanvas();
  createCanvas(settings.gridSizeX, settings.gridSizeY);
  background(color(settings.backgroundColorRed, settings.backgroundColorGreen, settings.backgroundColorBlue));
  updateParticles();
  updateFlowPhysics();
};

function draw () {
  if (settings.pauseCanvas) return;
  document.getElementById("framerate").innerText = `Framerate: ${floor(frameRate())}`;
  if (settings.clearBackground) background(color(settings.backgroundColorRed, settings.backgroundColorGreen, settings.backgroundColorBlue));
  for (let x = 0; x < settings.gridSizeX; x += settings.gridSquareSize) {
    for (let y = 0; y < settings.gridSizeY; y += settings.gridSquareSize) {
      let noiseVal = noise((x + settings.xOffset) * settings.noiseCrowding, (y + settings.yOffset) * settings.noiseCrowding, settings.zOffset * settings.noiseCrowding);
      let v = p5.Vector.fromAngle(noiseVal * (PI * settings.flowMultiplier));
      if (settings.canvasHasPerlinNoise) showPerlinNoise(x, y, noiseVal);
      if (settings.canvasHasFlowLines) showFlowLines(x, y, v);
      v.setMag(settings.adherence);
      flowField[x][y] = v;
    }
    settings.xOffset += settings.xSpeed;
    settings.yOffset += settings.ySpeed;
    settings.zOffset += settings.zSpeed;
  }
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].edging();
    particles[i].show();
    particles[i].follow();
  }
}

function updateParticles () {
  particles = [];
  updateLabels();
  updateSettings();
  for (let i = 0; i < settings.particleCount; i++) {
    particles[i] = new Particle();
  }
}

function updateFlowPhysics () {
  for (let i = 0; i <= settings.gridSizeX; i += settings.gridSquareSize) {
    flowField[i] = [];
  }
}