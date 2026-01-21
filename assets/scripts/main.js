// --- LOADING LOGIC ---
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.classList.add('hidden');
        // Opcional: remover do DOM após a animação
        setTimeout(() => {
            loader.style.display = 'none';
        }, 600);
    }
});

// 1. Atualizar Ano
document.getElementById('ano').textContent = new Date().getFullYear();

// 2. Scroll Reveal Animation (Melhorado)
const reveals = document.querySelectorAll('.reveal');

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 50; // Dispara um pouco antes

    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);
// Trigger inicial
setTimeout(revealOnScroll, 100);

// 3. Efeito Tilt 3D no Cartão da Imagem
const card = document.getElementById('tiltCard');
const container = document.querySelector('.hero-image');

if (card && window.innerWidth > 900) {
    container.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; // Posição X dentro do elemento
        const y = e.clientY - rect.top;  // Posição Y dentro do elemento

        // Calcular rotação
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max 10 deg rotação
        const rotateY = ((x - centerX) / centerX) * 10;

        // Aplicar transformação
        card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;

        // Atualizar variável CSS para o brilho
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });

    container.addEventListener('mouseleave', () => {
        // Resetar posição suavemente
        card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
    });
}

// 4. Animação de Fundo "Constelação" (Canvas)
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

// Cores baseadas no tema
const particleColor = 'rgba(69, 162, 158, 0.5)'; // Azul suave
const lineColor = 'rgba(69, 162, 158, 0.15)';

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.5; // Velocidade lenta
        this.vy = (Math.random() - 0.5) * 0.5;
        this.size = Math.random() * 2 + 1;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        // Rebater nas bordas
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.fillStyle = particleColor;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function initParticles() {
    particles = [];
    const numberOfParticles = Math.min((canvas.width * canvas.height) / 15000, 100); // Densidade responsiva
    for (let i = 0; i < numberOfParticles; i++) {
        particles.push(new Particle());
    }
}

function animateCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();

        // Desenhar linhas entre partículas próximas
        for (let j = i; j < particles.length; j++) {
            const dx = particles[i].x - particles[j].x;
            const dy = particles[i].y - particles[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                ctx.strokeStyle = lineColor;
                ctx.lineWidth = 1;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(particles[j].x, particles[j].y);
                ctx.stroke();
            }
        }
    }
    requestAnimationFrame(animateCanvas);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateCanvas();