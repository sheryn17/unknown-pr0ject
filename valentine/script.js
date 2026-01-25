const output = document.getElementById('output');
const terminalText = [
    "Hi my baby...",
    "Status: Establishing secure link...",
    "Scanning emotional database...",
    "Warning: High levels of affection detected."
];

let line = 0;

// STAGE 1: Typewriter
async function startSequence() {
    for (let text of terminalText) {
        let p = document.createElement('p');
        p.style.color = line === 0 ? "#ff2d75" : "#00ff41";
        output.appendChild(p);
        for (let char of text) {
            p.textContent += char;
            await new Promise(r => setTimeout(r, 60));
        }
        line++;
        await new Promise(r => setTimeout(r, 800));
    }
    document.getElementById('continue-step').classList.remove('hidden');
}

// STAGE 2: Continue
document.getElementById('continue-btn').addEventListener('click', async () => {
    document.getElementById('continue-step').classList.add('hidden');
    let p = document.createElement('p');
    p.textContent = "> Access Granted. Initializing Heart_Visualizer...";
    p.style.color = "#00ff41";
    output.appendChild(p);
    await new Promise(r => setTimeout(r, 1000));
    drawHeart();
});

// STAGE 3: Drawing Heart
function drawHeart() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    let t = 0;
    ctx.strokeStyle = "#ff2d75";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#ff2d75";

    function animate() {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        const scale = window.innerWidth < 600 ? 11 : 16;
        ctx.lineTo(x * scale + canvas.width/2, y * scale + canvas.height/2);
        ctx.stroke();
        t += 0.05;
        if (t < 2 * Math.PI) requestAnimationFrame(animate);
        else document.getElementById('action-buttons').classList.remove('hidden');
    }
    ctx.beginPath();
    animate();
}

// STAGE 4: Celebration
function celebrate() {
    document.getElementById('terminal-container').style.display = 'none';
    document.getElementById('heartCanvas').style.display = 'none';
    document.getElementById('photo-gallery').classList.remove('hidden');
    
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    for(let i=0; i<150; i++) {
        particles.push({
            x: canvas.width/2, y: canvas.height/2,
            vx: (Math.random()-0.5)*25, vy: (Math.random()-0.5)*25,
            alpha: 1, text: ["1","0","❤"][Math.floor(Math.random()*3)]
        });
    }

    function anim() {
        ctx.clearRect(0,0,canvas.width, canvas.height);
        particles.forEach((p, i) => {
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = "#ff2d75";
            ctx.font = "20px monospace";
            ctx.fillText(p.text, p.x, p.y);
            p.x += p.vx; p.y += p.vy; p.alpha -= 0.01;
            if(p.alpha <= 0) particles.splice(i, 1);
        });
        if(particles.length > 0) requestAnimationFrame(anim);
    }
    anim();
}

function zoomImage(img) {
    const overlay = document.getElementById('image-overlay');
    document.getElementById('zoomed-img').src = img.src;
    overlay.style.display = 'flex';
}
function closeZoom() { document.getElementById('image-overlay').style.display = 'none'; }

window.onload = startSequence;