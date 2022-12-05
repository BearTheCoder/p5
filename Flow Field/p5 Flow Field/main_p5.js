// https://p5js.org/reference/#/p5
// https://www.youtube.com/watch?v=BjoM9oKOAKY (The Coding Train - Coding Challenge #24: Perlin Noise Flow Field)

let particles = [];
let flowField = [];
let myCanvas = null;

function setup () {
  settings.xOffset = Math.random() * 1000;
  settings.yOffset = Math.random() * 1000;
  settings.zOffset = Math.random() * 1000;
  myCanvas = createCanvas(settings.gridSizeX, settings.gridSizeY);
  updateParticles();
  updateFlowPhysics();
  background(color(settings.backgroundColorRed, settings.backgroundColorGreen, settings.backgroundColorBlue));
};

function draw () {
  if (!settings.pauseCanvas) {
    document.getElementById("framerate").innerText = `Framerate: ${floor(frameRate())}`;
    if (settings.clearBackground) {
      background(color(settings.backgroundColorRed, settings.backgroundColorGreen, settings.backgroundColorBlue));
    }
    null;
    for (let x = 0; x < settings.gridSizeX; x += settings.gridSquareSize) {
      for (let y = 0; y < settings.gridSizeY; y += settings.gridSquareSize) {
        let noiseVal = noise((
          x + settings.xOffset) * settings.noiseCrowding,
          (y + settings.yOffset) * settings.noiseCrowding,
          settings.zOffset * settings.noiseCrowding);
        let v = p5.Vector.fromAngle(noiseVal * (PI * settings.flowMultiplier));
        if (settings.canvasHasPerlinNoise) {
          settings.particleTransparency = 100;
          showPerlinNoise(x, y, noiseVal);
        }
        if (settings.canvasHasFlowLines) {
          settings.particleTransparency = 100;
          showFlowLines(x, y, v);
        }
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
}

function updateParticles () {
  particles = [];
  for (let i = 0; i < settings.particleCount; i++) {
    particles[i] = new Particle();
  }
}

function updateFlowPhysics () {
  for (let i = 0; i <= settings.gridSizeX; i += settings.gridSquareSize) {
    flowField[i] = [];
  }
}