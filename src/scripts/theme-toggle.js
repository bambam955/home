const getSystemTheme = () =>
  window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

const applyTheme = (theme) => {
  const root = document.documentElement;

  if (theme === 'system') {
    theme = getSystemTheme();
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        applyTheme('system');
      });
  }

  root.classList.remove('light', 'dark');
  root.classList.add(theme);
};

const setTheme = (theme) => {
  localStorage.setItem('theme', theme);
  applyTheme(theme);
  updateActive(theme);
};

const updateActive = (active) => {
  document.querySelectorAll('.theme-toggle-btn').forEach((btn) => {
    const isActive = btn.id === active;
    btn.classList.toggle('bg-gray-300', isActive);
    btn.classList.toggle('dark:bg-gray-600', isActive);
  });
};

const init = () => {
  const saved = localStorage.getItem('theme') || 'system';
  applyTheme(saved);
  updateActive(saved);

  document
    .getElementById('light')
    ?.addEventListener('click', () => setTheme('light'));
  document
    .getElementById('dark')
    ?.addEventListener('click', () => setTheme('dark'));
  document
    .getElementById('system')
    ?.addEventListener('click', () => setTheme('system'));
};

window.addEventListener('DOMContentLoaded', init);
