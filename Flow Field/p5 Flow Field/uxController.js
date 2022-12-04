const newParticleColor = document.getElementById("particleColor");
const newBackgroundColor = document.getElementById("backgroundColor");
const htmlInputValues = document.getElementsByClassName("newValueInput");

function turnOnNoise () {
  background(0);
  canvasHasPerlinNoise = !canvasHasPerlinNoise;
  if (canvasHasPerlinNoise) {
    reloadCanvas();
  }
}

function turnOnFlowLines () {
  background(0);
  canvasHasFlowLines = !canvasHasFlowLines;
  if (canvasHasFlowLines) {
    reloadCanvas();
  }
}

function reloadCanvas () {
  for (let i = 0; i < htmlInputValues.length; i++) {
    if (!htmlInputValues[i].id.includes("Color")) {
      settings[htmlInputValues[i].id] = parseFloat(htmlInputValues[i].value);
    }
  }
  const convertedParticleColor = convertHexToRGB(particleColor.value);
  const convertedBackgroundColor = convertHexToRGB(newBackgroundColor.value);
  settings.particleColorRed = convertedParticleColor.red;
  settings.particleColorGreen = convertedParticleColor.green;
  settings.particleColorBlue = convertedParticleColor.blue;
  settings.backgroundColorRed = convertedBackgroundColor.red;
  settings.backgroundColorGreen = convertedBackgroundColor.green;
  settings.backgroundColorBlue = convertedBackgroundColor.blue;
  setup();
}

function convertHexToRGB (hexColor) {
  const convertedParticleColor = {
    red: parseInt(hexColor.substring(1, 3), 16),
    green: parseInt(hexColor.substring(3, 5), 16),
    blue: parseInt(hexColor.substring(5, 7), 16),
  };
  return convertedParticleColor;
}