// Timeline page: offset-aware smooth scrolling, scrollspy, and sticky state.
(function () {
  "use strict";

  const sectionNav = document.querySelector(".section-nav");
  if (!sectionNav) return;

  const header = document.querySelector(".site-header");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const items = Array.from(sectionNav.querySelectorAll('a[href^="#"]'))
    .map((link) => {
      const target = document.querySelector(link.getAttribute("href"));
      return target ? { link, target } : null;
    })
    .filter(Boolean);

  if (!items.length) return;

  // The sticky header and section navigation both cover the top of the page.
  function scrollOffset() {
    return (header ? header.offsetHeight : 0) + sectionNav.offsetHeight + 16;
  }

  function scrollToTarget(target, behavior) {
    const top = Math.max(0, target.getBoundingClientRect().top + window.scrollY - scrollOffset());
    window.scrollTo({
      top,
      behavior: behavior || (reducedMotion.matches ? "auto" : "smooth")
    });
  }

  // Keep the active pill visible when the section nav scrolls sideways on mobile.
  function centerNavLink(link) {
    if (sectionNav.scrollWidth <= sectionNav.clientWidth + 1) return;
    const navRect = sectionNav.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();
    const left = sectionNav.scrollLeft + (linkRect.left - navRect.left) - (navRect.width - linkRect.width) / 2;
    sectionNav.scrollTo({
      left: Math.max(0, left),
      behavior: reducedMotion.matches ? "auto" : "smooth"
    });
  }

  items.forEach(({ link, target }) => {
    link.addEventListener("click", (event) => {
      // Let modified clicks behave normally (new tab, download, etc.).
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
        return;
      }

      event.preventDefault();
      scrollToTarget(target);

      if (window.history && window.history.pushState) {
        window.history.pushState(null, "", link.getAttribute("href"));
      } else {
        window.location.hash = link.getAttribute("href");
      }

      // Move focus to the section so keyboard and screen-reader users follow along.
      target.setAttribute("tabindex", "-1");
      target.focus({ preventScroll: true });
    });
  });

  let ticking = false;
  let lastActive = null;

  function update() {
    ticking = false;

    const probe = window.scrollY + scrollOffset() + 8;
    let active = items[0];

    items.forEach((item) => {
      const top = item.target.getBoundingClientRect().top + window.scrollY;
      if (top <= probe) active = item;
    });

    // At the very bottom, make the final section the active one.
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      active = items[items.length - 1];
    }

    if (active !== lastActive) {
      lastActive = active;
      centerNavLink(active.link);
    }

    items.forEach((item) => {
      const isActive = item === active;
      item.link.classList.toggle("is-active", isActive);
      if (isActive) {
        item.link.setAttribute("aria-current", "location");
      } else {
        item.link.removeAttribute("aria-current");
      }
    });

    const headerHeight = header ? header.offsetHeight : 0;
    sectionNav.classList.toggle(
      "is-stuck",
      sectionNav.getBoundingClientRect().top <= headerHeight + 1
    );
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("popstate", () => {
    const item = items.find((entry) => entry.target.id === window.location.hash.slice(1));
    if (item) scrollToTarget(item.target);
  });
  update();

  // Opening a deep link should also clear the sticky controls.
  const initialItem = items.find((item) => item.target.id === window.location.hash.slice(1));
  if (initialItem) {
    window.requestAnimationFrame(() => scrollToTarget(initialItem.target, "auto"));
  }
})();
