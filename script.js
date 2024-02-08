"use strict";
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const particles = [];
function draw(x, y, c, s) {
    ctx.fillStyle = c;
    ctx.fillRect(x, y, s, s);
}
const particle = (x, y, c) => {
    return { x: x, y: y, vx: 0, vy: 0, color: c };
};
const random = () => {
    return Math.random() * 900 + 50;
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
        if (a.x <= 0 || a.x >= 1000) {
            a.vx *= -1;
        }
        if (a.y <= 0 || a.y >= 1000) {
            a.vy *= -1;
        }
    }
};
let yellow = create(800, 'yellow');
let red = create(200, 'red');
let white = create(1000, 'white');
let blue = create(1000, 'blue');
const update = () => {
    rule(red, red, 0.2, 100);
    rule(red, white, 0.1, 100);
    rule(yellow, red, 2.9, 93);
    rule(yellow, red, -3.5, 70);
    rule(yellow, yellow, -0.3, 12);
    rule(white, white, 0.1, 10);
    rule(white, white, -0.9, 5);
    rule(white, red, 0.1, 70);
    rule(blue, red, -0.5, 80);
    rule(blue, blue, -0.01, 10);
    ctx.clearRect(0, 0, 1000, 1000);
    draw(0, 0, 'rgb(14,14,14)', 1000);
    for (let i = 0; i < particles.length; i++) {
        draw(particles[i].x, particles[i].y, particles[i].color, 3);
    }
    requestAnimationFrame(update);
};
update();
//# sourceMappingURL=script.js.map