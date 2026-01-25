const output = document.getElementById('output');
const terminalText = [
    "Hi my baby...",
    "Initializing secure connection...",
    "Decrypting feelings.dat...",
    "Scanning for mutual compatibility...",
    "MATCH FOUND: 100% Core Synchronicity.",
    "Target Identity: My baby bear.",
    "Loading Question Protocol..."
];

let line = 0;

async function typeLines() {
    for (let text of terminalText) {
        let p = document.createElement('p');
        p.textContent = line === 0 ? text : "> " + text;
        if (line === 0) p.style.color = "#ff2d75"; 
        output.appendChild(p);
        line++;
        await new Promise(r => setTimeout(r, 1000));
    }
    document.getElementById('action-buttons').classList.remove('hidden');
    drawHeart();
}

function drawHeart() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    // Adjust canvas for high-density mobile screens
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;
    ctx.strokeStyle = "#ff2d75";
    ctx.lineWidth = 2;

    function animate() {
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        // Scale down slightly for mobile (multiplier 10 instead of 15)
        const scale = window.innerWidth < 600 ? 10 : 15;
        ctx.lineTo(x * scale + canvas.width/2, y * scale + canvas.height/2);
        ctx.stroke();

        t += 0.05;
        if (t < 2 * Math.PI) requestAnimationFrame(animate);
    }
    ctx.beginPath();
    animate();
}

const noBtn = document.getElementById('no-btn');

// This handles both Desktop (mouseover) and Mobile (touchstart)
const moveButton = () => {
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.position = 'fixed'; // Ensures it can move anywhere
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
};

noBtn.addEventListener('mouseover', moveButton);
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Prevents the actual click
    moveButton();
});

document.getElementById('yes-btn').addEventListener('click', () => {
    document.body.innerHTML = `
        <div style="text-align:center; padding: 40px; display: flex; flex-direction: column; justify-content: center; height: 100vh;">
            <h1 style="color:#ff2d75; font-size:2.5rem; font-family: 'Courier New', monospace;">SYSTEM OVERLOAD! ❤️</h1>
            <p style="color:#fff; font-size:1.2rem; font-family: 'Courier New', monospace;">Connection established permanently. I love you, baby!</p>
            <div style="font-size: 4rem; margin-top: 20px;">🥰🌹</div>
        </div>
    `;
    document.body.style.backgroundColor = "#0d0208";
});

window.onload = typeLines;
