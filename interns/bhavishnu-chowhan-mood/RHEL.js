document.querySelectorAll('.timeline-item').forEach(item => {
  item.addEventListener('mouseenter', () => {
    item.style.backgroundColor = '#e0f2fe';
  });
  item.addEventListener('mouseleave', () => {
    item.style.backgroundColor = 'white';
  });
});
