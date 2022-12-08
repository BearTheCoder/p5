// https://p5js.org/reference/#/p5

function setup () {
  getDivBoundsForCanvas();
  createCanvas(settings.gridSizeX, settings.gridSizeY);
}

function draw () {
  if (settings.pauseCanvas) return;
  document.getElementById("framerate").innerText = `Framerate: ${floor(frameRate())}`;
  let myMaxValue = 0;
  let myMinValue = 0;

  let colorArray = [];
  for (let x = 0; x < settings.gridSizeX; x += settings.gridSquareSize) {
    for (let y = 0; y < settings.gridSizeY; y += settings.gridSquareSize) {
      let noiseVal = 0;
      let octaveOpacity = 1;
      let octaveFrequency = 1;
      for (let i = 0; i < settings.octaveScale; i++) {
        let output = noise(
          ((x + settings.xOffset) * octaveFrequency) * settings.noiseCrowding,
          ((y + settings.yOffset) * octaveFrequency) * settings.noiseCrowding,
          (settings.zOffset * settings.octaveFrequency) * settings.noiseCrowding);
        noiseVal += output * octaveOpacity;
        octaveOpacity *= settings.octaveOpacity;
        octaveFrequency *= settings.octaveFrequency;
      }
      myMaxValue = noiseVal > myMaxValue ? noiseVal : myMaxValue;
      myMinValue = noiseVal < myMinValue ? noiseVal : myMinValue;
      colorArray.push(noiseVal);
    }
    settings.xOffset += settings.xSpeed;
    settings.yOffset += settings.ySpeed;
    settings.zOffset += settings.zSpeed;
  }

  for (let x = 0, i = 0; x < settings.gridSizeX; x += settings.gridSquareSize) {
    for (let y = 0; y < settings.gridSizeY; y += settings.gridSquareSize, i++) {
      let inverseLerp = (colorArray[i] - myMinValue) / (myMaxValue - myMinValue);
      noStroke();
      fill(inverseLerp * 255);
      rect(x, y, settings.gridSquareSize, settings.gridSquareSize);
    }
  }
}