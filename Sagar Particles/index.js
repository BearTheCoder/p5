//This is ripped directly from the p5js website. Original code be Sagar Arora

function Particle () {
  this.posX = random(0, width);
  this.posY = random(0, height);
  this.radius = random(3, 10);
  this.xSpeed = random(-2, 2);
  this.ySpeed = random(-1, 1.5);

  this.createParticle = () => {
    noStroke();
    fill('rgba(200,165,165,0.5)');
    circle(this.posX, this.posY, this.radius);
  };

  this.moveParticle = () => {
    if (this.posX < 0 || this.posX > width) this.xSpeed *= -1;
    if (this.posY < 0 || this.posY > height) this.ySpeed *= -1;
    this.posX += this.xSpeed;
    this.posY += this.ySpeed;
  };

  this.joinParticles = (particles) => {
    particles.forEach(element => {
      let dis = dist(this.posX, this.posY, element.posX, element.posY);
      if (dis < 120) {
        stroke('rgba(255,255,255,0.07)');
        line(this.posX, this.posY, element.posX, element.posY);
      }
    });
  };
}

let particles = [];

function setup () {
  createCanvas(1920, 1080);
  for (let i = 0; i < width / 10; i++) particles.push(new Particle());
}

function draw () {
  background('#0f0f0f');
  for (let i = 0; i < particles.length; i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    particles[i].joinParticles(particles.slice(i));
  }
}