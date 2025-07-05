const iconContainer = document.getElementById('current-theme-icon');
const dropdown = document.getElementById('theme-dropdown');
const trigger = document.getElementById('theme-toggle-trigger');
const options = document.querySelectorAll('.theme-option');

// Clone of SVG nodes (already rendered) for safe swapping
const ICONS = {
  light: document.querySelector('[data-theme="light"] svg').cloneNode(true),
  dark: document.querySelector('[data-theme="dark"] svg').cloneNode(true),
  system: document.querySelector('[data-theme="system"] svg').cloneNode(true),
};

function setTheme(theme) {
  localStorage.setItem('theme', theme);

  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else if (theme === 'light') {
    document.documentElement.classList.remove('dark');
  } else {
    // System preference
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)'
    ).matches;
    document.documentElement.classList.toggle('dark', prefersDark);
  }

  // Replace icon visually.
  // Clear out all classes and just set width and height.
  const cleanIcon = ICONS[theme].cloneNode(true);
  cleanIcon.className.baseVal = 'w-5 h-5';
  iconContainer.innerHTML = '';
  iconContainer.appendChild(cleanIcon);
}

function initTheme() {
  const saved = localStorage.getItem('theme') || 'system';
  setTheme(saved);
}

trigger.addEventListener('click', () => {
  dropdown.classList.toggle('hidden');
});

document.addEventListener('click', (e) => {
  if (!trigger.contains(e.target) && !dropdown.contains(e.target)) {
    dropdown.classList.add('hidden');
  }
});

options.forEach((btn) => {
  btn.addEventListener('click', () => {
    const selected = btn.getAttribute('data-theme');
    setTheme(selected);
    dropdown.classList.add('hidden');
  });
});

initTheme();
