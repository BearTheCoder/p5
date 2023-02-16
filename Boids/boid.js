class boid {
  radius = 5;
  posX = 0;
  posY = 0;
  speedX = 0;
  speedY = 0;
  constructor (x, y) {
    this.speedX = random(-1, 1);
    this.speedY = random(-1, 1);
    this.createCircle(x, y);
  }

  createCircle (x, y) {
    push();
    circle(x, y, this.radius);
    this.posX = x;
    this.posY = y;
    pop();
  }

  updateLocation () {
    this.edgeDetection();
    this.posX += this.speedX;
    this.posY += this.speedY;
    this.createCircle(this.posX, this.posY);
  }

  edgeDetection () {
    this.posX = this.posX > canvasWidth ? 0 : this.posX;
    this.posX = this.posX < 0 ? canvasWidth : this.posX;
    this.posY = this.posY > canvasHeight ? 0 : this.posY;
    this.posY = this.posY < 0 ? canvasHeight : this.posY;
  }
}