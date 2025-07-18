// --- Firuz's Cool Interactive JS + Site Logic ---

// Dark mode toggle
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('darkModeToggle');
  const dmIcon = document.getElementById('dmIcon');
  let dark = false;
  toggleBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    dark = !dark;
    dmIcon.textContent = dark ? '🌙' : '🌞';
    confetti({
      particleCount: 60,
      spread: 100,
      origin: { y: 0.1 },
      colors: dark ? ['#74b9ff','#0984e3','#fff'] : ['#ffd6da','#d63384','#fff']
    });
  });

  // Typing effect
  const text = "Welcome to My Interactive Website!";
  let i = 0;
  function typeWriter() {
    if (i < text.length) {
      document.getElementById("typing-text").innerHTML += text.charAt(i);
      i++;
      setTimeout(typeWriter, 50);
    }
  }
  typeWriter();

  // Animate cards in sequence
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, idx) => {
    card.style.animationDelay = (idx * 0.12) + 's';
  });

  // JS Canvas Demo
  window.jsCanvas = document.getElementById('jsCanvas');
  window.jsCtx = jsCanvas ? jsCanvas.getContext('2d') : null;
  let drawing = false;
  function getPos(e) {
    const rect = jsCanvas.getBoundingClientRect();
    return {
      x: (e.touches ? e.touches[0].clientX : e.clientX) - rect.left,
      y: (e.touches ? e.touches[0].clientY : e.clientY) - rect.top
    };
  }
  function startDraw(e) {
    drawing = true;
    const pos = getPos(e);
    jsCtx.beginPath();
    jsCtx.moveTo(pos.x, pos.y);
  }
  function draw(e) {
    if (!drawing) return;
    const pos = getPos(e);
    jsCtx.lineTo(pos.x, pos.y);
    jsCtx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--accent');
    jsCtx.lineWidth = 3;
    jsCtx.lineCap = 'round';
    jsCtx.stroke();
  }
  function endDraw() {
    drawing = false;
    jsCtx.closePath();
  }
  if (jsCanvas) {
    jsCanvas.addEventListener('mousedown', startDraw);
    jsCanvas.addEventListener('mousemove', draw);
    jsCanvas.addEventListener('mouseup', endDraw);
    jsCanvas.addEventListener('mouseleave', endDraw);
    // Touch support
    jsCanvas.addEventListener('touchstart', startDraw);
    jsCanvas.addEventListener('touchmove', draw);
    jsCanvas.addEventListener('touchend', endDraw);
  }
  window.clearCanvas = function() {
    if (window.jsCanvas && window.jsCtx) {
      window.jsCtx.clearRect(0, 0, window.jsCanvas.width, window.jsCanvas.height);
    }
  }

  // Animated cursor trail (sparkles)
  document.addEventListener('mousemove', function(e) {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.left = e.clientX + 'px';
    sparkle.style.top = e.clientY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.width = '10px';
    sparkle.style.height = '10px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'radial-gradient(circle, var(--accent) 60%, transparent 100%)';
    sparkle.style.opacity = '0.7';
    sparkle.style.zIndex = '9999';
    sparkle.style.boxShadow = '0 0 16px 4px var(--accent-dark)';
    document.body.appendChild(sparkle);
    setTimeout(() => sparkle.remove(), 420);
  });

  // Fun: Card shake on double-click
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('dblclick', () => {
      card.classList.add('shake');
      setTimeout(() => card.classList.remove('shake'), 700);
    });
  });

  // Add shake animation if not present
  if (!document.getElementById('shake-style')) {
    const style = document.createElement('style');
    style.id = 'shake-style';
    style.textContent = `
      .shake {
        animation: shakeAnim 0.7s cubic-bezier(.36,.07,.19,.97) both;
      }
      @keyframes shakeAnim {
        10%, 90% { transform: translateX(-2px); }
        20%, 80% { transform: translateX(4px); }
        30%, 50%, 70% { transform: translateX(-8px); }
        40%, 60% { transform: translateX(8px); }
      }
    `;
    document.head.appendChild(style);
  }
});

// Secret message button logic
window.showMessage = function() {
  document.getElementById('secret').style.display = 'block';
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
}

// Toggle list logic
window.toggleList = function(id) {
  const list = document.getElementById(id);
  list.style.display = list.style.display === 'none' ? 'block' : 'none';
}

// Easter egg: Press 'F' for a surprise
document.addEventListener('keydown', function(e) {
  if (e.key.toLowerCase() === 'f') {
    confetti({
      particleCount: 80,
      spread: 120,
      origin: { y: 0.7 },
      colors: ['#ffd6da', '#74b9ff', '#d63384', '#fff']
    });
    alert('You pressed F for Firuz! 🎉');
  }
});
