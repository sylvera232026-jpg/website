// =========================================================
// Mobile navigation toggle
// =========================================================
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');

if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  // Close the mobile menu after a link is chosen
  mobileNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', 'Open menu');
    });
  });
}

// =========================================================
// Subtle one-time reveal on scroll (restrained, no per-card bounce)
// =========================================================
const revealTargets = document.querySelectorAll('.section');
revealTargets.forEach((el) => el.classList.add('section-reveal'));

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealTargets.forEach((el) => observer.observe(el));
} else {
  revealTargets.forEach((el) => el.classList.add('is-visible'));
}

// =========================================================
// Contact form validation
// =========================================================
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

function setError(fieldId, message) {
  const errorEl = document.getElementById(`err-${fieldId}`);
  if (errorEl) errorEl.textContent = message || '';
}

function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^[0-9+\-\s()]{7,15}$/.test(value);
}

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    formStatus.textContent = '';

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    let valid = true;

    if (!name) {
      setError('name', 'Please enter your name.');
      valid = false;
    } else {
      setError('name', '');
    }

    if (!email) {
      setError('email', 'Please enter your email address.');
      valid = false;
    } else if (!isValidEmail(email)) {
      setError('email', 'Please enter a valid email address.');
      valid = false;
    } else {
      setError('email', '');
    }

    if (!phone) {
      setError('phone', 'Please enter your phone number.');
      valid = false;
    } else if (!isValidPhone(phone)) {
      setError('phone', 'Please enter a valid phone number.');
      valid = false;
    } else {
      setError('phone', '');
    }

    if (!message) {
      setError('message', 'Please add a short message.');
      valid = false;
    } else {
      setError('message', '');
    }

    if (!valid) {
      formStatus.textContent = 'Please review the fields above.';
      formStatus.style.color = '#B3261E';
      return;
    }

    // NOTE: No backend is connected yet. Wire this up to a form
    // service (e.g. Formspree, EmailJS) or your own API endpoint
    // before going live. See README.md for details.
    formStatus.style.color = '#1C7C74';
    formStatus.textContent = 'Thank you — your message has been noted. We will get back to you shortly.';
    form.reset();
  });
}
