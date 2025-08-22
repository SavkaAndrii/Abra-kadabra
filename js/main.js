
console.log('Hello world');

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