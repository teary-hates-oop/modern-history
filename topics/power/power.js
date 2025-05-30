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
/* 🎯 HEADING HIGHLIGHT ON NAVIGATION */
/* ============================= */
function highlightSectionHeading(id) {
  const section = document.getElementById(id);
  const heading = section?.querySelector("h2, h1");
  if (heading) {
    heading.classList.add("highlighted");
    setTimeout(() => heading.classList.remove("highlighted"), 2000);
  }
}

window.addEventListener("hashchange", () => {
  const id = window.location.hash.substring(1);
  highlightSectionHeading(id);
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
