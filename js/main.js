// Shared, progressive enhancements used on every page.
// Everything here is optional: the site still works without JavaScript.
(function () {
  "use strict";

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  // Keep the sticky section navigation aligned below the header.
  function syncHeaderHeight() {
    const header = document.querySelector(".site-header");
    if (!header) return;
    document.documentElement.style.setProperty("--header-height", `${header.offsetHeight}px`);
  }

  // Fade sections in the first time they enter the viewport.
  function setupReveal() {
    const selector = [
      ".hero-copy",
      ".hero-portrait",
      ".intro-section",
      ".page-heading",
      ".timeline-item",
      ".detail-card",
      ".work-card",
      ".sources-panel",
      ".quiz-panel",
      ".quote-card",
      ".movie-card",
      ".place-card"
    ].join(",");
    const elements = Array.from(document.querySelectorAll(selector));
    if (!elements.length) return;

    if (!("IntersectionObserver" in window) || reducedMotion.matches) {
      elements.forEach((element) => element.classList.add("reveal", "is-revealed"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.05 });

    elements.forEach((element) => {
      element.classList.add("reveal");
      observer.observe(element);
    });
  }

  // Open content images in a lightweight, keyboard-friendly dialog.
  function setupLightbox() {
    const selector = [
      ".hero-portrait img",
      ".timeline-photo img",
      ".detail-photo img",
      ".family-portrait img",
      ".relationship-portrait img",
      ".work-image img"
    ].join(",");
    const images = Array.from(document.querySelectorAll(selector));
    if (!images.length) return;
    if (typeof document.createElement("dialog").showModal !== "function") return;

    const dialog = document.createElement("dialog");
    dialog.className = "lightbox";
    dialog.setAttribute("aria-label", "Enlarged image");
    dialog.innerHTML = [
      '<div class="lightbox-inner">',
      '  <button class="lightbox-close" type="button" aria-label="Close enlarged image">&times;</button>',
      '  <img class="lightbox-image" alt="" src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7">',
      '  <p class="lightbox-caption"></p>',
      "</div>"
    ].join("");
    document.body.append(dialog);

    const lightboxImage = dialog.querySelector(".lightbox-image");
    const caption = dialog.querySelector(".lightbox-caption");
    const closeButton = dialog.querySelector(".lightbox-close");
    let lastTrigger = null;

    function closeLightbox() {
      if (dialog.open) dialog.close();
    }

    images.forEach((image) => {
      const figure = image.closest("figure");
      const figcaption = figure ? figure.querySelector("figcaption") : null;
      const label = image.alt ? `View larger image: ${image.alt}` : "View larger image";

      image.classList.add("zoomable");
      image.setAttribute("role", "button");
      image.setAttribute("tabindex", "0");
      image.setAttribute("aria-haspopup", "dialog");
      image.setAttribute("aria-label", label);

      const openLightbox = () => {
        lastTrigger = image;
        lightboxImage.src = image.currentSrc || image.src;
        lightboxImage.alt = image.alt;
        lightboxImage.style.width = "";
        lightboxImage.style.height = "";

        // Scale small portraits up for a useful enlargement, while capping the size.
        const naturalWidth = image.naturalWidth || image.width;
        const naturalHeight = image.naturalHeight || image.height;
        const maxWidth = Math.min(window.innerWidth * .86, 1040);
        const maxHeight = Math.min(window.innerHeight * .72, 900);
        const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight, 2.5);
        if (Number.isFinite(scale) && scale > 0) {
          lightboxImage.style.width = `${Math.round(naturalWidth * scale)}px`;
          lightboxImage.style.height = `${Math.round(naturalHeight * scale)}px`;
        }

        caption.textContent = figcaption ? figcaption.textContent.trim() : "";
        caption.hidden = !caption.textContent;
        dialog.showModal();
        document.body.classList.add("lightbox-open");
        closeButton.focus();
      };

      image.addEventListener("click", openLightbox);
      image.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        openLightbox();
      });
    });

    closeButton.addEventListener("click", closeLightbox);
    dialog.addEventListener("click", (event) => {
      if (event.target === dialog) closeLightbox();
    });
    dialog.addEventListener("close", () => {
      document.body.classList.remove("lightbox-open");
      if (lastTrigger) {
        lastTrigger.focus({ preventScroll: true });
        lastTrigger = null;
      }
    });
  }

  // Show a back-to-top button once the page has been scrolled.
  function setupBackToTop() {
    const button = document.createElement("button");
    button.className = "back-to-top";
    button.type = "button";
    button.setAttribute("aria-label", "Back to top");
    button.innerHTML = '<span aria-hidden="true">\u2191</span>';
    document.body.append(button);

    let ticking = false;

    function updateVisibility() {
      ticking = false;
      button.classList.toggle("is-visible", window.scrollY > 520);
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateVisibility);
    }

    button.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: reducedMotion.matches ? "auto" : "smooth"
      });
    });

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    updateVisibility();
  }

  function init() {
    document.documentElement.classList.add("js");
    syncHeaderHeight();
    window.addEventListener("resize", syncHeaderHeight);
    setupReveal();
    setupLightbox();
    setupBackToTop();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
