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
    this.size = 3;
    this.density = Math.random() * 5 + 1;
  }

  draw() {
    // context.scale(1, 1);
    context.fillStyle = 'rgba(38, 198, 218, 1)';
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    context.closePath();
    context.fill();
    context.stroke();
  }

  // DOCUMENTATION I USED:
  // https://www.w3schools.com/tags/canvas_arc.asp

  //   update() {
  //     let dx = mouse.x - this.x;
  //     let dy = mouse.y - this.y;
  //     let distance = Math.sqrt(dx * dx + dy * dy);
  //     let forceDirectionX = dx / distance;
  //     let forceDirectionY = dy / distance;
  //     let maxDistance = mouse.radius;
  //     let force = (maxDistance - distance) / maxDistance;
  //     let directionX = forceDirectionX * force * this.density;
  //     let directionY = forceDirectionY * force * this.density;

  //     if (distance < mouse.radius) {
  //       this.x -= directionX;
  //       this.y -= directionY;
  //     } else if (
  //       distance >= mouse.radius &&
  //       (this.x !== this.baseX || this.y !== this.baseY)
  //     ) {
  //       this.size = 3;
  //       let dx = this.x - this.baseX;
  //       this.x -= dx / 25;
  //       let dy = this.y - this.baseY;
  //       this.y -= dy / 25;
  //     }
  //   }
}

function createParticles() {
  for (let i = 0; i < 10; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    particleArray.push(new Particle(x, y));
  }
}

createParticles();

function renderParticles() {
  console.log('ciao');
  //   context.clearRect(0, 0, canvas.width, canvas.height);
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].draw();
    // particleArray[i].update();
  }
  //   connect();
  //   requestAnimationFrame(renderParticles);
}

renderParticles();
