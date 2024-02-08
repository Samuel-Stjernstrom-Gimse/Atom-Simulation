"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
function draw(x, y, c, s) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, s, s);
}
const particle = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
};
const random = () => {
    return Math.random() * canvas.width + 50;
};
const create = (number, color) => {
    let group = [];
    for (let i = 0; i < number; i++) {
        group.push(particle(random(), random(), color));
        particles.push(group[i]);
    }
    return group;
};
const rule = (particles1, particles2, g, range) => {
    for (let i = 0; i < particles1.length; i++) {
        let a = particles1[i];
        let fx = 0;
        let fy = 0;
        for (let j = 0; j < particles2.length; j++) {
            let b = particles2[j];
            let dx = b.x - a.x;
            let dy = b.y - a.y;
            let d = Math.sqrt(dx * dx + dy * dy);
            if (d > 0 && d < range) {
                let F = (g * 1) / d;
                fx += (F * dx) / d;
                fy += (F * dy) / d;
            }
        }
        a.vx = (a.vx + fx) * 0.9;
        a.vy = (a.vy + fy) * 0.9;
        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= canvas.width) {
            a.vx *= -1;
        }
        if (a.y <= 0 || a.y >= canvas.height) {
            a.vy *= -1;
        }
    }
};
let yellow = create(2500, 'yellow');
let red = create(1000, 'red');
let white = create(1000, 'white');
let blue = create(1000, 'rgb(0,215,255)');
const update = () => {
    rule(red, red, 0.8, 100);
    rule(red, white, 0.1, 100);
    rule(yellow, red, 2.9, 120);
    rule(yellow, red, -5.5, 100);
    rule(yellow, yellow, -0.3, 12);
    rule(white, white, -0.9, 20);
    rule(white, red, 0.9, 70);
    rule(blue, red, 2.9, 90);
    rule(blue, red, -3.5, 34);
    rule(blue, blue, -3.5, 10);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw(0, 0, 'rgb(0,0,0)', canvas.width);
    for (let i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 1);
    }
};
setInterval(update, 36);
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
//# sourceMappingURL=script.js.map