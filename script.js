document.getElementById("year").textContent = new Date().getFullYear();

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const revealItems = document.querySelectorAll(".reveal");
if (reduceMotion) {
  revealItems.forEach(item => item.classList.add("visible"));
} else {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
}



const cursorGlow = document.querySelector(".brillo-raton");
if (cursorGlow && !reduceMotion && window.matchMedia("(pointer:fine)").matches) {
  window.addEventListener("pointermove", event => {
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
    cursorGlow.style.opacity = "1";
  }, { passive: true });
  document.addEventListener("mouseleave", () => cursorGlow.style.opacity = "0");
}

const visor = document.getElementById("visor-imagen");
const visorImagen = visor.querySelector("img");
const closeLightbox = () => {
  visor.classList.remove("open");
  visor.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
};

document.querySelectorAll("[data-visor-imagen]").forEach(button => {
  button.addEventListener("click", () => {
    visorImagen.src = button.getAttribute("data-visor-imagen");
    visorImagen.alt = button.querySelector("img").alt;
    visor.classList.add("open");
    visor.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });
});
visor.querySelector(".visor-cerrar").addEventListener("click", closeLightbox);
visor.addEventListener("click", event => { if (event.target === visor) closeLightbox(); });
document.addEventListener("keydown", event => { if (event.key === "Escape") closeLightbox(); });

/* Active navigation */
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll(".nav nav a")];
const navObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    navLinks.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`));
  });
}, { rootMargin: "-35% 0px -55% 0px", threshold: 0 });
sections.forEach(section => navObserver.observe(section));

/* Smooth anchor offset for sticky navigation */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    const y = target.getBoundingClientRect().top + window.scrollY - 78;
    window.scrollTo({ top: y, behavior: reduceMotion ? "auto" : "smooth" });
  });
});
const secciones = document.querySelectorAll(
    "#sobre-mi, #proyectos, #experiencia, #contacto, #repositorio-publico, #dest"
);

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("mostrar");

            observer.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.2
});

secciones.forEach((seccion) => {
    observer.observe(seccion);
});