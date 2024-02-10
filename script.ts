const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const particles: any[] = []

const p1Count:HTMLInputElement = document.getElementById('input-number1') as HTMLInputElement
const p2Count:HTMLInputElement = document.getElementById('input-number2') as HTMLInputElement
const p3Count:HTMLInputElement = document.getElementById('input-number3') as HTMLInputElement

const p1Color:HTMLInputElement = document.getElementById('input-color1') as HTMLInputElement
const p2Color:HTMLInputElement = document.getElementById('input-color2') as HTMLInputElement
const p3Color:HTMLInputElement = document.getElementById('input-color3') as HTMLInputElement

const p1p1Button = document.getElementById('particle1-particle1') as HTMLButtonElement
const p2p2Button = document.getElementById('particle1-particle1') as HTMLButtonElement
const p3p3Button = document.getElementById('particle1-particle1') as HTMLButtonElement

let p1p1 = true
let p2p2 = true
let p3p3 = true

const p1ForceInput = document.getElementById('particle1-particle1-force') as HTMLInputElement
const p2ForceInput = document.getElementById('particle2-particle2-force') as HTMLInputElement
const p3ForceInput = document.getElementById('particle3-particle3-force') as HTMLInputElement


let p2p2a = 10
let p3p3a = 10

let p1Range = document.getElementById('particle1-particle1-range') as HTMLInputElement
const p2Range = document.getElementById('particle2-particle2-range') as HTMLInputElement
const p3Range = document.getElementById('particle2-particle2-range') as HTMLInputElement


p1p1Button.addEventListener('click', () => {
	if (!p1p1) {
		p1p1 = true
	} else if (p1p1) {
		p1p1 = false
	}
})

p2p2Button.addEventListener('click', () => {
	if (p2p2 === false) {
		p2p2 = true
		p2p2a = p2ForceInput.valueAsNumber
	} else if (p2p2 === true) {
		p2p2a = -p2ForceInput.valueAsNumber
		p2p2 = false
	}
})

p3p3Button.addEventListener('click', () => {
	if (p3p3 === false) {
		p3p3 = true
		p3p3a = p3ForceInput.valueAsNumber
	} else if (p3p3 === true) {
		p3p3a = -p3ForceInput.valueAsNumber
		p3p3 = false
	}
})


canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function draw(x: number, y: number, c: string, s: number): void {
	// @ts-ignore
	ctx.fillStyle = c
	// @ts-ignore
	ctx.fillRect(x, y, s, s)
}

function drawParticle(x, y, c, s) {
	ctx.beginPath()
	ctx.arc(x,y,s / 2, 0, 2*Math.PI)
	ctx.fillStyle = c
	ctx.fill()
}



const particle = (x: number, y: number, c: string) => {
	return { x: x, y: y, vx: 0, vy: 0, color: c }
}

const random = () => {
	return Math.random() * canvas.width + 50
}

const create = (number: number, color: string) => {
	let group = []
	for (let i = 0; i < number; i++) {
		group.push(particle(random(), random(), color))
		particles.push(group[i])
	}
	return group
}

const rule = (particles1: any, particles2: any, g: number, range: number) => {
	for (let i = 0; i < particles1.length; i++) {
		let a = particles1[i]
		let fx = 0
		let fy = 0
		for (let j = 0; j < particles2.length; j++) {
			let b = particles2[j]

			let dx = b.x - a.x
			let dy = b.y - a.y

			let d = Math.sqrt(dx * dx + dy * dy)
			if (d > 0 && d < range) {
				// range
				let F = (g * 1) / d
				fx += (F * dx) / d
				fy += (F * dy) / d
			}
		}
		a.vx = (a.vx + fx) * 0.8
		a.vy = (a.vy + fy) * 0.8
		a.x += a.vx
		a.y += a.vy
		if (a.x <= 0 || a.x >= canvas.width) {
			a.vx *= -1
		}
		if (a.y <= 0 || a.y >= canvas.height) {
			a.vy *= -1
		}
	}
}


let red = create()
let green = create()
let cyan = create()
p1Count.addEventListener('keypress', (e) => {

	if (e.key === 'Enter') {
		red = create(p1Count.valueAsNumber, p1Color.value)
	}
})

p2Count.addEventListener('keypress', (e) => {
	if (e.key === 'Enter'){
		let green = create(p2Count.valueAsNumber, p2Color.value)
	}
})

p3Count.addEventListener('keypress', (e) => {
	if (e.key === 'Enter'){
		cyan = create(p3Count.valueAsNumber, p3Color.value)
	}
})




const update = () => {
	let heyo = p1Range.valueAsNumber ? p1Range.valueAsNumber : 1
	let p1p1a = p1p1 ? p1ForceInput.valueAsNumber : -p1ForceInput.valueAsNumber

	if (isNaN(p1p1a)) {
		p1p1a = 1
	}


	rule(red, red, -2, 12)
	rule(red, red, p1p1a ? p1p1a : 0.0001, heyo)

	console.log(p1Range.valueAsNumber)
	console.log(heyo)

	rule(cyan, cyan, -1, 12)
	rule(cyan, cyan, p2p2a ? p2p2a : 1, 200)

	rule(green, green, -1, 12)
	rule(green, green, p3p3a, p3Range.valueAsNumber)

	rule(red, cyan, -0.22, 40)
	rule(red, green, -0.22, 40)

	rule(cyan, red, -0.22, 40)
	rule(cyan, green, -0.22, 40)

	rule(green, red, -0.22, 40)
	rule(green, cyan, -0.22, 40)


	//own design
	/*	rule(red, red, 0.8, 100)
        rule(red, white, 0.1, 100)
        rule(yellow, red, 2.9, 120)
        rule(yellow, red, -5.5, 60)
        rule(yellow, yellow, -0.3, 12)
        rule(white, white, -0.9, 20)
        rule(white, red, 0.9, 300)
        rule(blue, red, 2.9, 90)
        rule(blue, red, -3.5, 34)
        rule(blue, blue, -3.5, 10)*/

	// @ts-ignore
	ctx.clearRect(0, 0, canvas.width, canvas.height)

	draw(0, 0, 'rgb(0,0,0)', canvas.width) //rect

	for (let i = 0; i < particles.length; i++) {
		drawParticle(particles[i].x, particles[i].y, particles[i].color, 10)
	}

	/*requestAnimationFrame(update)*/
}

setInterval(update, 36)
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});