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

// STAGE 4: Celebration (The Digital Constellation)
function celebrate() {
    document.getElementById('terminal-container').style.display = 'none';
    document.getElementById('heartCanvas').style.display = 'none';
    const gallery = document.getElementById('photo-gallery');
    gallery.classList.remove('hidden');
    
    const canvas = document.getElementById('binaryCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext('2d');
    
    let particles = [];
    // Create floating "data nodes"
    for(let i=0; i<80; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            size: Math.random() * 15 + 5,
            char: ["1", "0", "❤", "{ }"][Math.floor(Math.random() * 4)]
        });
    }

    function drawConstellation() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff2d75";
        ctx.font = "14px monospace";
        
        particles.forEach((p, i) => {
            // Update position
            p.x += p.vx;
            p.y += p.vy;

            // Screen wrap-around
            if (p.x < 0) p.x = canvas.width;
            if (p.x > canvas.width) p.x = 0;
            if (p.y < 0) p.y = canvas.height;
            if (p.y > canvas.height) p.y = 0;

            // Draw character
            ctx.globalAlpha = 0.4;
            ctx.fillText(p.char, p.x, p.y);

            // Draw connecting lines to nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);
                if (dist < 150) {
                    ctx.beginPath();
                    ctx.strokeStyle = "#ff2d75";
                    ctx.globalAlpha = 1 - (dist / 150); // Fade lines based on distance
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
        requestAnimationFrame(drawConstellation);
    }
    drawConstellation();
}