//This is ripped directly from the p5js website. Original code be Sagar Arora

// this class describes the properties of a single particle.
class Particle {
  // setting the co-ordinates, radius and the
  // speed of a particle in both the co-ordinates axes.
  constructor () {
    this.posX = random(0, width);
    this.posY = random(0, height);
    this.radius = random(1, 8);
    this.xSpeed = random(-2, 2);
    this.ySpeed = random(-1, 1.5);
  }

  // creation of a particle.
  createParticle () {
    noStroke();
    fill('rgba(200,169,169,0.5)');
    circle(this.posX, this.posY, this.radius);
  }

  // Move particle in constant direction, move to other side of the screen if past the screen width or height.
  moveParticle () {
    if (this.posX < 0 || this.posX > width)
      this.xSpeed *= -1;
    if (this.posY < 0 || this.posY > height)
      this.ySpeed *= -1;
    this.posX += this.xSpeed;
    this.posY += this.ySpeed;
  }

  // this function creates the connections(lines)
  // between particles which are less than a certain distance apart
  joinParticles (particles) {
    particles.forEach(element => {
      let dis = dist(this.posX, this.posY, element.posX, element.posY);
      if (dis < 85) {
        stroke('rgba(255,255,255,0.04)');
        line(this.posX, this.posY, element.posX, element.posY);
      }
    });
  }
}

// an array to add multiple particles
let particles = [];

function setup () {
  createCanvas(1920, 1080);
  for (let i = 0; i < width / 10; i++) {
    particles.push(new Particle());
  }
}

function draw () {
  background('#0f0f0f');
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}