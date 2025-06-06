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


let scrollTimeout;

window.addEventListener('scroll', () => {
  const progressBar = document.getElementById('progress-bar');
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (scrollTop / scrollHeight) * 100;

  // Update progress bar width & ensure it's visible
  progressBar.style.width = scrolled + "%";
  progressBar.style.opacity = 1;

  // Clear the previous timeout
  clearTimeout(scrollTimeout);

  // Set a new timeout to hide the bar after 800ms
  scrollTimeout = setTimeout(() => {
    progressBar.style.opacity = 0;
  }, 800);
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
let lastRightClickedImage = null;

document.addEventListener('contextmenu', function (e) {
  e.preventDefault();

  const selection = window.getSelection().toString().trim();
  const isImage = e.target.tagName === 'IMG';
  const shouldShowCopy = selection || isImage;

  lastRightClickedImage = isImage ? e.target : null;
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
      selection.removeAllRanges(); 
    } else if (lastRightClickedImage) {
      const imgUrl = e.target.src;
        fetch(lastRightClickedImage.src)
        .then(res => res.blob())
        .then(blob => {
          const item = new ClipboardItem({ [blob.type]: blob });
          navigator.clipboard.write([item]).then(() => {
            showToast("Image copied to clipboard!");
          });
        })
        .catch(() => {
          navigator.clipboard.writeText(lastRightClickedImage.src).then(() => showToast("Copied image URL (could not copy image directly)"));
        });
        selection.removeAllRanges();
    }
  };
});

const inspectOption = document.getElementById('inspect');
inspectOption.onclick = function () {
  showToast("Browsers don't let me do this, sorry!");
  showToast("Use <code> <em>ctrl+shift+i</em> </code> :)");
}

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
    } else if (lastRightClickedImage) {
        fetch(lastRightClickedImage.src)
        .then(res => res.blob())
        .then(blob => {
          const item = new ClipboardItem({ [blob.type]: blob });
          navigator.clipboard.write([item]).then(() => {
            showToast("Image copied to clipboard!");
          });
        })
        .catch(() => {
          navigator.clipboard.writeText(lastRightClickedImage.src).then(() => showToast("Copied image URL (could not copy image directly)"));
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

const progressBar = document.getElementById('progress-bar');
const disableProgress = document.getElementById('disable-progress');

disableProgress.addEventListener('change', () => {
  if (disableProgress.checked) {
    progressBar.style.display = 'none';
    localStorage.setItem('progressBarDisabled', 'true');
  } else {
    progressBar.style.display = 'block';
    localStorage.removeItem('progressBarDisabled');
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const isDisabled = localStorage.getItem('progressBarDisabled') === 'true';
  disableProgress.checked = isDisabled;
  progressBar.style.display = isDisabled ? 'none' : 'block';
});

/* ============================= */
/* SIDENAV */
/* ============================= */
document.addEventListener("DOMContentLoaded", () => {
  const content = document.getElementById("content");
  const sidenav = document.querySelector(".sidenav");

  if (!content || !sidenav) return;

  const headings = content.querySelectorAll("h1, h2");
  const toc = document.createElement("ul");
  toc.classList.add("toc");

  let currentLevel = 1;
  let currentList = toc;
  const listStack = [toc];

  headings.forEach((heading, index) => {
    const level = parseInt(heading.tagName.substring(1));
    if (!heading.id) {
      heading.id = `heading-${index}`;
    }

    const li = document.createElement("li");
    li.classList.add(`level-${level}`);
    const a = document.createElement("a");
    a.href = `#${heading.id}`;
    a.textContent = heading.textContent;
    li.appendChild(a);

    if (level > currentLevel) {
      const newList = document.createElement("ul");
      listStack[listStack.length - 1].lastElementChild.appendChild(newList);
      listStack.push(newList);
      currentList = newList;
    } else if (level < currentLevel) {
      listStack.splice(level - currentLevel);
      currentList = listStack[listStack.length - 1];
    }

    currentList.appendChild(li);
    currentLevel = level;
  });

  sidenav.appendChild(toc);

  // Smooth scrolling
  sidenav.querySelectorAll("a").forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.getElementById(this.getAttribute("href").substring(1));
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 40,
          behavior: "smooth"
        });
      }
    });
  });

  // Scrollspy functionality
  const observerOptions = {
    root: null,
    rootMargin: "0px 0px -80% 0px",
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = sidenav.querySelector(`a[href="#${id}"]`);
      if (link) {
        if (entry.isIntersecting) {
          link.classList.add("active");
        } else {
          link.classList.remove("active");
        }
      }
    });
  }, observerOptions);

  headings.forEach(heading => {
    observer.observe(heading);
  });
});

/* ============================= */
/* ABOUT ME SECTION */
/* ============================= */
function scrambleText(targetEl, finalText, speed = 30) {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let iterations = 0;

  const interval = setInterval(() => {
    targetEl.textContent = finalText
      .split("")
      .map((char, i) => {
        if (i < iterations) return finalText[i];
        return chars[Math.floor(Math.random() * chars.length)];
      })
      .join("");

    if (iterations >= finalText.length) {
      clearInterval(interval);
    }

    iterations += 1 / 2;
  }, speed);
}

// Show About window
const about = document.getElementById("about");
about.addEventListener("click", (e) => {
  const modal = document.getElementById("about-window");
  const scramble = document.getElementById("scramble-text");

  modal.classList.add("visible");
  scramble.textContent = "████████████";
  scrambleText(scramble, "made by teary");
});

// ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    document.getElementById("about-window").classList.remove("visible");
  }
});

// click outside to close
document.getElementById("about-window").addEventListener("click", (e) => {
  if (e.target.id === "about-window") {
    e.target.classList.remove("visible");
  }
});

/* ============================= */
/* Konami Sequence */
/* ============================= */
const konamiSequence = [
  "t", "e", "a", "r", "y"
];

let konamiIndex = 0;

document.addEventListener("keydown", function (e) {
  const key = e.key;

  if (key.toLowerCase() === konamiSequence[konamiIndex].toLowerCase()) {
    konamiIndex++;
    if (konamiIndex === konamiSequence.length) {
      konamiIndex = 0;
      triggerKonamiEgg();
    }
  } else {
    konamiIndex = 0;
  }
});
function triggerKonamiEgg() {
  const content = document.querySelector("#content") || document.body;
  const originalTransition = content.style.transition || "";
  const originalFilter = content.style.filter || "";
  const originalColor = content.style.color || "";

  // Add swirl effect
  content.style.transition = "all 5s ease-in-out";
  content.style.transform = "rotate(720deg)";
  content.style.filter = "hue-rotate(360deg) saturate(2)";
  content.style.color = "transparent";
  content.style.backgroundImage = "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)";
  content.style.backgroundClip = "text";
  content.style.webkitBackgroundClip = "text";
  showToast(":)");
  // Add swirl to all children (optional deeper effect)
  // const allEls = content.querySelectorAll("*");
  // allEls.forEach(el => {
  //   el.style.transition = "all 0.3s ease";
  //   el.style.color = "transparent";
  //   el.style.backgroundImage = "linear-gradient(90deg, red, orange, yellow, green, cyan, blue, violet)";
  //   el.style.backgroundClip = "text";
  //   el.style.webkitBackgroundClip = "text";
  //   el.style.transform = "rotate(10deg)";
  // });

  setTimeout(() => {
    // Reset styles
    content.style.transition = originalTransition;
    content.style.transform = "none";
    content.style.filter = originalFilter;
    content.style.color = originalColor;
    content.style.backgroundImage = "";
    content.style.backgroundClip = "";
    content.style.webkitBackgroundClip = "";

    allEls.forEach(el => {
      el.style.color = "";
      el.style.backgroundImage = "";
      el.style.backgroundClip = "";
      el.style.webkitBackgroundClip = "";
      el.style.transform = "";
    });
  }, 5000);
}
