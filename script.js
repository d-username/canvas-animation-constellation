const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

context.fillRect(10, 10, 150, 100);

let particleArray = [];
let numberOfParticles = 100;

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
    this.size = Math.random() * 2 + 2;
    this.density = Math.random() * 5 + 1;
    this.directionAngle = Math.random() * 360;
    this.speed = Math.random() * 0.5;
    this.vector = {
      x: Math.cos(this.directionAngle) * this.speed,
      y: Math.sin(this.directionAngle) * this.speed,
    };
  }

  draw() {
    context.fillStyle = 'rgba(232, 240, 242, 1)';
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
  for (let i = 0; i < numberOfParticles; i++) {
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
      let lineOpacity = 1 - distance / 100;
      context.strokeStyle = 'rgba(232, 240, 242, ' + lineOpacity + ')';
      context.lineWidth = 0.5;
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
