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

/* ============================= */
/* TEXT TO SPEECH */
/* ============================= */
const ttsToggle = document.getElementById("enable-tts");
const ttsPlayer = document.getElementById("tts-player");
const playBtn = document.getElementById("play-btn");
const playIcon = document.getElementById("play-icon");
const pauseIcon = document.getElementById("pause-icon");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const startFromHereBtn = document.getElementById("start-from-here");
const content = document.getElementById("content");

let readableElements = [];
let currentElementIndex = 0;
let utterance = null;
let isPlaying = false;
let isPaused = false;

function wrapWordsInElement(element) {
  const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
  const textNodes = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.nodeValue.trim()) textNodes.push(node);
  }
  textNodes.forEach(node => {
    const parent = node.parentNode;
    const words = node.nodeValue.split(/(\s+)/);
    const frag = document.createDocumentFragment();
    words.forEach(word => {
      if (word.trim()) {
        const span = document.createElement("span");
        span.className = "tts-word";
        span.textContent = word;
        frag.appendChild(span);
      } else {
        frag.appendChild(document.createTextNode(word));
      }
    });
    parent.replaceChild(frag, node);
  });
}

function unwrapWordsInElement(element) {
  const spans = element.querySelectorAll('.tts-word');
  spans.forEach(span => {
    const textNode = document.createTextNode(span.textContent);
    span.parentNode.replaceChild(textNode, span);
  });
}

function clearHighlights(element) {
  const highlighted = element.querySelectorAll('.tts-word.highlight');
  highlighted.forEach(el => el.classList.remove('highlight'));
}

function getRandomVoice() {
  const voices = speechSynthesis.getVoices();
  if (!voices.length) return null;

  const maleVoices = voices.filter(v =>
    /male|man|david|alex|fred|dan/i.test(v.name + v.voiceURI)
  );

  return maleVoices.length ? maleVoices[0] : voices[0];
}

function speakElement(index) {
  if (index < 0 || index >= readableElements.length) return;
  currentElementIndex = index;
  const element = readableElements[index];
  unwrapWordsInElement(element);
  wrapWordsInElement(element);
  const text = element.textContent;
  utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = getRandomVoice();
  utterance.onboundary = (event) => {
    if (event.name === 'word') {
      const wordSpans = element.querySelectorAll('.tts-word');
      const charIndex = event.charIndex;
      let currentChar = 0;
      for (let i = 0; i < wordSpans.length; i++) {
        const span = wordSpans[i];
        const spanText = span.textContent;
        if (currentChar + spanText.length > charIndex) {
          clearHighlights(element);
          span.classList.add('highlight');
          break;
        }
        currentChar += spanText.length + 1;
      }
    }
  };
  utterance.onend = () => {
    clearHighlights(element);
    unwrapWordsInElement(element);
    if (currentElementIndex < readableElements.length - 1) {
      speakElement(currentElementIndex + 1);
    } else {
      isPlaying = false;
      isPaused = false;
      updatePlayButton();
    }
  };
  window.speechSynthesis.speak(utterance);
  isPlaying = true;
  isPaused = false;
  updatePlayButton();
}

function cancelSpeech() {
  window.speechSynthesis.cancel();
  if (readableElements[currentElementIndex]) {
    clearHighlights(readableElements[currentElementIndex]);
    unwrapWordsInElement(readableElements[currentElementIndex]);
  }
  isPlaying = false;
  isPaused = false;
  updatePlayButton();
}

function updatePlayButton() {
  if (isPlaying) {
    playIcon.style.display = "none";
    pauseIcon.style.display = "inline";
  } else {
    playIcon.style.display = "inline";
    pauseIcon.style.display = "none";
  }
}

ttsToggle.addEventListener("change", () => {
  if (ttsToggle.checked) {
    ttsPlayer.classList.add("visible");
    ttsPlayer.classList.remove("hidden");
    ttsPlayer.style.bottom = "20px";
    readableElements = Array.from(document.querySelectorAll('#content h1, #content h2, #content h3, #content p, #content li'));
    const savedIndex = sessionStorage.getItem("ttsElementIndex");
    currentElementIndex = savedIndex ? parseInt(savedIndex) : 0;
    speakElement(currentElementIndex);
  } else {
    sessionStorage.setItem("ttsElementIndex", currentElementIndex);
    cancelSpeech();
    ttsPlayer.style.bottom = "0px";
    ttsPlayer.classList.remove("visible");
    ttsPlayer.classList.add("hidden");
  }
});

playBtn.addEventListener("click", () => {
  if (isPlaying) {
    window.speechSynthesis.pause();
    isPaused = true;
    isPlaying = false;
    updatePlayButton();
  } else if (isPaused) {
    window.speechSynthesis.resume();
    isPlaying = true;
    isPaused = false;
    updatePlayButton();
  } else {
    speakElement(currentElementIndex);
  }
});

prevBtn.addEventListener("click", () => {
  if (currentElementIndex > 0) {
    cancelSpeech();
    speakElement(currentElementIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentElementIndex < readableElements.length - 1) {
    cancelSpeech();
    speakElement(currentElementIndex + 1);
  }
});

startFromHereBtn.addEventListener("click", () => {
  content.addEventListener("click", startFromHereHandler, { once: true });
});

function startFromHereHandler(event) {
  const clickedElement = event.target.closest('#content h1, #content h2, #content h3, #content p, #content li');
  if (clickedElement) {
    const index = readableElements.indexOf(clickedElement);
    if (index !== -1) {
      cancelSpeech();
      speakElement(index);
    }
  }
}

window.speechSynthesis.onvoiceschanged = () => {
  getRandomVoice();
};
