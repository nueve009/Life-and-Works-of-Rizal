// Theme filters and the random-quote button for the Own Words page.
// The quotations are written in HTML so the page still works without this file.
(function () {
  "use strict";

  const cards = Array.from(document.querySelectorAll(".quote-card"));
  if (!cards.length) return;

  const filters = Array.from(document.querySelectorAll(".quote-filter"));
  const resultCount = document.getElementById("quote-count");
  const randomButton = document.getElementById("random-quote");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function countFor(theme) {
    return theme === "all"
      ? cards.length
      : cards.filter((card) => card.dataset.theme === theme).length;
  }

  // Keep the numbers in the buttons accurate even if a card is added later.
  filters.forEach((button) => {
    const badge = button.querySelector(".quote-filter-count");
    if (badge) badge.textContent = countFor(button.dataset.filter);
  });

  function visibleCards() {
    return cards.filter((card) => !card.hidden);
  }

  function applyFilter(activeButton) {
    const theme = activeButton.dataset.filter;
    const label = activeButton.childNodes[0].textContent.trim();
    const shown = [];

    cards.forEach((card) => {
      card.hidden = theme !== "all" && card.dataset.theme !== theme;
      card.classList.remove("is-random");
      if (!card.hidden) shown.push(card);
    });

    filters.forEach((button) => {
      const selected = button === activeButton;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (resultCount) {
      resultCount.textContent = theme === "all"
        ? `Showing all ${shown.length} quotations`
        : `Showing ${shown.length} ${label.toLowerCase()} quotation${shown.length === 1 ? "" : "s"}`;
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button));
  });

  if (randomButton) {
    randomButton.addEventListener("click", () => {
      const pool = visibleCards();
      if (!pool.length) return;

      const chosen = pool[Math.floor(Math.random() * pool.length)];
      cards.forEach((card) => card.classList.remove("is-random"));
      chosen.classList.add("is-random");
      chosen.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "center"
      });
      chosen.setAttribute("tabindex", "-1");
      chosen.focus({ preventScroll: true });
      window.setTimeout(() => chosen.classList.remove("is-random"), 1200);
    });
  }
})();
