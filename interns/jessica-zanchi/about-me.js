document.addEventListener("DOMContentLoaded", function () {
const videoContainer = document.getElementById('reel');
  const video = document.getElementById('reelVideo');
  const playIcon = document.getElementById('playIcon');
  const muteButton = document.getElementById('muteButton');
  const fullscreenButton = document.getElementById('fullscreenButton');
  const timeLeft = document.getElementById('timeLeft');
  const progressContainer = document.getElementById('progressContainer');
  const progressBar = document.getElementById('progressBar');

  video.addEventListener('click', () => {
    if (video.paused) {
      video.play();
      playIcon.classList.add('hide');
    } else {
      video.pause();
      playIcon.classList.remove('hide');
    }
  });

  muteButton.addEventListener('click', (e) => {
    e.stopPropagation();
    video.muted = !video.muted;
    muteButton.textContent = video.muted ? '🔇' : '🔊';
  });

  fullscreenButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (!document.fullscreenElement) {
      videoContainer.requestFullscreen().catch(err => console.error(err));
    } else {
      document.exitFullscreen();
    }
  });

  function updateTimeLeft() {
    const remaining = video.duration - video.currentTime;
    if (!isNaN(remaining)) {
      const minutes = Math.floor(remaining / 60);
      const seconds = Math.floor(remaining % 60).toString().padStart(2, '0');
      timeLeft.textContent = `${minutes}:${seconds}`;
    } else {
      timeLeft.textContent = '--:--';
    }
  }

  video.addEventListener('timeupdate', () => {
    updateTimeLeft();
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.width = `${percent}%`;
  });

  video.addEventListener('loadedmetadata', updateTimeLeft);

  progressContainer.addEventListener('click', (e) => {
    const rect = progressContainer.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percent = clickX / width;
    video.currentTime = percent * video.duration;
  });

  let isDragging = false;

  progressContainer.addEventListener('mousedown', () => isDragging = true);
  window.addEventListener('mouseup', () => isDragging = false);
  window.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const rect = progressContainer.getBoundingClientRect();
      const moveX = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
      const percent = moveX / rect.width;
      video.currentTime = percent * video.duration;
    }
  });
});

window.addEventListener('scroll', () => {
    const title = document.getElementById('titlestuff');
    if (!title) return;

    const maxScroll = 200;
    const scrollY = Math.min(window.scrollY, maxScroll);
    const progress = scrollY / maxScroll;

    const opacity = 1 - progress;

    const translateX = progress * 100;

    title.style.opacity = opacity;
    title.style.transform = `translateX(${translateX}px)`;
    title.style.transition = 'opacity 0.2s, transform 0.2s';
});

document.addEventListener("DOMContentLoaded", function () {
    const reveals = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.4 }
    );

    reveals.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
            el.classList.add("show");
        } else {
            observer.observe(el);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const revealLefts = document.querySelectorAll(".revealleft");
    const revealRights = document.querySelectorAll(".revealright");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                }
            });
        },
        { threshold: 0.4 }
    );

	revealLefts.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
            el.classList.add("show");
        } else {
            observer.observe(el);
        }
    });
	revealRights.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight * 0.5) {
            el.classList.add("show");
        } else {
            observer.observe(el);
        }
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const rows = document.querySelectorAll(".row");

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    const elements = Array.from(entry.target.children);
                    elements.forEach((el, index) => {
                        setTimeout(() => {
                            el.classList.add("show");
                        }, index * 350);
                    });
                }
            });
        },
        { threshold: 0.5 }
    );

    rows.forEach((row) => {
        if (row.getBoundingClientRect().top < window.innerHeight) {
            Array.from(row.children).forEach((el, index) => {
                setTimeout(() => {
                    el.classList.add("show");
                }, index * 350);
            });
        } else {
            observer.observe(row);
        }
    });
});