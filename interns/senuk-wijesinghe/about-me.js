const trailContainer = document.getElementById('trail-container');

document.addEventListener('mousemove', (e) => {
    const dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = `${e.clientX}px`;
    dot.style.top = `${e.clientY}px`;
    trailContainer.appendChild(dot);

	setTimeout(() => {
		trailContainer.removeChild(dot);
	}, 800); // Same duration as CSS animation
});
