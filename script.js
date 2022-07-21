const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let particleArray = [];

let mouse = {
  x: null,
  y: null,
  radius: 150,
};

window.addEventListener('mousemove', function (event) {
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.density = Math.random() * 5 + 1;
    this.directionAngle = Math.random() * 360;
    this.speed = 1 + Math.random() * 1;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  draw() {
    context.fillStyle = 'rgba(38, 198, 218, 1)';
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
  }

  update() {
    this.checkBorder();
    this.x += this.vector.x;
    this.y += this.vector.y;
  }

  checkBorder() {
    if (this.x >= canvas.width || this.x <= 0) {
      this.vector.x *= -1;
    }
    if (this.y >= canvas.height || this.y <= 0) {
      this.vector.y *= -1;
    }
  }
}

function createParticles() {
  for (let i = 0; i < 50; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}

createParticles();

function renderParticles() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    particleArray[i].update();
  }
  drawLine();
  requestAnimationFrame(renderParticles);
}

renderParticles();

// connect a with b
function drawLine() {
  for (let a = 0; a < particleArray.length; a++) {
    findPair(particleArray[a]);
  }
}

function findPair(particle) {
  for (let b = 0; b < particleArray.length; b++) {
    let distance = checkDistance(
      particle.x,
      particle.y,
      particleArray[b].x,
      particleArray[b].y
    );

    if (distance < 100) {
      context.strokeStyle = 'red';
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(particle.x, particle.y);
      context.lineTo(particleArray[b].x, particleArray[b].y);
      context.stroke();
    }
  }
}

function checkDistance(aX, aY, bX, bY) {
  let distanceBetweenXs = aX - bX;
  let distancebetweenYs = aY - bY;
  let distance = Math.sqrt(
    distanceBetweenXs * distanceBetweenXs +
      distancebetweenYs * distancebetweenYs
  );
  return distance;
}
