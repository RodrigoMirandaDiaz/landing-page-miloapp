const header = document.getElementById('main-header');

window.addEventListener('scroll', () => {
header.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

/* ============================================================
2. HAMBURGER MENU TOGGLE (mobile)
============================================================ */
const hamburger = document.getElementById('hamburger');
const mainNav   = document.getElementById('main-nav');

hamburger.addEventListener('click', () => {
const isOpen = mainNav.classList.toggle('open');
hamburger.classList.toggle('open', isOpen);
hamburger.setAttribute('aria-expanded', isOpen);
});

// Close nav when a link is clicked
mainNav.querySelectorAll('a').forEach(link => {
link.addEventListener('click', () => {
    mainNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
});
});

/* ============================================================
3. ACTIVE NAV LINK ON SCROLL
============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

const observerOptions = {
root: null,
rootMargin: '-40% 0px -55% 0px',
threshold: 0
};

const sectionObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    navLinks.forEach(link => {
        link.classList.toggle(
        'active',
        link.getAttribute('href') === '#' + entry.target.id
        );
    });
    }
});
}, observerOptions);

sections.forEach(sec => sectionObserver.observe(sec));

/* ============================================================
4. SCROLL REVEAL ANIMATION
============================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
entries.forEach(entry => {
    if (entry.isIntersecting) {
    entry.target.classList.add('visible');
    revealObserver.unobserve(entry.target); // once only
    }
});
}, { threshold: 0.12 });

revealElements.forEach(el => revealObserver.observe(el));

/* ============================================================
5. SCROLL TO TOP BUTTON
============================================================ */
const scrollTopBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

scrollTopBtn.addEventListener('click', () => {
window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ============================================================
6. CONTACT FORM VALIDATION & SUBMISSION
============================================================ */
const contactForm  = document.getElementById('contact-form');
const formSuccess  = document.getElementById('form-success');

/**
 * Validates a single field.
 * @param {HTMLElement} field  - The input/textarea element.
 * @param {string}      errorId - The ID of the error paragraph.
 * @param {Function}    [customCheck] - Optional extra validation fn.
 * @returns {boolean}
 */
function validateField(field, errorId, customCheck) {
const errorEl = document.getElementById(errorId);
const isEmpty  = field.value.trim() === '';

// Custom check (e.g. email format)
const customFail = customCheck ? !customCheck(field.value.trim()) : false;

if (isEmpty || customFail) {
    field.classList.add('error');
    errorEl.classList.add('show');
    return false;
}

field.classList.remove('error');
errorEl.classList.remove('show');
return true;
}

/** Simple email regex */
function isValidEmail(val) {
return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
}

// Real-time inline validation (on blur)
document.getElementById('nombre').addEventListener('blur', function () {
validateField(this, 'nombre-error');
});
document.getElementById('email').addEventListener('blur', function () {
validateField(this, 'email-error', isValidEmail);
});
document.getElementById('comentario').addEventListener('blur', function () {
validateField(this, 'comentario-error');
});

// Form submit
contactForm.addEventListener('submit', function (e) {
e.preventDefault();

const nombreOk    = validateField(document.getElementById('nombre'),    'nombre-error');
const emailOk     = validateField(document.getElementById('email'),     'email-error', isValidEmail);
const comentOk    = validateField(document.getElementById('comentario'), 'comentario-error');

if (!nombreOk || !emailOk || !comentOk) {
    // Focus the first invalid field for accessibility
    const firstError = contactForm.querySelector('.error');
    if (firstError) firstError.focus();
    return;
}

// All valid → show success
contactForm.style.display = 'none';
formSuccess.classList.add('show');

// Reset form for potential re-use
contactForm.reset();
});