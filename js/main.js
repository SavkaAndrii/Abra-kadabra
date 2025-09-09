
console.log('Hello world');

// === Burger toggle + smooth scroll (one place) ===
(() => {
  const burgerBtn = document.querySelector('.js-burger-toggle-colapse-spin');
  const mobileMenu = document.querySelector('.mobile__menu');
  const headerEl = document.querySelector('.header') || document.querySelector('header');

  // Відкрити/закрити мобільне меню
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.js-burger-toggle-colapse-spin');
    if (!btn) return;
    e.preventDefault();
    btn.classList.toggle('colapse-spin');
    mobileMenu?.classList.toggle('is-open');
  });

  // Плавний скрол по кліку на пункти меню (desktop + mobile)
  document.addEventListener('click', (e) => {
    const link = e.target.closest('.list__link[data-goto]');
    if (!link) return;

    e.preventDefault();

    // Підготуємо селектор цільової секції
    const raw = (link.dataset.goto || '').trim();
    const selector = (raw.startsWith('.') || raw.startsWith('#')) ? raw : `.${raw}`;
    const target = document.querySelector(selector);
    if (!target) return;

    const headerH = headerEl ? headerEl.offsetHeight : 0;
    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    // Закриваємо мобільне меню (якщо відкрите)
    mobileMenu?.classList.remove('is-open');
    burgerBtn?.classList.remove('colapse-spin');

    window.scrollTo({ top, behavior: 'smooth' });
  });
})();

//language

const languages = ["pl", "ua", "en"];
const langBtn = document.getElementById("lang-toggle");

// Визначити поточну мову
let currentLang = localStorage.getItem("lang") || "pl";
let currentLangIndex = languages.indexOf(currentLang);

// Функція перемикання мови через data-lang-*
function updateContent(lang) {
  langBtn.textContent = lang.toUpperCase();

  document.querySelectorAll("[data-lang-" + lang + "]").forEach(el => {
    const text = el.getAttribute("data-lang-" + lang);
    if (text) el.textContent = text;
  });
}

// Ініціалізація
updateContent(currentLang);

// Обробник кнопки
langBtn.addEventListener("click", () => {
  currentLangIndex = (currentLangIndex + 1) % languages.length;
  currentLang = languages[currentLangIndex];
  localStorage.setItem("lang", currentLang);
  updateContent(currentLang);
});


// end language


// ========= GSAP ========

// gsap.registerPlugin(ScrollTrigger);

gsap.registerPlugin(ScrollTrigger);

// Анімація фонового зображення: піднімається і зникає
gsap.to(".main-screen__img", {
  // y: -10,          // трохи піднімається
  opacity: 0,       // поступово зникає
  ease: "none",
  scrollTrigger: {
    trigger: ".main-screen",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});

// Текст: просто піднімається при скролі
gsap.to(".main-screen__content", {
  y: -100,
  ease: "none",
  scrollTrigger: {
    trigger: ".main-screen",
    start: "top top",
    end: "bottom top",
    scrub: true,
  },
});
