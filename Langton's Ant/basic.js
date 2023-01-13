const width = 800;
const height = 400;
let ant = {};
let grid = null;
function setup () {
  createCanvas(width, height);
  background(255);
  grid = createMultiDimensionalArray(width, height);
  ant = {
    location: createVector(width / 2, height / 2),
    heading: 0,
  };
  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      grid[x][y] = false;
    }
  }
}

function createMultiDimensionalArray (width, height) {
  let MDArray = [];
  for (let i = 0; i < width; i++) MDArray.push(new Array(height));
  return MDArray;
}

function draw () {
  renderFrames(100);
}

function renderFrames (framerate) {
  for (let i = 0; i < framerate; i++) {
    ant.location.x = ant.location.x === -1 ? width - 1 : ant.location.x;
    ant.location.y = ant.location.y === -1 ? height - 1 : ant.location.y;
    ant.location.x = ant.location.x === width ? 0 : ant.location.x;
    ant.location.y = ant.location.y === height ? 0 : ant.location.y;
    grid[ant.location.x][ant.location.y] = !grid[ant.location.x][ant.location.y];
    let color = grid[ant.location.x][ant.location.y] ? 0 : 255;
    point(ant.location.x, ant.location.y);
    stroke(color);
    let movement = color === 0 ? 1 : -1;
    turnAnt(movement);
  }
}

function turnAnt (movement) {
  if (ant.heading === 0) ant.location.x = ant.location.x + movement;
  else if (ant.heading === 1) ant.location.y = ant.location.y - movement;
  else if (ant.heading === 2) ant.location.x = ant.location.x - movement;
  else if (ant.heading === 3) ant.location.y = ant.location.y + movement;
  ant.heading = ant.heading + movement;
  ant.heading = ant.heading === 4 ? 0 : ant.heading;
  ant.heading = ant.heading === -1 ? 3 : ant.heading;
}
