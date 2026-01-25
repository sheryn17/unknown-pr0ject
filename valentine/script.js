const output = document.getElementById('output');
const terminalText = [
    "Hi my baby...",
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
    document.body.innerHTML = `
        <div style="text-align:center; display:flex; flex-direction:column; justify-content:center; align-items:center; height:100vh; width:100vw; background:#0d0208; color:white; font-family:'Courier New';">
            <h1 style="color:#ff2d75; font-size:3rem;">SUCCESS! ❤️</h1>
            <p style="font-size:1.5rem;">I love you so much, baby!</p>
            <div style="font-size:5rem; margin-top:20px;">🥰</div>
        </div>
    `;

    // Heart Rain
    setInterval(() => {
        const heart = document.createElement("div");
        heart.classList.add("heart-particle");
        heart.innerHTML = ["❤️", "💖", "💝", "💕"][Math.floor(Math.random() * 4)];
        heart.style.left = Math.random() * 100 + "vw";
        heart.style.fontSize = Math.random() * 20 + 15 + "px";
        heart.style.animationDuration = Math.random() * 3 + 2 + "s";
        document.body.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 150);
};

document.getElementById('yes-btn').addEventListener('click', celebrate);
document.getElementById('yes-btn-2').addEventListener('click', celebrate);

window.onload = startSequence;