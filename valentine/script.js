const output = document.getElementById('output');
const terminalText = [
    "Hi love!",
    "System: Initializing Love_Protocol.exe",
    "Status: Analyzing soul compatibility...",
    "Result: Perfect Match Found.",
    "Action: Loading visual heart data..."
];

let line = 0;

// 1. Typewriter Sequence
async function startSequence() {
    for (let text of terminalText) {
        let p = document.createElement('p');
        p.style.color = line === 0 ? "#ff2d75" : "#00ff41";
        output.appendChild(p);
        for (let char of text) {
            p.textContent += char;
            await new Promise(r => setTimeout(r, 50));
        }
        line++;
        await new Promise(r => setTimeout(r, 600));
    }
    drawHeart();
}

// 2. Math Heart Drawing
function drawHeart() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let t = 0;
    ctx.strokeStyle = "#ff2d75";
    ctx.lineWidth = 3;

    function animate() {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        const scale = window.innerWidth < 600 ? 10 : 15;
        ctx.lineTo(x * scale + canvas.width/2, y * scale + canvas.height/2);
        ctx.stroke();
        t += 0.05;
        if (t < 2 * Math.PI) requestAnimationFrame(animate);
        else document.getElementById('action-buttons').classList.remove('hidden');
    }
    ctx.beginPath();
    animate();
}

// 3. Binary Explosion & Success
const celebrate = () => {
    document.getElementById('terminal-container').style.display = 'none';
    document.getElementById('photo-gallery').classList.remove('hidden');
    
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    class Particle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            this.vx = (Math.random() - 0.5) * 20;
            this.vy = (Math.random() - 0.5) * 20;
            this.text = ["0", "1", "❤"][Math.floor(Math.random()*3)];
            this.alpha = 1;
        }
        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "#ff2d75";
            ctx.fillText(this.text, this.x, this.y);
            this.x += this.vx; this.y += this.vy;
            this.alpha -= 0.01;
        }
    }

    for(let i=0; i<100; i++) particles.push(new Particle());

    function anim() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        particles.forEach((p, i) => {
            p.draw();
            if(p.alpha <= 0) particles.splice(i, 1);
        });
        if(particles.length > 0) requestAnimationFrame(anim);
    }
    anim();
};

// 4. Zoom Functionality
function zoomImage(img) {
    const overlay = document.getElementById('image-overlay');
    const zoomedImg = document.getElementById('zoomed-img');
    overlay.style.display = 'flex';
    zoomedImg.src = img.src;
}

function closeZoom() {
    document.getElementById('image-overlay').style.display = 'none';
}

document.getElementById('yes-btn').addEventListener('click', celebrate);
document.getElementById('yes-btn-2').addEventListener('click', celebrate);
window.onload = startSequence;