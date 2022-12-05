const newParticleColor = document.getElementById("particleColor");
const newBackgroundColor = document.getElementById("backgroundColor");
const htmlInputValues = document.getElementsByClassName("newValueInput");
const clearBackgroundCheckbox = document.getElementById('clearBackground');
const htmlInputLabels = Array.from(document.getElementsByClassName("newValueLabel"));

function activateCanvasPause () {
  settings.pauseCanvas = !settings.pauseCanvas;
}

function activateBackgroundClearing () {
  if (!settings.canvasHasPerlinNoise && !settings.canvasHasFlowLines) {
    settings.clearBackground = !settings.clearBackground;
    getBackgroundColor();
  }
}

function turnOnNoise () {
  background(0);
  settings.canvasHasPerlinNoise = !settings.canvasHasPerlinNoise;
  if (clearBackgroundCheckbox.checked) {
    clearBackgroundCheckbox.checked ? activateBackgroundClearing() : null;
  }
}

function turnOnFlowLines () {
  background(0);
  settings.canvasHasFlowLines = !settings.canvasHasFlowLines;
  settings.clearBackground = settings.canvasHasFlowLines ? true : false;
  if (!settings.canvasHasPerlinNoise && !settings.canvasHasFlowLines && clearBackgroundCheckbox.checked) {
    clearBackgroundCheckbox.checked ? activateBackgroundClearing() : null;
  }
}

function reloadCanvas () {
  updateSettings();
  getBackgroundColor();
  getPixelColor();
  setup();
}

function getPixelColor () {
  const convertedParticleColor = convertHexToRGB(particleColor.value);
  settings.particleColorRed = convertedParticleColor.red;
  settings.particleColorGreen = convertedParticleColor.green;
  settings.particleColorBlue = convertedParticleColor.blue;
}

function getBackgroundColor () {
  const convertedBackgroundColor = convertHexToRGB(newBackgroundColor.value);
  settings.backgroundColorRed = convertedBackgroundColor.red;
  settings.backgroundColorGreen = convertedBackgroundColor.green;
  settings.backgroundColorBlue = convertedBackgroundColor.blue;
}

function convertHexToRGB (hexColor) {
  const convertedParticleColor = {
    red: parseInt(hexColor.substring(1, 3), 16),
    green: parseInt(hexColor.substring(3, 5), 16),
    blue: parseInt(hexColor.substring(5, 7), 16),
  };
  return convertedParticleColor;
}

function updateSettings () {
  updateLabels();
  for (let i = 0; i < htmlInputValues.length; i++) {
    if (!htmlInputValues[i].id.includes("Color")) {
      settings[htmlInputValues[i].id] = parseFloat(htmlInputValues[i].value);
    }
  }
  updateParticles();
  updateFlowPhysics();
}

function updateLabels () {
  for (let i = 0; i < htmlInputValues.length; i++) {
    if (!htmlInputValues[i].id.includes("Color")) {
      let label = htmlInputLabels.find((label) => label.getAttribute("for") === htmlInputValues[i].id);
      label.innerText = `${label.innerText.substring(0, label.innerText.indexOf(":") + 1)} ${htmlInputValues[i].value}`;
    }
  }
}

function showPerlinNoise (x, y, noiseVal) {
  noStroke();
  fill(noiseVal * 255);
  rect(x, y, settings.gridSquareSize, settings.gridSquareSize);
}

function showFlowLines (x, y, v) {
  push();
  stroke(255);
  strokeWeight(.4);
  translate(x, y);
  rotate(v.heading());
  line(0, 0, settings.gridSquareSize, 0);
  pop();
}

function takeScreenshot () {
  saveCanvas(myCanvas, "screenshot.png");
}