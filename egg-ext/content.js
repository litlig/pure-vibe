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
    egg.src = chrome.runtime.getURL('cracked_egg.png');

    if (isBig) {
      bigEggDropping = false;

      // Clear all eggs 1s after big egg cracks
      setTimeout(() => {
        document.querySelectorAll('.egg-throw').forEach(el => el.remove());
      }, 1000);
    }
  });
}
