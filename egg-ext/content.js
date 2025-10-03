let isCmdPressed = false;
let cleanupTimer;
let bigEggDropping = false; // block until cracked

window.addEventListener('keydown', (e) => {
  if (e.key === 'Meta') {
    isCmdPressed = true;
  }

  if (e.key === '/' && isCmdPressed && !e.repeat) {
    // If big egg is in play, block
    if (bigEggDropping) return;

    // 5% chance for big egg
    if (Math.random() < 0.05) {
      dropEgg(true); // big egg
      bigEggDropping = true;
    } else {
      dropEgg(false); // normal egg
    }

    clearTimeout(cleanupTimer);
    // normal eggs still cleaned up after 5s
    cleanupTimer = setTimeout(() => {
      document.querySelectorAll('.egg-throw').forEach(el => el.remove());
    }, 5000);
  }
});

window.addEventListener('keyup', (e) => {
  if (e.key === 'Meta') {
    isCmdPressed = false;
  }
});

function dropEgg(isBig) {
  const egg = document.createElement('img');
  egg.src = chrome.runtime.getURL('egg.png');
  egg.style.position = 'fixed';

  if (isBig) {
    // Center horizontally
    const eggWidth = 200;
    egg.style.left = (window.innerWidth / 2 - eggWidth / 2) + 'px';
  } else {
    // Random horizontal position
    egg.style.left = Math.random() * (window.innerWidth - 100) + 'px';
  }

  egg.style.top = '0px';
  egg.style.width = isBig ? '200px' : '100px';
  egg.style.transition = isBig ? 'top 1.5s ease-in' : 'top 0.7s ease-in';
  egg.style.zIndex = 10000;
  egg.className = 'egg-throw';
  document.body.appendChild(egg);

  setTimeout(() => {
    egg.style.top = (window.innerHeight - (isBig ? 200 : 100)) + 'px';
  }, 10);

  egg.addEventListener('transitionend', () => {
    if (isBig) {
      // Shake effect
      triggerScreenShake();

      // Random outcome for big egg
      const outcomes = [
        { src: 'cracked_egg.png', effect: null },
        { src: 'rotten_egg.png', effect: stinkEffect },
        { src: 'cracked_egg.png', effect: sparkleEffect }
      ];
      const outcome = outcomes[Math.floor(Math.random() * outcomes.length)];

      egg.src = chrome.runtime.getURL(outcome.src);

      if (outcome.effect) outcome.effect(egg);

      bigEggDropping = false;

      // Clear all eggs 1s after big egg cracks
      setTimeout(() => {
        document.querySelectorAll('.egg-throw').forEach(el => el.remove());
      }, 1000);
    } else {
      egg.src = chrome.runtime.getURL('cracked_egg.png');
    }
  });
}

// Screen shake
function triggerScreenShake() {
  const duration = 500;
  const intensity = 10;
  let start = null;

  function shake(timestamp) {
    if (!start) start = timestamp;
    const elapsed = timestamp - start;
    const x = (Math.random() - 0.5) * intensity;
    const y = (Math.random() - 0.5) * intensity;
    document.body.style.transform = `translate(${x}px, ${y}px)`;
    if (elapsed < duration) {
      requestAnimationFrame(shake);
    } else {
      document.body.style.transform = '';
    }
  }
  requestAnimationFrame(shake);
}

// Fun effects
function stinkEffect() {
  for (let i = 0; i < 50; i++) {
    const gross = document.createElement('div');
    gross.innerText = "🤢";
    gross.style.position = 'fixed';
    gross.style.left = Math.random() * window.innerWidth + 'px';
    gross.style.top = Math.random() * window.innerHeight + 'px';
    gross.style.fontSize = (20 + Math.random() * 40) + 'px';
    gross.style.opacity = 1;
    gross.style.pointerEvents = "none";
    gross.style.animation = `floatFade 2.5s ease-out forwards`;
    document.body.appendChild(gross);

    setTimeout(() => gross.remove(), 2500);
  }
}

function sparkleEffect() {
  for (let i = 0; i < 80; i++) {
    const sparkle = document.createElement('div');
    sparkle.innerText = "✨";
    sparkle.style.position = 'fixed';
    sparkle.style.left = Math.random() * window.innerWidth + 'px';
    sparkle.style.top = Math.random() * window.innerHeight + 'px';
    sparkle.style.fontSize = (20 + Math.random() * 40) + 'px';
    sparkle.style.opacity = 1;
    sparkle.style.pointerEvents = "none";
    sparkle.style.animation = `floatFade 2.5s ease-out forwards`;
    document.body.appendChild(sparkle);

    setTimeout(() => sparkle.remove(), 2500);
  }
}

// Keyframe animations
const style = document.createElement('style');
style.textContent = `
@keyframes floatUp {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-80px); opacity: 0; }
}
@keyframes floatFade {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(-40px); opacity: 0; }
}
@keyframes floatDown {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(80px); opacity: 0; }
}`;
document.head.appendChild(style);
