// https://p5js.org/reference/#/p5

function setup () {
  getDivBoundsForCanvas();
  createCanvas(settings.gridSizeX, settings.gridSizeY);
}

function draw () {
  if (settings.pauseCanvas) return;
  document.getElementById("framerate").innerText = `Framerate: ${floor(frameRate())}`;
  for (let x = 0; x < settings.gridSizeX; x += settings.gridSquareSize) {
    for (let y = 0; y < settings.gridSizeY; y += settings.gridSquareSize) {
      let noiseVal = noise((x + settings.xOffset) * settings.noiseCrowding, (y + settings.yOffset) * settings.noiseCrowding, settings.zOffset * settings.noiseCrowding);
      noStroke();
      fill(noiseVal * 255);
      rect(x, y, settings.gridSquareSize, settings.gridSquareSize);
    }
    settings.xOffset += settings.xSpeed;
    settings.yOffset += settings.ySpeed;
    settings.zOffset += settings.zSpeed;
  }
}