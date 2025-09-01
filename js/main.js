
console.log('Hello world');

// Прокрутка при кліку
const menuLinks = document.querySelectorAll('.list__link[data-goto]');

if (menuLinks.length) {
  menuLinks.forEach(link => {
    link.addEventListener('click', onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    e.preventDefault();
    const link = e.currentTarget;

    // Підготуємо коректний селектор (додамо . якщо треба)
    const raw = link.dataset.goto.trim();
    const selector = (raw.startsWith('.') || raw.startsWith('#')) ? raw : '.' + raw;

    const target = document.querySelector(selector);
    if (!target) return;

    const headerEl = document.querySelector('.header') || document.querySelector('header');
    const headerH = headerEl ? headerEl.offsetHeight : 0;

    const top = target.getBoundingClientRect().top + window.scrollY - headerH;

    // Якщо є мобільне меню – закриємо його без помилок
    if (window.menuButton && menuButton.classList.contains('_active')) {
      document.body.classList.remove('_lock');
      menuButton.classList.remove('_active');
      menuBody && menuBody.classList.remove('_active');
    }

    window.scrollTo({ top, behavior: 'smooth' });
  }
}

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

//burger 

document.addEventListener('click', function (e) {
  const target = e.target.closest('.js-burger-toggle-colapse-spin');
  if (target) {
    e.preventDefault();
    target.classList.toggle('colapse-spin');
    const mobileMenu = document.querySelector('.mobile__menu');
    mobileMenu.classList.toggle('is-open')
  }
});


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
