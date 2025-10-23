function startExperience() {
  document.getElementById("intro").style.display = "none";
  revealTimedMessages();
  startMusicOnce();
  startPetalRainOnce();
}

const messages = ["My dearest aunt, a blessing so rare, Whose love and kindness show how deeply you care.",
  "A guiding light through joy and pain, You’ve stood beside me, through sunshine and rain.",
  "Radiant heart, so gentle, so pure, A love like yours will forever endure.",
  "In your embrace, I've found my home, A place of warmth where I’m never alone.",
  "A second mother, chosen by fate, Your love’s a gift words can’t translate.",
  "Rejoice today, your special day, For all the love you’ve given away.",
  "On this birthday, may blessings flow, And all your dreams continue to grow.",
  "Surrounded by laughter, peace, and grace, Your heart’s a haven, a sacred place.",
  "A mother in spirit, my heart will always know, Auntie, you’re loved more than words can show.", "Happy Birthday, Auntie ❤️"];
let msgIndex = 0;
let messageShown = false;
let petalsStarted = false;
let musicStarted = false;

document.addEventListener("click", (e) => {
  createFlower(e.clientX, e.clientY);
  createHeart(e.clientX, e.clientY);
  startPetalRainOnce();
  startMusicOnce();
});

function revealTimedMessages() {
  const messageEl = document.getElementById("message");
  const lettersEl = document.getElementById("letters"); // new container for letters
  messageEl.style.opacity = "1";
  messageEl.innerHTML = messages[0].replace(/^[^A-Za-z]*([A-Za-z])/, '<span class="first-letter">$1</span>');

  // get first letter of first message
  const firstLetter = messages[0].trim().charAt(0).toUpperCase();
  appendLetter(firstLetter);

  let i = 1; // start from 2nd message

  const interval = setInterval(() => {
    messageEl.style.transition = "opacity 1s ease";
    messageEl.style.opacity = "0"; // fade out

    setTimeout(() => {
      const msg = messages[i];
      const firstChar = msg.trim().charAt(0).toUpperCase();

      // 🌸 Apply first-letter highlight only if NOT the last message
      if (i !== messages.length - 1) {
        messageEl.innerHTML = msg.replace(/^(\w)/, '<span class="first-letter">$1</span>');
      } else {
        messageEl.innerHTML = msg; // no highlight for final message
      }

      // 🌷 Append the first letter below (except for the last message)
      if (i < messages.length - 1) {
        appendLetter(firstChar);
      }

      // 🌟 Last message special glow
      if (i === messages.length - 1) {
        messageEl.style.transition = "opacity 2.5s ease";
        messageEl.style.opacity = "1";

        messageEl.style.textShadow = `
          0 0 25px #ffb6c1,
          0 0 50px #ff99cc,
          0 0 70px #ff69b4
        `;

        setTimeout(() => {
          launchFireworks(window.innerWidth / 2, window.innerHeight / 2);
          setTimeout(() => {
            launchFireworks(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
            launchFireworks(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
          }, 700);
          playFinaleFireworks(10000);
        }, 2500);

        messageEl.animate(
          [
            { textShadow: "0 0 25px #ffb6c1, 0 0 50px #ff99cc" },
            { textShadow: "0 0 40px #ff99cc, 0 0 80px #ff69b4" },
            { textShadow: "0 0 25px #ffb6c1, 0 0 50px #ff99cc" }
          ],
          {
            duration: 1000,
            iterations: Infinity,
            easing: "ease-in-out"
          }
        );

        clearInterval(interval);
      } else {
        messageEl.style.opacity = "1";
      }

      i++;
    }, 800);
  }, 10000);
}

// helper to add letter with fade-in animation
function appendLetter(letter) {
  const lettersEl = document.getElementById("letters");
  const span = document.createElement("span");

  // After 5th letter, insert a visual space
  const totalLetters = lettersEl.querySelectorAll(".revealed-letter").length;
  if (totalLetters === 5) {
    const space = document.createElement("span");
    space.innerHTML = "&nbsp;&nbsp;"; // visual gap between words
    lettersEl.appendChild(space);
  }

  span.textContent = letter;
  span.className = "revealed-letter";
  lettersEl.appendChild(span);
}

function createFlower(x, y) {
  const size = 50 + Math.random() * 70;
  const flower = document.createElement("canvas");
  flower.width = size;
  flower.height = size;
  flower.className = "flower";
  flower.style.position = "absolute";
  flower.style.left = `${x - size / 2}px`;
  flower.style.top = `${y - size / 2}px`;
  flower.style.pointerEvents = "none";
  flower.style.zIndex = 2;

  const ctx = flower.getContext("2d");
  drawFlower(ctx, size);

  document.body.appendChild(flower);

  setTimeout(() => {
    flower.remove();
  }, 5000);
}

function drawFlower(ctx, size) {
  const petals = 5 + Math.floor(Math.random() * 3);
  const radius = size / 2.5 + Math.random() * 5;
  const color = `hsl(${Math.random() * 360}, 90%, 70%)`;

  ctx.translate(size / 2, size / 2);
  for (let i = 0; i < petals; i++) {
    ctx.rotate((2 * Math.PI) / petals);
    drawPetal(ctx, radius, color);
  }

  ctx.beginPath();
  ctx.arc(0, 0, size / 15, 0, 2 * Math.PI);
  ctx.fillStyle = "yellow";
  ctx.fill();
}

function drawPetal(ctx, radius, color) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.bezierCurveTo(-10, -radius / 2, -10, -radius, 0, -radius);
  ctx.bezierCurveTo(10, -radius, 10, -radius / 2, 0, 0);
  ctx.fillStyle = color;
  ctx.shadowColor = color;
  ctx.shadowBlur = 20;
  ctx.fill();
}

function createHeart(x, y) {
  const heart = document.createElement("div");
  heart.innerText = "❤️";
  heart.style.position = "absolute";
  heart.style.left = x + "px";
  heart.style.top = y + "px";
  heart.style.fontSize = `${16 + Math.random() * 16}px`;
  heart.style.opacity = "1";
  heart.style.transition = "all 2s ease-out";
  heart.style.pointerEvents = "none";
  heart.style.zIndex = 1;
  document.body.appendChild(heart);

  requestAnimationFrame(() => {
    heart.style.top = `${y - 100}px`;
    heart.style.opacity = "0";
  });


  setTimeout(() => {
    heart.remove();
  }, 2000);
}

function updateMessage() {
  const messageEl = document.getElementById("message");

  if (!messageShown) {
    messageEl.style.opacity = "1";
    messageShown = true;
  } else {
    msgIndex = (msgIndex + 1) % messages.length;
    messageEl.innerText = messages[msgIndex];
  }
}

function startPetalRainOnce() {
  if (petalsStarted) return;
  petalsStarted = true;

  setInterval(() => {
    const petal = document.createElement("div");
    petal.className = "petal";
    petal.innerText = "🌸";

    const size = 16 + Math.random() * 10;
    petal.style.fontSize = `${size}px`;
    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.position = "fixed";
    petal.style.top = "-50px";
    petal.style.zIndex = 0;
    petal.style.opacity = 0.8;
    petal.style.animation = `fall ${6 + Math.random() * 4}s linear forwards`;

    document.body.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 10000);
  }, 300);
}

function startMusicOnce() {
  if (musicStarted) return;
  musicStarted = true;

  const audio = document.getElementById("bg-music");
  if (audio) {
    audio.currentTime = 3;
    audio.volume = 0.03;
    audio.play().catch((e) => {
      console.log("Autoplay blocked:", e);
    });
  }
}

function launchShootingStar() {
  const star = document.createElement("div");
  star.className = "shooting-star";

  const angle = Math.random() * 90 + 20;
  const startX = Math.random() * window.innerWidth * 0.5;
  const startY = Math.random() * window.innerHeight * 0.4;
  const endX = startX + window.innerWidth;
  const endY = startY + window.innerHeight;

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  star.style.setProperty('--angle', `${angle}deg`);
  star.style.setProperty('--start-x', `${-startX}px`);
  star.style.setProperty('--start-y', `${-startY}px`);
  star.style.setProperty('--end-x', `${endX}px`);
  star.style.setProperty('--end-y', `${endY}px`);

  document.body.appendChild(star);

  setTimeout(() => {
    star.remove();
  }, 1200);
}

setInterval(launchShootingStar, 6000);

launchShootingStar();

// 🌟 Create subtle twinkling background particles
function createParticles(count = 50) {
  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "vw";
    particle.style.top = Math.random() * 100 + "vh";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.opacity = Math.random() * 0.8;
    document.body.appendChild(particle);
  }
}

createParticles(70); // you can adjust count here

function launchFireworks(centerX = window.innerWidth / 2, centerY = window.innerHeight / 2) {
  const particles = 24; // increased from 14 → more sparkle!
  for (let i = 0; i < particles; i++) {
    const firework = document.createElement("div");
    firework.className = "firework";

    const angle = (Math.PI * 2 * i) / particles;
    const distance = 150 + Math.random() * 120; // wider explosion
    const dx = Math.cos(angle) * distance + "px";
    const dy = Math.sin(angle) * distance + "px";

    firework.style.setProperty("--dx", dx);
    firework.style.setProperty("--dy", dy);
    firework.style.left = centerX + "px";
    firework.style.top = centerY + "px";
    firework.style.background = `hsl(${Math.random() * 360}, 100%, 75%)`;
    firework.style.boxShadow = `0 0 15px ${firework.style.background}`;

    document.body.appendChild(firework);

    setTimeout(() => firework.remove(), 2500);
  }
}

function playFinaleFireworks(duration = 10000) {
  const interval = setInterval(() => {
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight * 0.8;
    launchFireworks(x, y);
  }, 1000); // every second

  setTimeout(() => clearInterval(interval), duration);
}
