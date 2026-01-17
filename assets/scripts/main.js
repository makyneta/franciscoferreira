// 1. Theme Logic
const toggle = document.getElementById('themeToggle');
const icon = toggle.querySelector('i');
const html = document.documentElement;

toggle.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    icon.className = next === 'dark' ? 'fa-solid fa-moon' : 'fa-solid fa-sun';
});

// 2. Ano
document.getElementById('ano').textContent = new Date().getFullYear();

// 3. Scroll Reveal
const reveals = document.querySelectorAll('.reveal');
function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const elementVisible = 100;
    reveals.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) reveal.classList.add('active');
    });
}
window.addEventListener('scroll', revealOnScroll);
revealOnScroll();