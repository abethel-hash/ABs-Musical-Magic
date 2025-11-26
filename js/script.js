document.addEventListener('DOMContentLoaded', function () {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const themeToggle = document.getElementById('theme-toggle');
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const saved = localStorage.getItem('site-theme');
  const root = document.documentElement;

  function applyTheme(mode) {
    if (mode === 'light') {
      root.classList.add('light-mode');
      themeToggle.setAttribute('aria-pressed', 'false');
      themeToggle.textContent = '🌙';
    } else {
      root.classList.remove('light-mode');
      themeToggle.setAttribute('aria-pressed', 'true');
      themeToggle.textContent = '☀️';
    }
  }

  if (saved) applyTheme(saved === 'light' ? 'light' : 'dark'); else applyTheme(prefersDark ? 'dark' : 'dark');

  themeToggle.addEventListener('click', function () {
    const isLight = root.classList.contains('light-mode');
    const target = isLight ? 'dark' : 'light';
    applyTheme(target);
    localStorage.setItem('site-theme', target);
  });

  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const message = document.getElementById('message');
      const nameError = document.getElementById('nameError');
      const emailError = document.getElementById('emailError');
      const messageError = document.getElementById('messageError');
      let valid = true;
      nameError.textContent = '';
      emailError.textContent = '';
      messageError.textContent = '';

      if (!name.value.trim() || name.value.trim().length < 2) { nameError.textContent = 'Please enter your name.'; valid = false; }
      const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(email.value.trim())) { emailError.textContent = 'Please enter a valid email.'; valid = false; }
      if (!message.value.trim() || message.value.trim().length < 10) { messageError.textContent = 'Message must be at least 10 characters.'; valid = false; }

      if (valid) {
        contactForm.reset();
        const success = document.getElementById('formSuccess');
        if (success) { success.classList.remove('d-none'); setTimeout(()=> success.classList.add('d-none'), 4500); }
      }
    });
  }

  const lightboxModal = document.getElementById('lightboxModal');
  if (lightboxModal) {
    document.querySelectorAll('a[data-bs-toggle="modal"]').forEach(link => {
      link.addEventListener('click', function (e) {
        const img = this.querySelector('img') || this;
        const src = this.getAttribute('href') || img.getAttribute('src');
        const box = document.getElementById('lightboxImage');
        if (box) box.src = src;
      });
    });
  }
});
