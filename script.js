'use strict';

const VARIANT = 9;
const COMMENTS_URL = `https://jsonplaceholder.typicode.com/posts/${VARIANT}/comments`;
const MODAL_DELAY_MS = 60 * 1000;
const DAY_START_HOUR = 7;
const NIGHT_START_HOUR = 21;

function collectSystemInfo() {
  const nav = window.navigator;
  return {
    userAgent: nav.userAgent,
    platform: nav.userAgentData?.platform || nav.platform || 'unknown',
    language: nav.language,
    languages: (nav.languages || []).join(', '),
    cookieEnabled: nav.cookieEnabled,
    onLine: nav.onLine,
    hardwareConcurrency: nav.hardwareConcurrency ?? 'unknown',
    deviceMemory: nav.deviceMemory ? `${nav.deviceMemory} GB` : 'unknown',
    screen: `${window.screen.width}x${window.screen.height}`,
    viewport: `${window.innerWidth}x${window.innerHeight}`,
    colorDepth: window.screen.colorDepth,
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    savedAt: new Date().toLocaleString(),
  };
}

function saveSystemInfo() {
  localStorage.setItem('systemInfo', JSON.stringify(collectSystemInfo()));
}

function renderLocalStorage() {
  const list = document.getElementById('storage-list');
  list.innerHTML = '';

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const raw = localStorage.getItem(key);

    let value;
    try {
      value = JSON.parse(raw);
    } catch {
      value = raw;
    }

    if (value !== null && typeof value === 'object') {
      Object.entries(value).forEach(([subKey, subValue]) => {
        appendStorageRow(list, `${key}.${subKey}`, subValue);
      });
    } else {
      appendStorageRow(list, key, value);
    }
  }
}

function appendStorageRow(list, key, value) {
  const dt = document.createElement('dt');
  dt.textContent = key;
  const dd = document.createElement('dd');
  dd.textContent = String(value);
  list.append(dt, dd);
}

async function loadReviews() {
  const status = document.getElementById('reviews-status');
  const list = document.getElementById('reviews-list');

  try {
    const response = await fetch(COMMENTS_URL);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const comments = await response.json();

    comments.forEach((comment) => {
      const item = document.createElement('li');
      item.className = 'review-card';

      const title = document.createElement('h3');
      title.textContent = comment.name;

      const author = document.createElement('a');
      author.className = 'review-author';
      author.href = `mailto:${comment.email}`;
      author.textContent = comment.email;

      const body = document.createElement('p');
      body.textContent = comment.body;

      item.append(title, author, body);
      list.append(item);
    });

    status.hidden = true;
  } catch (error) {
    console.error('Failed to load reviews:', error);
    status.textContent = 'Could not load reviews. Please try again later.';
    status.classList.add('form-status-error');
  }
}

function initFeedbackModal() {
  const modal = document.getElementById('feedback-modal');
  const closeButton = document.getElementById('modal-close');

  function openModal() {
    if (sessionStorage.getItem('feedbackModalShown')) return;
    modal.hidden = false;
    document.body.classList.add('modal-open');
    document.getElementById('name').focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove('modal-open');
    sessionStorage.setItem('feedbackModalShown', 'true');
  }

  setTimeout(openModal, MODAL_DELAY_MS);

  closeButton.addEventListener('click', closeModal);

  modal.addEventListener('click', (event) => {
    if (event.target === modal) closeModal();
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !modal.hidden) closeModal();
  });
}

function getThemeByTime(date = new Date()) {
  const hours = date.getHours();
  return hours >= DAY_START_HOUR && hours < NIGHT_START_HOUR ? 'light' : 'dark';
}

function initThemeToggle() {
  const button = document.getElementById('theme-toggle');
  const root = document.documentElement;
  let manualOverride = false;

  function applyTheme(theme) {
    root.setAttribute('data-theme', theme);
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.textContent = theme === 'dark' ? '☀️ Day mode' : '🌙 Night mode';
  }

  applyTheme(getThemeByTime());

  setInterval(() => {
    if (!manualOverride) applyTheme(getThemeByTime());
  }, 60 * 1000);

  button.addEventListener('click', () => {
    manualOverride = true;
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
  });
}

function initSkillsFilter() {
  const input = document.getElementById('skills-filter');
  const list = document.getElementById('skills-list');
  const emptyState = document.getElementById('skills-empty');
  const items = Array.from(list.querySelectorAll('li'));

  input.addEventListener('input', () => {
    const query = input.value.trim().toLowerCase();
    let visibleCount = 0;

    items.forEach((item) => {
      const matches = item.textContent.toLowerCase().includes(query);
      item.hidden = !matches;
      if (matches) visibleCount += 1;
    });

    emptyState.hidden = visibleCount !== 0;
  });
}

function initExperienceToggles() {
  document.querySelectorAll('.toggle-desc').forEach((button) => {
    const description = button.previousElementSibling;
    description.classList.add('collapsed');

    button.addEventListener('click', () => {
      const isCollapsed = description.classList.toggle('collapsed');
      button.textContent = isCollapsed ? 'Show more' : 'Show less';
    });
  });
}

function initCurrentYear() {
  document.getElementById('current-year').textContent = new Date().getFullYear();
}

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  saveSystemInfo();
  renderLocalStorage();
  loadReviews();
  initFeedbackModal();
  initSkillsFilter();
  initExperienceToggles();
  initCurrentYear();
});
