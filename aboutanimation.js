document.addEventListener("DOMContentLoaded", () => {
  /*
   * IMPORTANT:
   * These are the EXACT section classes
   * from your existing about.html.
   */

  const sectionSelectors = [
    ".about-hero",
    ".story-section",
    ".visual-section",
    ".purpose-section",
    ".services-preview",
    ".about-final-cta",
  ];

  const sections = sectionSelectors
    .map((selector) => document.querySelector(selector))
    .filter(Boolean);

  if (!sections.length) {
    console.warn("Paradise About: sections not found.");

    return;
  }

  /*
   * Activate animation mode.
   */

  document.body.classList.add("pl-animation-ready");

  /*
   * =====================================================
   * CREATE THE POINT-TO-POINT LINE
   * =====================================================
   */

  const line = document.createElement("div");

  line.className = "pl-scroll-line";

  const progress = document.createElement("div");

  progress.className = "pl-scroll-progress";

  line.appendChild(progress);

  /*
   * Create one point for each actual section.
   */

  const points = [];

  sections.forEach((section) => {
    const point = document.createElement("div");

    point.className = "pl-scroll-point";

    line.appendChild(point);

    points.push(point);
  });

  document.body.appendChild(line);

  /*
   * =====================================================
   * HERO
   * =====================================================
   */

  const hero = document.querySelector(".about-hero");

  if (hero) {
    setTimeout(() => {
      hero.classList.add("pl-hero-loaded");
    }, 100);
  }

  /*
   * =====================================================
   * SECTION REVEAL
   * =====================================================
   */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("pl-active");
        }
      });
    },

    {
      threshold: 0.15,

      rootMargin: "0px 0px -10% 0px",
    },
  );

  sections.forEach((section) => {
    observer.observe(section);
  });

  /*
   * =====================================================
   * POSITION POINTS
   * =====================================================
   */

  function positionPoints() {
    const documentHeight = document.documentElement.scrollHeight;

    const viewportHeight = window.innerHeight;

    const maxScroll = Math.max(1, documentHeight - viewportHeight);

    sections.forEach((section, index) => {
      const point = points[index];

      if (!point) return;

      /*
       * Position based on actual
       * section location.
       */

      const sectionTop = section.offsetTop;

      let percentage = sectionTop / maxScroll;

      percentage = Math.max(0, Math.min(1, percentage));

      point.style.top = `${percentage * 100}%`;
    });
  }

  /*
   * =====================================================
   * FIND CURRENT SECTION
   * =====================================================
   */

  function getCurrentSection() {
    const target = window.innerHeight * 0.45;

    let current = 0;

    let smallestDistance = Infinity;

    sections.forEach((section, index) => {
      const rect = section.getBoundingClientRect();

      const distance = Math.abs(rect.top - target);

      if (distance < smallestDistance) {
        smallestDistance = distance;

        current = index;
      }
    });

    return current;
  }

  /*
   * =====================================================
   * UPDATE LINE
   * =====================================================
   */

  function updateScroll() {
    const scrollTop = window.scrollY;

    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight,
    );

    const percentage = Math.max(0, Math.min(1, scrollTop / maxScroll));

    /*
     * Green line follows scrolling.
     */

    progress.style.height = `${percentage * 100}%`;

    /*
     * Don't show the rail
     * over the hero.
     */

    if (scrollTop > window.innerHeight * 0.35) {
      line.classList.add("visible");
    } else {
      line.classList.remove("visible");
    }

    /*
     * Activate current point.
     */

    const current = getCurrentSection();

    points.forEach((point, index) => {
      point.classList.toggle("active", index === current);
    });
  }

  /*
   * =====================================================
   * PERFORMANCE
   * =====================================================
   */

  let ticking = false;

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateScroll();

          ticking = false;
        });

        ticking = true;
      }
    },
    {
      passive: true,
    },
  );

  /*
   * =====================================================
   * RESIZE
   * =====================================================
   */

  window.addEventListener("resize", () => {
    positionPoints();

    updateScroll();
  });

  /*
   * =====================================================
   * IMAGES LOADED
   * =====================================================
   */

  window.addEventListener("load", () => {
    positionPoints();

    updateScroll();
  });

  /*
   * Initial calculation.
   */

  positionPoints();

  updateScroll();

  console.log("Paradise About: cinematic scroll ready.");
});
