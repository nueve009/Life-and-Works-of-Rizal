// Site-wide search. The index is embedded in search-index.js so the site
// keeps working when opened directly from disk.
(function () {
  "use strict";

  const entries = window.RIZAL_SEARCH_INDEX || [];
  const nav = document.querySelector(".site-nav");
  if (!entries.length || !nav) return;

  function normalize(value) {
    return String(value)
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[’‘]/g, "'")
      .replace(/[^a-z0-9\s']/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  const prepared = entries.map((entry) => {
    const title = normalize(entry.title);
    const text = normalize(entry.text);
    return {
      ...entry,
      title,
      text,
      displayTitle: entry.title,
      displayText: entry.text,
      haystack: `${normalize(entry.type)} ${title} ${text}`
    };
  });

  const openButton = document.createElement("button");
  openButton.className = "site-search-open";
  openButton.type = "button";
  openButton.setAttribute("aria-label", "Search this site (Ctrl+K)");
  openButton.innerHTML = '<span aria-hidden="true">⌕</span> Search';
  nav.append(openButton);

  const dialog = document.createElement("dialog");
  dialog.className = "site-search";
  dialog.id = "site-search-dialog";
  dialog.setAttribute("aria-labelledby", "site-search-title");
  dialog.innerHTML = [
    '<div class="site-search-inner">',
    '  <div class="site-search-head">',
    '    <h2 id="site-search-title">Search this site</h2>',
    '    <button class="site-search-close" type="button" aria-label="Close search">&times;</button>',
    "  </div>",
    '  <label class="site-search-label" for="site-search-input">Find a person, place, work, or idea</label>',
    '  <input id="site-search-input" class="site-search-input" type="search" autocomplete="off" spellcheck="false"',
    '    role="combobox" aria-autocomplete="list" aria-expanded="false"',
    '    placeholder="Try Dapitan, ophthalmology, Mi Último Adiós" aria-controls="site-search-results">',
    '  <p id="site-search-count" class="site-search-count" aria-live="polite"></p>',
    '  <div id="site-search-results" class="site-search-results" role="listbox" aria-label="Search results"></div>',
    '  <p class="site-search-hint">Use ↑ / ↓ to move, Enter to open, Esc to close.</p>',
    "</div>"
  ].join("");
  document.body.append(dialog);

  const input = dialog.querySelector("#site-search-input");
  const count = dialog.querySelector("#site-search-count");
  const results = dialog.querySelector("#site-search-results");
  const closeButton = dialog.querySelector(".site-search-close");

  let matches = [];
  let active = -1;

  function snippetFor(entry, tokens) {
    const source = entry.displayText || "";
    const lower = normalize(source);
    const hit = tokens.map((token) => lower.indexOf(token)).filter((index) => index >= 0).sort((a, b) => a - b)[0];
    if (hit === undefined || hit < 45) return source.slice(0, 160).trim();
    const start = Math.max(0, hit - 35);
    return (start > 0 ? "…" : "") + source.slice(start, start + 160).trim() + "…";
  }

  function findMatches(query) {
    const tokens = normalize(query).split(" ").filter(Boolean);
    if (query.trim().length < 2 || !tokens.length) return [];

    return prepared
      .filter((entry) => tokens.every((token) => entry.haystack.includes(token)))
      .map((entry) => {
        let score = 0;
        tokens.forEach((token) => {
          if (entry.title.startsWith(token)) score += 10;
          else if (entry.title.includes(token)) score += 6;
          if (entry.haystack.includes(token)) score += 2;
        });
        if (entry.type === "Page") score += 0.5;
        return { ...entry, score, tokens };
      })
      .sort((a, b) => b.score - a.score || a.title.localeCompare(b.title))
      .slice(0, 40);
  }

  function render() {
    results.replaceChildren();
    matches = findMatches(input.value);
    active = -1;
    input.removeAttribute("aria-activedescendant");
    input.setAttribute("aria-expanded", String(matches.length > 0));

    const query = input.value.trim();
    if (query.length < 2) {
      count.textContent = `Search across ${entries.length} timeline, work, quote, place, and quiz entries.`;
      return;
    }
    if (!matches.length) {
      count.textContent = `No results for “${query}”.`;
      return;
    }
    count.textContent = `${matches.length} result${matches.length === 1 ? "" : "s"} for “${query}”.`;

    matches.forEach((entry, index) => {
      const link = document.createElement("a");
      link.className = "site-search-result";
      link.id = `site-search-result-${index}`;
      link.href = entry.url;
      link.setAttribute("role", "option");
      link.setAttribute("aria-selected", "false");

      const type = document.createElement("span");
      type.className = "site-search-type";
      type.textContent = entry.type;

      const title = document.createElement("strong");
      title.className = "site-search-title";
      title.textContent = entry.displayTitle;

      const snippet = document.createElement("span");
      snippet.className = "site-search-snippet";
      snippet.textContent = snippetFor(entry, entry.tokens);

      link.append(type, title, snippet);
      results.append(link);
    });
  }

  function setActive(index) {
    if (!matches.length) return;
    active = (index + matches.length) % matches.length;
    Array.from(results.children).forEach((link, linkIndex) => {
      const selected = linkIndex === active;
      link.classList.toggle("is-active", selected);
      link.setAttribute("aria-selected", String(selected));
    });
    const current = results.children[active];
    input.setAttribute("aria-activedescendant", current.id);
    current.scrollIntoView({ block: "nearest" });
  }

  function openSearch() {
    if (typeof dialog.showModal === "function" && !dialog.open) dialog.showModal();
    else dialog.setAttribute("open", "");
    input.value = "";
    render();
    input.focus();
  }

  render();

  openButton.addEventListener("click", openSearch);
  dialog.addEventListener("close", () => input.setAttribute("aria-expanded", "false"));
  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  input.addEventListener("input", render);
  input.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive(active + 1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive(active - 1);
    } else if (event.key === "Enter" && active >= 0) {
      event.preventDefault();
      results.children[active].click();
    }
  });
  results.addEventListener("click", (event) => {
    if (event.target.closest("a")) dialog.close();
  });
  document.addEventListener("keydown", (event) => {
    if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === "k") {
      event.preventDefault();
      openSearch();
    }
  });
})();
