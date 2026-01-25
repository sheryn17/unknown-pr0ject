const output = document.getElementById('output');
const terminalText = [
    "Hi love",
    "Initializing secure connection...",
    "Accessing internal_feelings.sys...",
    "Found 1 critical request...",
    "Loading visual representation..."
];

let line = 0;

async function startSequence() {
    // 1. Type the terminal lines
    for (let text of terminalText) {
        let p = document.createElement('p');
        p.textContent = line === 0 ? text : "> " + text;
        if (line === 0) p.style.color = "#ff2d75"; 
        output.appendChild(p);
        line++;
        await new Promise(r => setTimeout(r, 1000));
    }

    // 2. Draw the heart
    await drawHeart();

    // 3. Show the question and buttons AFTER heart is done
    setTimeout(() => {
        document.getElementById('action-buttons').classList.remove('hidden');
    }, 500);
}

function drawHeart() {
    return new Promise((resolve) => {
        const canvas = document.getElementById('heartCanvas');
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let t = 0;
        ctx.strokeStyle = "#ff2d75";
        ctx.lineWidth = 2;

        function animate() {
            let x = 16 * Math.pow(Math.sin(t), 3);
            let y = -(13 * Math.cos(t) - 5 * Math.cos(2*t) - 2 * Math.cos(3*t) - Math.cos(4*t));
            
            const scale = window.innerWidth < 600 ? 10 : 15;
            ctx.lineTo(x * scale + canvas.width/2, y * scale + canvas.height/2);
            ctx.stroke();

            t += 0.05;
            if (t < 2 * Math.PI) {
                requestAnimationFrame(animate);
            } else {
                resolve(); // Heart is finished
            }
        }
        ctx.beginPath();
        animate();
    });
}

const celebrate = () => {
    // 1. Hide the terminal and show the gallery
    document.getElementById('terminal-container').style.display = 'none';
    document.getElementById('photo-gallery').classList.remove('hidden');
    document.body.style.background = "#000";

    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    let particles = [];
    const binary = ["0", "1", "❤"];

    class Particle {
        constructor() {
            this.x = canvas.width / 2;
            this.y = canvas.height / 2;
            // Explosion velocity
            this.vx = (Math.random() - 0.5) * 15;
            this.vy = (Math.random() - 0.5) * 15;
            this.text = binary[Math.floor(Math.random() * binary.length)];
            this.alpha = 1;
            this.fontSize = Math.random() * 20 + 10;
        }

        draw() {
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = "#ff2d75";
            ctx.font = `${this.fontSize}px monospace`;
            ctx.fillText(this.text, this.x, this.y);
            this.x += this.vx;
            this.y += this.vy;
            this.alpha -= 0.01; // Fade out
        }
    }

    // Create burst
    for(let i=0; i<150; i++) {
        particles.push(new Particle());
    }

    function animateBinary() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((p, index) => {
            if (p.alpha <= 0) {
                particles.splice(index, 1);
            } else {
                p.draw();
            }
        });
        if (particles.length > 0) {
            requestAnimationFrame(animateBinary);
        } else {
            // After explosion, show the final message
            showFinalMessage();
        }
    }

    animateBinary();
};

function showFinalMessage() {
    const msg = document.createElement('div');
    msg.innerHTML = `
        <div style="position:fixed; top:50%; left:50%; transform:translate(-50%,-50%); text-align:center; z-index:10005;">
            <h1 style="color:#ff2d75; font-size:3rem; text-shadow:0 0 20px #ff2d75;">I LOVE YOU</h1>
            <p style="color:white; font-family:monospace;">System Status: Occupied by You Forever.</p>
        </div>
    `;
    document.body.appendChild(msg);
}