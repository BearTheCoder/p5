let noiseScale = 0.02;
function setup () {
 createCanvas(1200, 800);
 background(100);
 line(15, 25, 70, 90);
}

function draw () {
 background(0);
 for (let x = 0; x < width; x++) {
  for (let y = 0; y < array.length; y++) {
   let noiseVal = noise((x) * noiseScale, Y * noiseScale);

  }

 }
}