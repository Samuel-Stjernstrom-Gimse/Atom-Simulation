// Get the canvas element and its 2d context
const canvas = document.getElementById('life');
const ctx = canvas.getContext('2d');
ctx.fillStyle = 'black'; // Set background color to black

// Function to draw a square on the canvas
const draw = (x, y, c, s) => {
	ctx.fillStyle = c;
	ctx.fillRect(x, y, s, s);
};
// Array to store particles
const particles = [];

// Object to store attraction forces based on color
const attractionForces = {
	'red': 0.002,
	'green': 0.003,
	'blue': 0.003,
	'purple': 0.005,
	'orange': 0.0025
};

// Function to create a particle with random position, color, speed
const createParticle = () => {
	const x = Math.random() * canvas.width;
	const y = Math.random() * canvas.height;
	const speed = 0.02/*0.0001 + Math.random() * 0.0001;*/ // Adjust the speed range as needed
	const color = getRandomColor();
	return { 'x': x, 'y': y, 'vx': 0, 'vy': 0, 'color': color, 'speed': speed };
};

// Function to generate a random color
const getRandomColor = () => {
	const colors = Object.keys(attractionForces);
	return colors[Math.floor(Math.random() * colors.length)];
};

// Create 100 particles
for (let i = 0; i < 1500; i++) {
	particles.push(createParticle());
}

// Function to draw particles on the canvas
const drawParticles = () => {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	for (const particle of particles) {
		draw(particle.x, particle.y, particle.color, 2); // Adjust the size as needed
	}
};

// Function to update particle positions based on attraction
const updateParticles = () => {
	for (let i = 0; i < particles.length; i++) {
		for (let j = i + 1; j < particles.length; j++) {
			const dx = particles[j].x - particles[i].x;
			const dy = particles[j].y - particles[i].y;
			const distance = Math.sqrt(dx * dx + dy * dy);

			const forceX = attractionForces[particles[i].color] * dx / distance;
			const forceY = attractionForces[particles[i].color] * dy / distance;

			particles[i].vx += forceX;
			particles[i].vy += forceY;

			particles[j].vx -= forceX;
			particles[j].vy -= forceY;
		}
	}

	// Update particle positions
	for (const particle of particles) {
		// Adjust particle position based on speed
		particle.x += particle.vx * particle.speed;
		particle.y += particle.vy * particle.speed;
	}
};

// Function to animate the particles
const animate = () => {
	updateParticles();
	drawParticles();
	requestAnimationFrame(animate);
};

// Start the animation loop
animate();
