/* ============================= */
/* 🔗 SMOOTH SCROLLING FOR SIDENAV LINKS */
/* ============================= */
document.querySelectorAll('.sidenav a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const targetId = this.getAttribute('href').substring(1);
    const targetElement = document.getElementById(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });

      setTimeout(() => highlightSectionHeading(targetId), 500);
      history.pushState(null, "", `#${targetId}`);
    }
  });
});

/* ============================= */
/* ⬆️ SCROLL-TO-TOP BUTTON LOGIC */
/* ============================= */
document.addEventListener('DOMContentLoaded', function () {
  const scrollBtn = document.querySelector('.scroll-top-btn');
  const navbarHeight = 60;

  window.addEventListener('scroll', () => {
    if (window.scrollY > navbarHeight) {
      scrollBtn.classList.add('rotated');
    } else {
      scrollBtn.classList.remove('rotated');
    }
  });

  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});


/* ============================= */
/* 📋 CUSTOM CONTEXT MENU */
/* ============================= */
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();

  const selection = window.getSelection().toString().trim();
  const isImage = e.target.tagName === 'IMG';
  const shouldShowCopy = selection || isImage;

  const menu = document.getElementById('custom-context-menu');
  const copyOption = document.getElementById('copy-option');

  copyOption.style.display = shouldShowCopy ? 'flex' : 'none';

  menu.style.top = `${e.pageY}px`;
  menu.style.left = `${e.clientX}px`;
  menu.style.display = 'block';
  menu.style.animation = 'none';
  void menu.offsetWidth;
  menu.style.animation = 'dropdown-fade 0.2s ease-out forwards';

  copyOption.onclick = function () {
    if (selection) {
      navigator.clipboard.writeText(selection).then(() => showToast("Text copied!"));
    } else if (isImage) {
      const imgUrl = e.target.src;
      navigator.clipboard.writeText(imgUrl).then(() => showToast("Image URL copied!"));
    }
  };
});



document.addEventListener('click', function () {
  document.getElementById('custom-context-menu').style.display = 'none';
});


/* ============================= */
/* 🔔 TOAST NOTIFICATIONS */
/* ============================= */
document.addEventListener('keydown', function (e) {
  if (e.ctrlKey && e.key === 'c') {
    e.preventDefault();
    const selection = window.getSelection();
    const text = selection.toString().trim();

    if (text) {
      navigator.clipboard.writeText(text).then(() => {
        showToast("Copied!");
        selection.removeAllRanges();
      });
    } else {
      showToast("Nothing selected to copy.");
    }
  }
});


function showToast(message) {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `${message}<div class="toast-timer"></div>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.remove('toast-timer');
    toast.classList.add('toast-exit');
    toast.addEventListener('animationend', function handleAnimEnd(e) {
      if (e.animationName === 'toast-out') {
        toast.remove();
        toast.removeEventListener('animationend', handleAnimEnd);
      }
    });
  }, 1500);
}

/* ============================= */
/* ⚙️ SETTINGS PANEL TOGGLE */
/* ============================= */

// Open panel
document.querySelector('.context-menu li:nth-child(3)').onclick = function (e) {
  e.stopPropagation(); // Prevent it from triggering the body click
  const menu = document.getElementById('custom-context-menu');
  menu.style.display = 'none'; 
  document.getElementById('settings-panel').classList.add('open');
};

// Close on outside click
document.addEventListener('click', function (e) {
  const panel = document.getElementById('settings-panel');
  const isOpen = panel.classList.contains('open');
  const clickedInside = panel.contains(e.target);

  if (isOpen && !clickedInside) {
    panel.classList.remove('open');
  }
});

// Close on close button click
document.querySelector('.close-settings').onclick = function () {
  document.getElementById('settings-panel').classList.remove('open');
};

document.querySelectorAll('input[name="theme"]').forEach((el) => {
  el.addEventListener('change', function () {
    const htmlTag = document.documentElement;
    if (this.value === 'light') {
      htmlTag.classList.add('light-theme');
    } else {
      htmlTag.classList.remove('light-theme');
    }
  });
});

// Sync radio input with theme on load
// Apply saved theme on load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'dark'; // default to dark
  const htmlTag = document.documentElement;

  if (savedTheme === 'light') {
    htmlTag.classList.add('light-theme');
  } else {
    htmlTag.classList.remove('light-theme');
  }

  // Sync radio buttons
  document.querySelectorAll('input[name="theme"]').forEach((input) => {
    input.checked = input.value === savedTheme;
  });
});

// Theme change handler with localStorage save
document.querySelectorAll('input[name="theme"]').forEach((el) => {
  el.addEventListener('change', function () {
    const htmlTag = document.documentElement;

    if (this.value === 'light') {
      htmlTag.classList.add('light-theme');
      localStorage.setItem('theme', 'light');
    } else {
      htmlTag.classList.remove('light-theme');
      localStorage.setItem('theme', 'dark');
    }
  });
});

const dropdown = document.getElementById("font-size-dropdown");
const selected = dropdown.querySelector(".dropdown-selected span");
const options = dropdown.querySelectorAll(".dropdown-options li");

// Elements to scale and store their original sizes
const elementsToScale = document.querySelectorAll("body, h1, h2, h3, p, li, a, label, span");
const originalFontSizes = new Map();

// Cache original sizes
elementsToScale.forEach(el => {
  const style = window.getComputedStyle(el);
  const size = parseFloat(style.fontSize);
  originalFontSizes.set(el, size);
});

// Helper function to apply scale
function applyFontScale(factor) {
  originalFontSizes.forEach((originalSize, el) => {
    el.style.fontSize = `${originalSize * factor}px`;
  });
}

// Load from localStorage if available
const savedFontSize = localStorage.getItem("preferredFontScale");
if (savedFontSize) {
  const factor = parseFloat(savedFontSize);
  applyFontScale(factor);

  // Also update dropdown text
  const match = Array.from(options).find(opt => parseFloat(opt.dataset.size) === factor);
  if (match) selected.textContent = match.textContent;
}

dropdown.addEventListener("click", () => {
  dropdown.classList.toggle("open");
});

options.forEach(option => {
  option.addEventListener("click", (e) => {
    e.stopPropagation();
    const factor = parseFloat(e.target.getAttribute("data-size"));
    selected.textContent = e.target.textContent;
    dropdown.classList.remove("open");

    applyFontScale(factor);
    localStorage.setItem("preferredFontScale", factor);
  });
});

document.addEventListener("click", (e) => {
  if (!dropdown.contains(e.target)) {
    dropdown.classList.remove("open");
  }
});

