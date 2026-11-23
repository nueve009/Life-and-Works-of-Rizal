// Places page: map pins, region filters, and the selected-place summary.
// The cards are written in HTML, so the page remains useful without this file.
(function () {
  "use strict";

  const cards = Array.from(document.querySelectorAll(".place-card"));
  const controls = Array.from(document.querySelectorAll(".map-pin"));
  const filters = Array.from(document.querySelectorAll(".place-filter"));
  const mapTabs = Array.from(document.querySelectorAll(".map-tab"));
  const resultCount = document.getElementById("places-result-count");
  const current = document.getElementById("place-current");
  if (!cards.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const regionNames = { ph: "Philippines", abroad: "Abroad" };

  // Each outline uses a simple equirectangular projection over its box.
  // The inline positions in the HTML are a no-JS fallback; these values are
  // recalculated from the same latitude/longitude so the pins cannot drift.
  const projections = {
    ph: { minLon: 112, maxLon: 127.7, minLat: 4, maxLat: 23.5 },
    europe: { minLon: -5.5, maxLon: 15, minLat: 38, maxLat: 54.5 }
  };

  document.querySelectorAll(".map-pin[data-lat][data-lon]").forEach((pin) => {
    const projection = projections[pin.dataset.projection] || projections.ph;
    const lat = Number(pin.dataset.lat);
    const lon = Number(pin.dataset.lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return;
    const x = ((lon - projection.minLon) / (projection.maxLon - projection.minLon)) * 100;
    const y = ((projection.maxLat - lat) / (projection.maxLat - projection.minLat)) * 100;
    pin.style.setProperty("--x", `${x.toFixed(2)}%`);
    pin.style.setProperty("--y", `${y.toFixed(2)}%`);
  });

  function showMap(panelId) {
    const panel = document.getElementById(panelId);
    if (!panel) return;
    mapTabs.forEach((tab) => {
      const active = tab.dataset.map === panelId;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    document.querySelectorAll('[role="tabpanel"]').forEach((panelItem) => {
      panelItem.hidden = panelItem.id !== panelId;
    });
  }

  mapTabs.forEach((tab, index) => {
    tab.addEventListener("click", () => showMap(tab.dataset.map));
    tab.addEventListener("keydown", (event) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      const step = event.key === "ArrowRight" ? 1 : -1;
      const next = mapTabs[(index + step + mapTabs.length) % mapTabs.length];
      showMap(next.dataset.map);
      next.focus();
    });
  });

  showMap("ph-map");

  cards.forEach((card) => {
    if (!card.id) card.id = `place-${card.dataset.place}`;
    card.tabIndex = 0;
    card.addEventListener("keydown", (event) => {
      if (event.target !== card) return;
      if (event.key !== "Enter" && event.key !== " ") return;
      event.preventDefault();
      select(card.dataset.place);
    });
  });

  function countFor(region) {
    return region === "all"
      ? cards.length
      : cards.filter((card) => card.dataset.region === region).length;
  }

  filters.forEach((button) => {
    const badge = button.querySelector(".place-filter-count");
    if (badge) badge.textContent = countFor(button.dataset.region);
  });

  function select(id, options) {
    const settings = options || {};
    const card = cards.find((candidate) => candidate.dataset.place === id);
    if (!card) return false;

    showMap(card.dataset.region === "abroad" ? "eu-map" : "ph-map");

    cards.forEach((candidate) => {
      candidate.classList.toggle("is-selected", candidate === card);
    });

    controls.forEach((control) => {
      const selected = control.dataset.place === id;
      control.classList.toggle("is-selected", selected);
      control.setAttribute("aria-pressed", String(selected));
    });

    if (current) {
      const region = card.dataset.region;
      const kicker = current.querySelector(".place-current-kicker");
      const title = current.querySelector("h3");
      const summary = current.querySelector(".place-summary");
      const why = current.querySelector(".place-why");
      const links = current.querySelector(".place-links");
      const sourceLinks = card.querySelector(".place-links");

      if (kicker) {
        kicker.textContent = `${regionNames[region] || "Place"} · ${
          card.querySelector(".place-period")?.textContent.trim() || ""
        }`;
      }
      if (title && card.querySelector("h3")) {
        title.innerHTML = card.querySelector("h3").innerHTML;
      }
      if (summary) {
        summary.textContent = card.querySelector(".place-summary")?.textContent.trim() || "";
      }
      if (why) {
        why.innerHTML = card.querySelector(".place-why")?.innerHTML || "";
      }
      if (links && sourceLinks) {
        links.replaceChildren(
          ...Array.from(sourceLinks.querySelectorAll("a")).map((link) => link.cloneNode(true))
        );
      }
    }

    if (settings.scroll) {
      card.scrollIntoView({
        behavior: reducedMotion.matches ? "auto" : "smooth",
        block: "center"
      });
    }

    if (settings.updateHash !== false && window.history && window.history.replaceState) {
      window.history.replaceState(null, "", `#place-${id}`);
    }
    return true;
  }

  function applyFilter(activeButton, chooseCard) {
    const region = activeButton.dataset.region;
    const label = activeButton.childNodes[0].textContent.trim();
    const shown = [];

    cards.forEach((card) => {
      card.hidden = region !== "all" && card.dataset.region !== region;
      if (!card.hidden) shown.push(card);
    });

    filters.forEach((button) => {
      const selected = button === activeButton;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    if (resultCount) {
      resultCount.textContent = region === "all"
        ? `Showing all ${shown.length} places`
        : `Showing ${shown.length} ${label.toLowerCase()} place${shown.length === 1 ? "" : "s"}`;
    }

    if (chooseCard !== false && shown.length) {
      select(shown[0].dataset.place, { scroll: false, updateHash: false });
    }
  }

  filters.forEach((button) => {
    button.addEventListener("click", () => {
      showMap(button.dataset.region === "abroad" ? "eu-map" : "ph-map");
      applyFilter(button);
    });
  });

  controls.forEach((control) => {
    control.addEventListener("click", () => {
      const id = control.dataset.place;
      const card = cards.find((candidate) => candidate.dataset.place === id);
      if (card && card.hidden) {
        const allButton = filters.find((button) => button.dataset.region === "all");
        if (allButton) applyFilter(allButton, false);
      }
      select(id, { scroll: true });
    });
  });

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      select(card.dataset.place, { updateHash: true });
    });
  });

  applyFilter(filters[0], false);

  // Deep links work on load and when search results change the hash on this page.
  function openFromHash(scroll) {
    const hash = window.location.hash.slice(1);
    const hashId = hash.startsWith("place-") ? hash.slice(6) : hash;
    const card = cards.find((candidate) => candidate.dataset.place === hashId);
    if (!card) return false;
    if (card.hidden) {
      const allButton = filters.find((button) => button.dataset.region === "all");
      if (allButton) applyFilter(allButton, false);
    }
    return select(hashId, { scroll: Boolean(scroll), updateHash: false });
  }

  if (!openFromHash(false)) {
    select("calamba-binan", { scroll: false, updateHash: false });
  }
  window.addEventListener("hashchange", () => openFromHash(true));
})();
