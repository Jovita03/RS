// Menú móvil
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  navToggle.classList.toggle("open", isOpen);
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

// Cerrar menú al hacer clic en un enlace
nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    navToggle.classList.remove("open");
    navToggle.setAttribute("aria-expanded", "false");
  });
});

// Sombra del header al hacer scroll
const header = document.getElementById("header");
window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 10);
});

// Animaciones al revelar elementos
const revealEls = document.querySelectorAll(
  ".servicio, .testimonio, .nosotros-text, .nosotros-media, .contacto-info, .contacto-form-wrap, .section-head"
);
revealEls.forEach((el) => el.classList.add("reveal"));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);
revealEls.forEach((el) => observer.observe(el));

// Validación del formulario de contacto
const form = document.getElementById("contactForm");
const status = document.getElementById("formStatus");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = form.nombre.value.trim();
  const correo = form.correo.value.trim();
  const mensaje = form.mensaje.value.trim();
  const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo);

  if (!nombre || !correo || !mensaje) {
    status.textContent = "Por favor completa todos los campos obligatorios.";
    status.className = "form-status err";
    return;
  }
  if (!emailOk) {
    status.textContent = "Ingresa un correo electrónico válido.";
    status.className = "form-status err";
    return;
  }

  status.textContent = `¡Gracias, ${nombre}! Hemos recibido tu mensaje. Te contactaremos pronto.`;
  status.className = "form-status ok";
  form.reset();
});