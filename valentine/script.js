const output = document.getElementById('output');
const terminalText = [
    "UNAUTHORIZED ACCESS DETECTED...",
    "Bypassing firewall...",
    "Injecting Love_Virus.exe...",
    "System Override: SUCCESS.",
    "--------------------------------",
    "Hi my love",
    "You've been hacked by me hehe 😉",
    "Scanning emotional database...",
    "Warning: Affection levels at 100%."
];

let line = 0;

// Typewriter Effect
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

// Access Granted Trigger
document.getElementById('continue-btn').addEventListener('click', async () => {
    document.getElementById('continue-step').classList.add('hidden');
    let p = document.createElement('p');
    p.textContent = "> Access Granted. Initializing Heart_Visualizer...";
    p.style.color = "#00ff41";
    output.appendChild(p);
    await new Promise(r => setTimeout(r, 1000));
    drawHeart();
});

// Drawing the Neon Heart
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

function celebrate() {
    // Hide the terminal and the drawn heart
    document.getElementById('terminal-container').style.display = 'none';
    document.getElementById('heartCanvas').style.display = 'none';
    
    // Show the envelope container
    const gallery = document.getElementById('photo-gallery'); 
    gallery.classList.remove('hidden');
    
    // Initialize the background constellation
    const canvas = document.getElementById('binaryCanvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    // Start your constellation animation logic here
    initConstellation(); 
}

// Add this so the envelope actually opens when clicked
function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.toggle('open');
}