(function () {
  'use strict';

  const root = document.documentElement;
  const themeToggleButton = document.getElementById('themeToggle');
  const navToggleButton = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.site-nav');
  const yearEl = document.getElementById('year');

  // -- Year
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // -- Theme (auto/light/dark)
  const THEME_KEY = 'theme-preference';
  const getSystemPrefersDark = () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const getStoredTheme = () => localStorage.getItem(THEME_KEY);
  const setStoredTheme = (value) => localStorage.setItem(THEME_KEY, value);

  function applyTheme(theme) {
    // theme: 'light' | 'dark' | 'auto'
    const desired = theme === 'auto' ? (getSystemPrefersDark() ? 'dark' : 'light') : theme;
    root.setAttribute('data-theme', desired);
    if (themeToggleButton) {
      themeToggleButton.querySelector('.theme-icon').textContent = desired === 'dark' ? '☀️' : '🌙';
      themeToggleButton.setAttribute('aria-label', `Switch to ${desired === 'dark' ? 'light' : 'dark'} theme`);
      themeToggleButton.setAttribute('title', `Switch to ${desired === 'dark' ? 'light' : 'dark'} theme`);
    }
  }

  // Initialize theme
  (function initTheme() {
    const stored = getStoredTheme();
    if (!stored) {
      // First visit: respect system preference
      root.setAttribute('data-theme', getSystemPrefersDark() ? 'dark' : 'light');
      setStoredTheme('auto');
    } else {
      applyTheme(stored);
    }
  })();

  if (themeToggleButton) {
    themeToggleButton.addEventListener('click', function () {
      const current = getStoredTheme() || 'auto';
      const next = current === 'auto' ? (root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark') : (current === 'dark' ? 'light' : 'dark');
      setStoredTheme(next);
      applyTheme(next);
    });
  }

  // React to system changes if user preference is 'auto'
  try {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    media.addEventListener('change', () => {
      if ((getStoredTheme() || 'auto') === 'auto') applyTheme('auto');
    });
  } catch (e) { /* older browsers */ }

  // -- Mobile nav
  if (navToggleButton && nav) {
    navToggleButton.addEventListener('click', function () {
      const expanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('open');
    });

    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        navToggleButton.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // -- Project filters
  const filterButtons = Array.from(document.querySelectorAll('.filter-btn'));
  const projectCards = Array.from(document.querySelectorAll('.project'));

  function setActiveFilterButton(button) {
    filterButtons.forEach((b) => b.classList.toggle('active', b === button));
  }

  function filterProjects(tag) {
    const normalized = tag.toLowerCase();
    projectCards.forEach((card) => {
      const tags = (card.getAttribute('data-tags') || '').toLowerCase();
      const matches = normalized === 'all' || tags.split(/\s+/).includes(normalized);
      card.style.display = matches ? '' : 'none';
    });
  }

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', function () {
      setActiveFilterButton(this);
      filterProjects(this.getAttribute('data-filter'));
    });
  });
})();

