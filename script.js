const countdownElement = document.getElementById("christmas-countdown");

function startChristmasCountdown() {
  const now = new Date();
  const currentYear = now.getFullYear();
  const christmasDate = new Date(currentYear, 11, 25); // December 25 of the current year

  if (now > christmasDate) {
    christmasDate.setFullYear(currentYear + 1);
  }

  // Update the countdown every second
  setInterval(() => {
    const now = new Date();
    const timeLeft = christmasDate - now;

    if (timeLeft <= 0) {
      countdownElement.innerText = "Merry Christmas! 🎉🎄🎅";
      startFireworks();
    } else {
      const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

      countdownElement.innerHTML = `<div class="timer">
      Countdown:</br> <div>${days}d </div>
      <div>${hours}h</div><div>${minutes}m</div><div> ${seconds}s</div>
        `;
    }
  }, 1000);
}

// Fireworks effect
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

let particles = [];

function createParticle(x, y) {
  const particle = {
    x: x,
    y: y,
    color: `hsl(${Math.random() * 360}, 100%, 50%)`,
    size: Math.random() * 4 + 1,
    speedX: Math.random() * 3 - 1.5,
    speedY: Math.random() * 3 - 1.5,
    life: 100,
  };
  particles.push(particle);
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((particle, index) => {
    ctx.fillStyle = particle.color;
    ctx.beginPath();
    ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();

    particle.x += particle.speedX;
    particle.y += particle.speedY;
    particle.life -= 1;
    if (particle.life <= 0) particles.splice(index, 1);
  });
  requestAnimationFrame(animateParticles);
}

function startFireworks() {
  setInterval(() => {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    for (let i = 0; i < 30; i++) createParticle(x, y);
  }, 500);
  animateParticles();
}

startChristmasCountdown();
startFireworks();
