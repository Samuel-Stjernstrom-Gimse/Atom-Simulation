const canvas = document.getElementById('canvas') as HTMLCanvasElement
const ctx = canvas.getContext('2d')
const particles: any[] = []

const p1Count: HTMLInputElement = document.getElementById('input-number1') as HTMLInputElement
const p2Count: HTMLInputElement = document.getElementById('input-number2') as HTMLInputElement
const p3Count: HTMLInputElement = document.getElementById('input-number3') as HTMLInputElement

const p1Color: HTMLInputElement = document.getElementById('input-color1') as HTMLInputElement
const p2Color: HTMLInputElement = document.getElementById('input-color2') as HTMLInputElement
const p3Color: HTMLInputElement = document.getElementById('input-color3') as HTMLInputElement

const p1p1Button = document.getElementById('particle1-particle1') as HTMLButtonElement
const p2p2Button = document.getElementById('particle2-particle2') as HTMLButtonElement
const p3p3Button = document.getElementById('particle3-particle3') as HTMLButtonElement

let p1p1 = true
let p2p2 = true
let p3p3 = true

const p1ForceInput = document.getElementById('particle1-particle1-force') as HTMLInputElement
const p2ForceInput = document.getElementById('particle2-particle2-force') as HTMLInputElement
const p3ForceInput = document.getElementById('particle3-particle3-force') as HTMLInputElement

const p1RangeInput = document.getElementById('particle1-particle1-range') as HTMLInputElement
const p2RangeInput = document.getElementById('particle2-particle2-range') as HTMLInputElement
const p3RangeInput = document.getElementById('particle3-particle3-range') as HTMLInputElement

p1p1Button.addEventListener('click', () => {
	if (!p1p1) {
		p1p1 = true
	} else if (p1p1) {
		p1p1 = false
	}
})

p2p2Button.addEventListener('click', () => {
	if (!p2p2) {
		p2p2 = true
	} else if (p2p2) {
		p2p2 = false
	}
})

p3p3Button.addEventListener('click', () => {
	if (!p3p3) {
		p3p3 = true
	} else if (p3p3) {
		p3p3 = false
	}
})

canvas.width = window.innerWidth
canvas.height = window.innerHeight

const draw = (ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number): void => {
	ctx.fillStyle = color
	ctx.fillRect(x, y, size, size)
}

function drawParticle(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, size: number) {
	ctx.beginPath()
	ctx.arc(x, y, size / 2, 0, 2 * Math.PI)
	ctx.fillStyle = color
	ctx.fill()
}

const particle = (x: number, y: number, c: string) => {
	return { x: x, y: y, vx: 0, vy: 0, color: c }
}

const random = () => {
	return Math.random() * canvas.width + 50
}

const create = (number: number, color: string) => {
	let group: any[] = []
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
				let F = g / d
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

let color1 = create(p1Count.valueAsNumber, p1Color.value)
let color2 = create(p2Count.valueAsNumber, p2Color.value)
let color3 = create(p3Count.valueAsNumber, p3Color.value)

p1Count.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		color1 = create(p1Count.valueAsNumber, p1Color.value)
	}
})

p2Count.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		color2 = create(p2Count.valueAsNumber, p2Color.value)
	}
})

p3Count.addEventListener('keypress', (e) => {
	if (e.key === 'Enter') {
		color3 = create(p3Count.valueAsNumber, p3Color.value)
	}
})

const update = (ctx: CanvasRenderingContext2D | null): void => {
	if (ctx === null) return

	let p1Range = p1RangeInput.valueAsNumber ? p1RangeInput.valueAsNumber : 1
	let p2Range = p2RangeInput.valueAsNumber ? p2RangeInput.valueAsNumber : 1
	let p3Range = p3RangeInput.valueAsNumber ? p3RangeInput.valueAsNumber : 1

	let p1p1a = p1p1 ? p1ForceInput.valueAsNumber : -p1ForceInput.valueAsNumber
	let p2p2a = p2p2 ? p2ForceInput.valueAsNumber : -p2ForceInput.valueAsNumber
	let p3p3a = p3p3 ? p3ForceInput.valueAsNumber : -p3ForceInput.valueAsNumber

	if (isNaN(p1p1a)) {
		p1p1a = 1
	}

	if (isNaN(p2p2a)) {
		p2p2a = 1
	}

	if (isNaN(p3p3a)) {
		p3p3a = 1
	}

	rule(color1, color1, -2, 15)
	rule(color1, color1, p1p1a ? p1p1a : 0.0001, p1Range)

	rule(color2, color2, -2, 15)
	rule(color2, color2, p2p2a ? p2p2a : 0.0001, p2Range)

	rule(color3, color3, -2, 15)
	rule(color3, color3, p3p3a ? p3p3a : 0.0001, p3Range)

	rule(color1, color3, -0.22, 40)
	rule(color1, color2, -0.22, 40)

	rule(color3, color1, 10.22, 40)
	rule(color3, color2, -0.22, 40)

	rule(color2, color1, -0.22, 40)
	rule(color2, color3, -0.22, 40)

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

	ctx.clearRect(0, 0, canvas.width, canvas.height)

	draw(ctx, 0, 0, 'rgb(0,0,0)', canvas.width) //rect

	for (let i = 0; i < particles.length; i++) {
		drawParticle(ctx, particles[i].x, particles[i].y, particles[i].color, 10)
	}

	requestAnimationFrame(() => update(ctx))
}

update(ctx)

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth
	canvas.height = window.innerHeight
})
