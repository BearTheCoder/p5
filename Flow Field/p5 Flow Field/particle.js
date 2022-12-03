function Particle () {
 this.pos = createVector(random(width), random(height));
 this.vel = createVector(0, 0);
 this.acc = createVector(0, 0);
 this.maxSpeed = particleMaxSpeed;
 this.prevPos = this.pos.copy();

 this.update = () => {
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
  this.acc.mult(0);
 };

 this.follow = () => {
  let x = floor(this.pos.x / resolution) * resolution;
  let y = floor(this.pos.y / resolution) * resolution;
  this.applyForce(flowField[x][y]);
 };

 this.applyForce = (force) => {
  this.acc.add(force);
 };

 this.show = () => {
  stroke(color(particleColorRed, particleColorGreen, particleColorBlue, particleTransparency));
  strokeWeight(particleStrokeWeight);
  line(this.pos.x, this.pos.y, this.prevPos.x, this.prevPos.y);
  this.updatePrev();
 };

 this.updatePrev = () => {
  this.prevPos.x = this.pos.x;
  this.prevPos.y = this.pos.y;
 };

 this.edging = () => {
  if (this.pos.x > width) {
   this.pos.x = 0;
   this.updatePrev();
  }
  if (this.pos.x < 0) {
   this.pos.x = width;
   this.updatePrev();

  }
  if (this.pos.y > height) {
   this.pos.y = 0;
   this.updatePrev();

  }
  if (this.pos.y < 0) {
   this.pos.y = height;
   this.updatePrev();
  }
 };
}