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

function startTheMemories() {
    // Only start the photo interval when the hacker sequence starts
    setInterval(createPhotoParticle, 2000);
}
function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    
    // Prevent opening if it's already open
    if (wrapper.classList.contains('open')) return;
    
    // The Glitch Effect
    document.body.style.filter = "invert(1) hue-rotate(180deg)";
    setTimeout(() => {
        document.body.style.filter = "none";
    }, 150);

    wrapper.classList.add('open');
    
    // Show System Alert
    if (typeof showSystemAlert === "function") {
        setTimeout(showSystemAlert, 600);
    }
}

// MAKE SURE THIS FUNCTION NAME MATCHES YOUR HTML onclick="closeEnvelope(event)"
function closeEnvelope(event) {
    // 1. This stops the "open" function from firing immediately after clicking close
    event.stopPropagation(); 

    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.remove('open');
    
    // 2. Hide the alert if it's open
    const notif = document.getElementById('system-notification');
    if (notif) {
        notif.classList.remove('show');
    }
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

const yourPhotos = [
    'https://i.ibb.co/wNFQ51JP/Image.jpg', 
    'https://i.ibb.co/PG2Y21Qy/Image-2.jpg', 
    'https://i.ibb.co/mCbN110F/Image-1.jpg',
    'https://i.ibb.co/WvyVH0PF/Image.jpg',
    'https://i.ibb.co/7NgHPp6r/Image-1.jpg',
    'https://i.ibb.co/8DWfgLJ8/Image-2.jpg'
];

function createBackgroundParticle() {
    const container = document.body;
    const isPhoto = Math.random() > 0.7; // 30% chance for a photo, 70% for a heart
    
    const particle = document.createElement(isPhoto ? 'div' : 'span');
    
    if (isPhoto) {
        // Create the Polaroid Photo
        particle.classList.add('floating-polaroid');
        const img = document.createElement('img');
        img.src = yourPhotos[Math.floor(Math.random() * yourPhotos.length)];
        particle.appendChild(img);
        
        // Random small size for photos
        const size = Math.random() * (70 - 40) + 40; // Small: 40px to 70px
        particle.style.width = `${size}px`;
    } else {
        // Create the Floating Heart
        particle.classList.add('floating-heart');
        particle.innerText = '❤️';
        particle.style.fontSize = `${Math.random() * (20 - 10) + 10}px`;
    }
    
    // Common positioning logic
    const startX = Math.random() * window.innerWidth;
    const duration = Math.random() * (15 - 8) + 8; // Slower, subtle movement
    
    particle.style.left = `${startX}px`;
    particle.style.animationDuration = `${duration}s`;
    particle.style.left = `${startX}px`;

    container.appendChild(particle);

    setTimeout(() => {
        particle.remove();
    }, duration * 1000);
}

// Start the mix
setInterval(createBackgroundParticle, 1000);

let heartCharge = 0;
const chargeNeeded = 10; // Number of taps required

// 1. Move the No Button
function moveNo() {
    const btn = document.getElementById('no-btn');
    const x = Math.random() * (window.innerWidth - btn.offsetWidth);
    const y = Math.random() * (window.innerHeight - btn.offsetHeight);
    btn.style.position = 'fixed';
    btn.style.left = x + 'px';
    btn.style.top = y + 'px';
}

// 2. Start Sync after clicking YES
function startSync() {
    document.getElementById('valentine-question').style.display = 'none';
    document.getElementById('unlock-gate').style.display = 'flex';
}

// 3. The Tapping Logic
function chargeHeart() {
    heartCharge++;
    const fill = document.querySelector('.heart-fill');
    const syncVal = document.getElementById('sync-val');
    const container = document.querySelector('.heart-container');
    
    // Update fill and text
    let progress = heartCharge / chargeNeeded;
    fill.style.transform = `scale(${progress})`;
    syncVal.innerText = Math.floor(progress * 100);

    // Physical feedback (Pulse on tap)
    container.style.transform = 'scale(1.2)';
    setTimeout(() => container.style.transform = 'scale(1)', 100);

    // 4. Reveal Envelope when 100%
    if (heartCharge >= chargeNeeded) {
        completeSync();
    }
}

function completeSync() {
    // Brief Glitch Effect
    document.body.style.filter = "invert(1)";
    
    setTimeout(() => {
        document.body.style.filter = "none";
        document.getElementById('unlock-gate').style.display = 'none';
        
        const envelopeWrap = document.querySelector('.envelope-wrapper');
        envelopeWrap.style.display = 'block';
        
        // Final opening animation
        setTimeout(() => {
            envelopeWrap.classList.add('open');
            // Play notification sound
            const sound = document.getElementById('notif-sound');
            if(sound) sound.play();
        }, 500);
    }, 200);
}
function showSystemAlert() {
    const notif = document.getElementById('system-notification');
    if (notif) {
        notif.classList.add('show');
        console.log("Notification Triggered!"); // Helpful for debugging
    }
}