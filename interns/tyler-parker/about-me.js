document.addEventListener('DOMContentLoaded', () => {
  // Dark mode toggle
  const btn = document.getElementById('darkModeBtn');
  if (btn) {
    btn.onclick = () => {
      document.body.classList.toggle('dark-mode');
      btn.innerHTML = document.body.classList.contains('dark-mode') ? '☀️' : '🌙';
    };
  }

  // Fade-in sections on scroll (excluding hero)
  const sections = document.querySelectorAll('section');
  const revealSections = () => {
    sections.forEach(sec => {
      if (sec.id === "hero") return;
      const rect = sec.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        sec.style.opacity = 1;
        sec.style.transform = 'none';
      }
    });
  };
  sections.forEach(sec => {
    if (sec.id === "hero") {
      sec.style.opacity = 1;
      sec.style.transform = 'none';
      sec.style.transition = 'opacity 0.7s, transform 0.7s';
    } else {
      sec.style.opacity = 0;
      sec.style.transform = 'translateY(40px)';
      sec.style.transition = 'opacity 0.7s, transform 0.7s';
    }
  });
  window.addEventListener('scroll', revealSections);
  revealSections();

  // Typing effect for hero title
  const text = "Hi, I'm Tyler Parker";
  const el = document.getElementById('typed-hero-title');
  if (el) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    cursor.textContent = '|';
    el.textContent = '';
    el.appendChild(cursor);

    function type() {
      if (i < text.length) {
        el.insertBefore(document.createTextNode(text[i]), cursor);
        i++;
        setTimeout(type, 70);
      } else {
        // Remove cursor after a natural delay
        setTimeout(() => {
          cursor.remove();
        }, 800); // 800ms after typing finishes
      }
    }
    type();
  }
});

window.addEventListener('beforeunload', function () {
  window.scrollTo(0, 0);
});

window.addEventListener('scroll', function () {
  const hero = document.querySelector('.hero-section');
  if (hero) {
    // Move the SVG pattern slower than scroll for parallax
    const offset = window.scrollY * 0.25;
    hero.style.backgroundPosition = `0px ${offset}px, center`;
  }

  // Smooth-scroll to card's ID on click using location.hash
document.querySelectorAll('.about-section, .project-section, .gallery-section, .journal-section').forEach(section => {
  section.addEventListener('click', (e) => {
    // Avoid triggering if user clicked a link inside the section
    if (e.target.closest('a')) return;

    // Scroll using native smooth behavior via anchor
    if (section.id) {
      window.location.hash = section.id;
    }
  });
});

});