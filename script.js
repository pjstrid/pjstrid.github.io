// Keep the footer year current.
const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// Highlight the nav link for the section currently in view.
const navLinks = Array.from(document.querySelectorAll("header.site-header nav a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

if ("IntersectionObserver" in window && sections.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const id = entry.target.id;
        navLinks.forEach((link) => {
          link.classList.toggle(
            "is-active",
            link.getAttribute("href") === `#${id}`
          );
        });
      });
    },
    { rootMargin: "-40% 0px -55% 0px" }
  );

  sections.forEach((section) => observer.observe(section));
}

/* ---------------------------------------------------------------------------
   Language toggle (Swedish <-> English)
   The Swedish text lives in the HTML and is the source of truth. English
   strings are defined here and keyed by the data-i18n* attributes.
--------------------------------------------------------------------------- */

const EN = {
  "doc.title": "Jonathan Strid — Mobile App Development Student",
  "doc.description":
    "Portfolio for Jonathan Strid, mobile app development student. Projects in iOS/SwiftUI, Android/Kotlin and Java.",

  "nav.about": "About",
  "nav.skills": "Skills",
  "nav.projects": "Projects",
  "nav.github": "GitHub",
  "nav.contact": "Contact",

  "hero.eyebrow": "Portfolio",
  "hero.title": "Jonathan Strid —<br>Mobile App Development Student",
  "hero.lead":
    "I'm a mobile app development student with completed courses in iOS/SwiftUI, Android/Kotlin, Java and Agile methods. I focus on clean code, clear structure and building user-friendly, modern solutions. Welcome!",
  "hero.cta_projects": "See my projects",
  "hero.cta_contact": "Contact me",

  "skills.title": "Skills",
  "skills.languages": "Languages",
  "skills.some_experience": "Some experience with",
  "skills.backend": "Backend",
  "skills.tools": "Tools & platforms",

  "projects.title": "Projects",
  "project.vmtipset.desc":
    "A hobby project in HTML, built together with Claude. A website with a table and results for a World Cup prediction game with friends and family.",
  "project.quiz.desc":
    'A hobby project, built in Kotlin. A homemade quiz with a "live update" feature.',
  "project.snusless.desc":
    "A group school project, built in Swift. An app for people trying to quit snus.",
  "project.cardgame.desc":
    "A school project, built in Kotlin. An app with a fun card game.",
  "project.runnest.desc":
    "A demo app project hosted on Vercel, built together with Claude.",
  "project.more.title": "More projects",
  "project.more.desc": "See more projects on GitHub",
  "repo.link": "View on GitHub →",

  "activity.title": "GitHub activity",
  "activity.note":
    'Updated automatically from my commits on <a href="https://github.com/pjstrid" target="_blank" rel="noopener">GitHub</a>.',
  "activity.alt":
    "GitHub chart of Jonathan's contributions/commits over the past year",

  "photo.alt": "Portrait photo of Jonathan Strid",

  "contact.title": "Contact",
  "contact.lead":
    "Feel free to get in touch if you'd like to discuss a project or just say hi.",
};

const langToggle = document.getElementById("lang-toggle");

if (langToggle) {
  // Snapshot the original Swedish content so we can switch back.
  const sv = {};
  const capture = (selector, key, read) => {
    document.querySelectorAll(selector).forEach((el) => {
      const k = el.getAttribute(key);
      if (k != null && !(k in sv)) sv[k] = read(el);
    });
  };
  capture("[data-i18n]", "data-i18n", (el) => el.innerHTML);
  capture("[data-i18n-alt]", "data-i18n-alt", (el) => el.getAttribute("alt"));
  capture("[data-i18n-content]", "data-i18n-content", (el) =>
    el.getAttribute("content")
  );

  const dict = { sv, en: EN };

  const applyLang = (lang) => {
    const table = dict[lang] || sv;
    const pick = (key) => (key in table ? table[key] : sv[key]);

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.innerHTML = pick(el.getAttribute("data-i18n"));
    });
    document.querySelectorAll("[data-i18n-alt]").forEach((el) => {
      el.setAttribute("alt", pick(el.getAttribute("data-i18n-alt")));
    });
    document.querySelectorAll("[data-i18n-content]").forEach((el) => {
      el.setAttribute("content", pick(el.getAttribute("data-i18n-content")));
    });

    document.documentElement.lang = lang;
    langToggle.textContent = lang === "sv" ? "EN" : "SV";
    langToggle.setAttribute(
      "aria-label",
      lang === "sv" ? "Switch to English" : "Byt till svenska"
    );

    try {
      localStorage.setItem("lang", lang);
    } catch (e) {
      /* ignore storage errors */
    }
  };

  let current = "sv";
  try {
    const saved = localStorage.getItem("lang");
    if (saved === "en" || saved === "sv") current = saved;
  } catch (e) {
    /* ignore storage errors */
  }
  if (current !== "sv") applyLang(current);
  else langToggle.textContent = "EN";

  langToggle.addEventListener("click", () => {
    current = current === "sv" ? "en" : "sv";
    applyLang(current);
  });
}
