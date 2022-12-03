const particleColor = document.getElementById("particleColor");


function turnOnNoise () {
  background(0);
  canvasHasPerlinNoise = !canvasHasPerlinNoise;
  if (canvasHasPerlinNoise) {
    reloadCanvas();
  }
}

function turnOnFlowLines () {
  canvasHasFlowLines = !canvasHasFlowLines;
  if (canvasHasFlowLines) {
    reloadCanvas();
  }
}

function reloadCanvas () {
  console.log(particleColor.value);
  setup();
}