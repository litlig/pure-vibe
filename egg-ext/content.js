let isCmdPressed = false;
let cleanupTimer;

window.addEventListener('keydown', (e) => {
  if (e.key === 'Meta') {
    isCmdPressed = true;
  }
  if (e.key === '/' && isCmdPressed) {
    throwEgg();

    clearTimeout(cleanupTimer);
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

function throwEgg() {
  const egg = document.createElement('img');
  egg.src = chrome.runtime.getURL('egg.png');
  egg.style.position = 'fixed';
  egg.style.left = Math.random() * (window.innerWidth - 100) + 'px';
  egg.style.top = '0px';
  egg.style.width = '100px';
  egg.style.transition = 'top 0.7s ease-in';
  egg.style.zIndex = 10000;
  egg.className = 'egg-throw';
  document.body.appendChild(egg);

  setTimeout(() => {
    egg.style.top = (window.innerHeight - 100) + 'px';
  }, 10);

  egg.addEventListener('transitionend', () => {
    egg.src = chrome.runtime.getURL('cracked_egg.png');
  });
}
