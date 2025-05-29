
document.addEventListener('DOMContentLoaded', function () {
const scrollBtn = document.querySelector('.scroll-top-btn');
const navbarHeight = 60; // Adjust if your navbar height differs

// Toggle rotation based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
    scrollBtn.classList.add('rotated');
    } else {
    scrollBtn.classList.remove('rotated');
    }
});

// Smooth scroll to top on button click
scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
});

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
  const menu = document.getElementById('custom-context-menu');
  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.style.display = 'block';
});

document.addEventListener('click', function () {
  const menu = document.getElementById('custom-context-menu');
  menu.style.display = 'none';
});
