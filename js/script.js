/* ==========================================================================
   Hafsa Idsaid — Portfolio
   Vanilla JS. No dependencies.
   ========================================================================== */

(() => {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ------------------------------------------------------------------
     Theme toggle (persisted, respects system preference on first visit)
  ------------------------------------------------------------------ */
  const themeToggle = document.getElementById("themeToggle");
  const root = document.documentElement;

  const applyStoredTheme = () => {
    const stored = localStorage.getItem("theme");
    if (stored === "light" || stored === "dark") {
      root.setAttribute("data-theme", stored);
    }
  };
  applyStoredTheme();

  themeToggle.addEventListener("click", () => {
    const current = root.getAttribute("data-theme") ||
      (window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next);
    localStorage.setItem("theme", next);
  });

  /* ------------------------------------------------------------------
     Mobile nav
  ------------------------------------------------------------------ */
  const burger = document.getElementById("navBurger");
  const navLinks = document.getElementById("navLinks");

  burger.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
    burger.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    document.body.style.overflow = isOpen ? "hidden" : "";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
    });
  });

  /* ------------------------------------------------------------------
     Header state + scroll progress bar
  ------------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  const progressBar = document.getElementById("scrollProgressBar");

  const onScroll = () => {
    header.classList.toggle("is-scrolled", window.scrollY > 8);

    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + "%";
  };
  document.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ------------------------------------------------------------------
     Active nav link while scrolling
  ------------------------------------------------------------------ */
  const sections = document.querySelectorAll("main section[id]");
  const navAnchors = document.querySelectorAll("[data-nav]");

  const navObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navAnchors.forEach((a) => {
            a.classList.toggle("is-active", a.getAttribute("href") === `#${id}`);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -45% 0px" }
  );
  sections.forEach((section) => navObserver.observe(section));

  /* ------------------------------------------------------------------
     Reveal-on-scroll animations
  ------------------------------------------------------------------ */
  const revealTargets = document.querySelectorAll(".reveal");

  if (prefersReducedMotion) {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("is-visible"), i * 60);
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    revealTargets.forEach((el) => revealObserver.observe(el));
  }

  /* ------------------------------------------------------------------
     Projects data + render
     Add `github` / `demo` URLs here once repos are public — the
     buttons render automatically only when a URL is present.
  ------------------------------------------------------------------ */
  const PROJECTS = [
    {
      name: "Go Bus",
      badge: "Internship · Ejahiz",
      mark: "GB",
      image: "assets/images/projects/gobus.png",
      imageFit: "contain",
      gradient: "linear-gradient(135deg, #9cb380, #d9a066)",
      description:
        "A bus-ticket booking platform modeled from UML use-case, sequence and class diagrams before a line of code was written. Riders search trips, pick a seat, and pay by PayPal; admins manage routes, schedules and reservations from a dedicated dashboard.",
      tags: ["Laravel", "MySQL", "Tailwind CSS", "JavaScript", "PayPal API", "UML"],
      github: null,
      demo: null,
    },
    {
      name: "E-Commerce Platform",
      badge: "Graduation Project (PFE)",
      mark: "EC",
      image: "assets/images/projects/ecommerce_store.png",
      imageFit: "contain",
      gradient: "linear-gradient(135deg, #7f9a6a, #b7cf9c)",
      description:
        "A complete e-commerce platform built solo for my graduation project — product catalogue, shopping cart, order management, user authentication and an admin panel. Defended before an academic jury and awarded top marks.",
      tags: ["PHP", "Laravel", "MySQL", "HTML/CSS/JS"],
      github: null,
      demo: null,
    },
    {
      name: "Ejahiz Caisse",
      badge: "Internship · Ejahiz",
      mark: "EJ",
      image: "assets/images/projects/ejahiz-caisse.webp",
      imageFit: "contain",
      gradient: "linear-gradient(135deg, #253e67, #d9a066)",
      description:
        "A bilingual (French/English) marketing site for Ejahiz's point-of-sale product. I owned the visual design system — colors, typography, layout — and the full Laravel front-end implementation, fully responsive across devices.",
      tags: ["Laravel", "Tailwind CSS", "JavaScript", "i18n"],
      github: null,
      demo: "https://caisse.ejahiz.ma/",
      demoLabel: "Visit website",
    },
    {
      name: "Manzakine",
      badge: "Internship · Ejahiz",
      mark: "MZ",
      image: "assets/images/projects/manzakine.webp",
      imageFit: "contain",
      gradient: "linear-gradient(135deg, #d9a066, #9cb380)",
      description:
        "An e-commerce storefront for a copper-jewelry brand, built with a focus on clean navigation and a smooth mobile shopping experience from browsing to checkout.",
      tags: ["Laravel", "Tailwind CSS", "JavaScript"],
      github: null,
      demo: null,
    },
  ];

  const iconGithub =
    '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.09 3.29 9.4 7.86 10.93.58.1.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.34-1.28-1.69-1.28-1.69-1.04-.72.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.56-.29-5.25-1.28-5.25-5.7 0-1.26.45-2.29 1.19-3.09-.12-.29-.52-1.47.11-3.06 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.77.12 3.06.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.4-5.26 5.69.42.36.78 1.07.78 2.16 0 1.56-.01 2.82-.01 3.2 0 .31.2.67.8.56A10.51 10.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>';
  const iconExternal =
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3"/></svg>';

  const projectsGrid = document.getElementById("projectsGrid");

  const renderProjects = () => {
    const html = PROJECTS.map((project) => {
      const links = [];
      if (project.github) {
        links.push(
          `<a href="${project.github}" target="_blank" rel="noopener noreferrer">${iconGithub}<span>Code</span></a>`
        );
      }
      if (project.demo) {
        links.push(
          `<a href="${project.demo}" target="_blank" rel="noopener noreferrer">${iconExternal}<span>${project.demoLabel || "Live demo"}</span></a>`
        );
      }

      const imageClass = project.imageFit === "contain"
        ? "project-card__img project-card__img--contain"
        : "project-card__img";
      const preview = project.image
        ? `<img class="${imageClass}" src="${project.image}" alt="${project.name} application screenshot" loading="lazy" width="1100" height="683">`
        : `<span class="project-card__mark">${project.mark}</span>`;

      return `
        <article class="project-card reveal">
          <div class="project-card__preview" style="--project-gradient:${project.gradient}">
            ${preview}
          </div>
          <div class="project-card__body">
            <div class="project-card__top">
              <h3>${project.name}</h3>
              <span class="project-card__badge">${project.badge}</span>
            </div>
            <p class="project-card__desc">${project.description}</p>
            <div class="project-card__tags">
              ${project.tags.map((t) => `<span>${t}</span>`).join("")}
            </div>
            ${links.length ? `<div class="project-card__links">${links.join("")}</div>` : ""}
          </div>
        </article>
      `;
    }).join("");

    projectsGrid.innerHTML = html;

    // Re-observe newly injected reveal elements
    projectsGrid.querySelectorAll(".reveal").forEach((el) => {
      if (prefersReducedMotion) {
        el.classList.add("is-visible");
      } else {
        const obs = new IntersectionObserver(
          (entries, o) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
                o.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
        );
        obs.observe(el);
      }
    });
  };

  renderProjects();

  /* ------------------------------------------------------------------
     Magnetic contact button
  ------------------------------------------------------------------ */
  const magneticBtn = document.getElementById("magneticBtn");

  if (magneticBtn && !prefersReducedMotion && window.matchMedia("(pointer: fine)").matches) {
    magneticBtn.addEventListener("mousemove", (e) => {
      const rect = magneticBtn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      magneticBtn.style.transform = `translate(${x * 0.18}px, ${y * 0.35}px)`;
    });
    magneticBtn.addEventListener("mouseleave", () => {
      magneticBtn.style.transform = "translate(0, 0)";
    });
  }

  /* ------------------------------------------------------------------
     Footer year
  ------------------------------------------------------------------ */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
