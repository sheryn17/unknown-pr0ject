document.addEventListener("DOMContentLoaded", () => {
    const bar = document.getElementById('progress-bar');
    const loadingText = document.getElementById('loading-text');
    const loadingScreen = document.getElementById('fake-loading');
    
    let progress = 0;
    const interval = setInterval(() => {
        progress += 2; // Fill by 2% every 100ms
        bar.style.width = progress + '%';

        // Add "boring" text changes to sell the fake error
        if (progress === 40) loadingText.innerText = "Checking local disk...";
        if (progress === 80) loadingText.innerText = "Attempting to bypass error...";

        if (progress >= 100) {
            clearInterval(interval);
            
            // Start the transition
            loadingScreen.style.opacity = '0';
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                if (typeof startTerminal === "function") startTerminal();
            }, 500);
        }
    }, 100); // 100ms * 50 steps = exactly 5 seconds
});  


const output = document.getElementById('output');
const terminalText = [

    "UNAUTHORIZED ACCESS DETECTED...",
    "Bypassing firewall...",
    "Injecting Love_Virus.exe...",
    "Downloading: My_Whole_World.zip",
    "-------------------------------",
    "Hi my love!",
    "You've been hacked by me hehe 😉",
];

let line = 0;

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

document.getElementById('continue-btn').addEventListener('click', async () => {
    document.getElementById('continue-step').classList.add('hidden');
    let p = document.createElement('p');
    p.textContent = "> Access Granted. Initializing Heart_Visualizer...";
    p.style.color = "#00ff41";
    output.appendChild(p);
    await new Promise(r => setTimeout(r, 1000));
    drawHeart();
});

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
    document.getElementById('terminal-container').style.display = 'none';
    document.getElementById('heartCanvas').style.display = 'none';
    const gallery = document.getElementById('photo-gallery'); 
    gallery.classList.remove('hidden');
    initConstellation(); 
}

function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');
    
    // Wait for the letter to finish sliding up before showing the alert
    setTimeout(() => {
        showSystemAlert();
    }, 1000); 
}

function showSystemAlert() {
    const notif = document.getElementById('system-notification');
    const sound = document.getElementById('notif-sound');
    const progress = document.querySelector('.notif-progress');

    // Play the "ding" sound
    sound.play().catch(e => console.log("Sound blocked by browser"));

    // Slide the notification in
    notif.classList.add('show');
    progress.classList.add('active');

    // Auto-hide after 5 seconds
    setTimeout(() => {
        closeNotif();
    }, 5500);
}

function closeNotif() {
    document.getElementById('system-notification').classList.remove('show');
}

function initConstellation() {
    const canvas = document.getElementById('binaryCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    for(let i=0; i<70; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            char: ["1", "0", "❤"][Math.floor(Math.random() * 3)]
        });
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#ff2d75";
        ctx.font = "12px monospace";
        particles.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if(p.x < 0) p.x = canvas.width;
            if(p.x > canvas.width) p.x = 0;
            if(p.y < 0) p.y = canvas.height;
            if(p.y > canvas.height) p.y = 0;
            ctx.globalAlpha = 0.3;
            ctx.fillText(p.char, p.x, p.y);
        });
        requestAnimationFrame(animate);
    }
    animate();
}

window.onload = startSequence;