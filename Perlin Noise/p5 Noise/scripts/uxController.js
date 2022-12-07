const canvasHousing = document.getElementById('canvasHousing');

const htmlInputValues = document.getElementsByClassName("newValueInput");
const htmlInputLabels = Array.from(document.getElementsByClassName("newValueLabel"));

window.onresize = event => {
 createCanvas(100, 100);
 setup();
};

function getDivBoundsForCanvas () {
 settings.gridSizeX = floor(canvasHousing.clientWidth / 100) * 100;
 settings.gridSizeY = floor(canvasHousing.clientHeight / 100) * 100;
}

function updateSettings () {
 updateLabels();
 for (let i = 0; i < htmlInputValues.length; i++) {
  settings[htmlInputValues[i].id] = parseFloat(htmlInputValues[i].value);
 }
}

function updateLabels () {
 for (let i = 0; i < htmlInputValues.length; i++) {
  let label = htmlInputLabels.find((label) => label.getAttribute("for") === htmlInputValues[i].id);
  label.innerText = `${label.innerText.substring(0, label.innerText.indexOf(":") + 1)} ${htmlInputValues[i].value}`;
 }
}

function activateCanvasPause () {
 settings.pauseCanvas = !settings.pauseCanvas;
}