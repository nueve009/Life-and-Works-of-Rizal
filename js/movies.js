// Kind-of-film filters for the Rizal on Screen page.
// The cards are written in HTML, so the page still works without this file.
(function () {
  "use strict";

  const cards = Array.from(document.querySelectorAll(".movie-card"));
  if (!cards.length) return;

  const filters = Array.from(document.querySelectorAll(".movie-filter"));
  const resultCount = document.getElementById("movie-count");

  function countFor(type) {
    return type === "all"
      ? cards.length
      : cards.filter((card) => card.dataset.type === type).length;
  }

  // Keep the badges accurate if another card is added later.
  filters.forEach((button) => {
    const badge = button.querySelector(".movie-filter-count");
    if (badge) badge.textContent = countFor(button.dataset.filter);
  });

  function applyFilter(activeButton) {
    const type = activeButton.dataset.filter;
    const label = activeButton.childNodes[0].textContent.trim();
    const shown = [];

    cards.forEach((card) => {
      card.hidden = type !== "all" && card.dataset.type !== type;
      if (!card.hidden) shown.push(card);
    });

    filters.forEach((button) => {
      const selected = button === activeButton;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (resultCount) {
      resultCount.textContent = type === "all"
        ? `Showing all ${shown.length} films`
        : `Showing ${shown.length} ${label.toLowerCase()} film${shown.length === 1 ? "" : "s"}`;
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => applyFilter(button));
  });
})();
