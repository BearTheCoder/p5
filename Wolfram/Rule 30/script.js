let rule30Array = [];
const canvasWidth = 500;
const canvasHeight = 100;
const gridSize = 2;

function setup () {
  createCanvas(canvasWidth, canvasHeight);
  background(0);
  setupMultiArray();
}

function setupMultiArray () {
  for (let x = 0; x < canvasHeight / gridSize; x++) {
    let tempArray = [];
    for (let y = 0; y < canvasWidth / gridSize; y++) {
      if (x + 1 === (canvasHeight / gridSize) && y === (canvasWidth / gridSize) / 2) tempArray.push(1);
      else tempArray.push(0);
    }
    rule30Array.push(tempArray);
  }
}

function draw () {
  background(0);
  drawGrid();

  let tempArray = [];
  for (let i = 0; i < rule30Array[rule30Array.length - 1].length; i++) {
    let rule = returnRule(i);
    const definition = ruleDictionary(rule);
    tempArray.push(definition);
  }

  rule30Array.shift();
  rule30Array.push(tempArray);
}

function drawGrid () {
  for (let x = 0; x < canvasHeight / gridSize; x++) {
    for (let y = 0; y < canvasWidth / gridSize; y++) {
      fill(rule30Array[x][y] * 255);
      noStroke();
      rect(y * gridSize, x * gridSize, gridSize, gridSize);
    }
  }
}

function returnRule (i) {
  const currentArray = rule30Array[rule30Array.length - 1];
  let rule = [];
  if (i === 0) {
    rule.push(currentArray[currentArray.length - 1]);
    rule.push(currentArray[i]);
    rule.push(currentArray[i + 1]);
  }
  else if (currentArray.length - 1 === i) {
    rule.push(currentArray[i - 1]);
    rule.push(currentArray[i]);
    rule.push(currentArray[0]);
  }
  else {
    rule.push(currentArray[i - 1]);
    rule.push(currentArray[i]);
    rule.push(currentArray[i + 1]);
  }
  return rule;
}

function ruleDictionary (ruleArray) {
  if (ruleArray[0] === 0) {
    if (ruleArray[1] === 0 && ruleArray[2] === 0) return 0;
    else return 1;
  }
  else {
    if (ruleArray[1] === 0 && ruleArray[2] === 0) return 1;
    else return 0;
  }
}