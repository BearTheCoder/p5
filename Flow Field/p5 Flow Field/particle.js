function Particle () {
 this.pos = createVector(random(width), random(height));
 this.vel = createVector(0, 0);
 this.acc = createVector(0, 0);
 this.maxSpeed = 2;

 this.update = () => {
  this.vel.add(this.acc);
  this.vel.limit(this.maxSpeed);
  this.pos.add(this.vel);
  this.acc.mult(0);
  this.prevPos = this.pos.copy();
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
  stroke(0, 5);
  strokeWeight(1);
  point(this.pos.x, this.pos.y);
 };

 this.edging = () => {
  this.pos.x = this.pos.x > width ? 0 : this.pos.x;
  this.pos.x = this.pos.x < 0 ? width : this.pos.x;
  this.pos.y = this.pos.y > height ? 0 : this.pos.y;
  this.pos.y = this.pos.y < 0 ? height : this.pos.y;
 };
}