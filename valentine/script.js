const output = document.getElementById('output');
// This is where we customize your intro message
const terminalText = [
    "Hi my baby...",
    "Initializing secure connection...",
    "Decrypting feelings.dat...",
    "Scanning for mutual compatibility...",
    "MATCH FOUND: 100% Core Synchronicity.",
    "Target Identity: The Love of My Life.",
    "Loading Question Protocol..."
];

let line = 0;

// Typewriter Function
async function typeLines() {
    for (let text of terminalText) {
        let p = document.createElement('p');
        // We use a different prompt for the first line to make it special
        p.textContent = line === 0 ? text : "> " + text;
        
        // Make the "Hi my baby" line a different color (optional)
        if (line === 0) p.style.color = "#ff2d75"; 
        
        output.appendChild(p);
        line++;
        
        // Delay between lines (800ms)
        await new Promise(r => setTimeout(r, 1000));
    }
    
    // Show the buttons and draw the heart after the text finishes
    document.getElementById('action-buttons').classList.remove('hidden');
    drawHeart();
}

// Math-based Heart Drawing (The Canvas Heart)
function drawHeart() {
    const canvas = document.getElementById('heartCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let t = 0;
    ctx.strokeStyle = "#ff2d75";
    ctx.lineWidth = 2;

    function animate() {
        // Parametric Heart Equation
        let x = 16 * Math.pow(Math.sin(t), 3);
        let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
        
        ctx.lineTo(x * 15 + canvas.width/2, y * 15 + canvas.height/2);
        ctx.stroke();

        t += 0.05;
        if (t < 2 * Math.PI) requestAnimationFrame(animate);
    }
    ctx.beginPath();
    animate();
}

// No Button Dodge Logic
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', () => {
    // Moves the button randomly when the mouse gets close
    const x = Math.random() * (window.innerWidth - 150);
    const y = Math.random() * (window.innerHeight - 50);
    noBtn.style.left = `${x}px`;
    noBtn.style.top = `${y}px`;
});

// Yes Button Celebration
document.getElementById('yes-btn').addEventListener('click', () => {
    document.body.innerHTML = `
        <div style="text-align:center; padding: 20px;">
            <h1 style="color:#ff2d75; font-size:3.5rem; font-family: 'Courier New', monospace;">SYSTEM OVERLOAD! ❤️</h1>
            <p style="color:#fff; font-size:1.5rem; font-family: 'Courier New', monospace;">Connection established permanently. I love you, baby!</p>
            <div style="font-size: 5rem;">🥰</div>
        </div>
    `;
    document.body.style.backgroundColor = "#0d0208";
});

// Start the sequence when the page loads
window.onload = typeLines;
