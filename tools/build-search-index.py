"""Rebuild js/search-index.js from the site's HTML and JavaScript sources.

Run from anywhere with: python tools/build-search-index.py
The script uses only the Python standard library and writes no other files.
"""

import html
import json
import re
import unicodedata
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent


def read(relative_path):
    return (ROOT / relative_path).read_text(encoding="utf-8")


def clean(value):
    value = re.sub(r"<br\s*/?>", " ", value, flags=re.I)
    value = re.sub(r"<[^>]+>", " ", value)
    value = html.unescape(value)
    return re.sub(r"\s+", " ", value).strip()


def slugify(title):
    title = re.sub(r"<[^>]+>", "", title)
    title = "".join(
        char
        for char in unicodedata.normalize("NFD", title)
        if unicodedata.category(char) != "Mn"
    )
    title = title.lower()
    title = re.sub(r"[^a-z0-9]+", "-", title)
    return title.strip("-")


def js_string(value):
    """Decode a JSON-style string literal copied from the JavaScript files."""
    try:
        return json.loads('"' + value + '"')
    except json.JSONDecodeError:
        return value.replace('\\"', '"')


def shorten(value, limit=700):
    if len(value) <= limit:
        return value
    return value[:limit].rsplit(" ", 1)[0] + "…"


entries = []

# Top-level pages.
pages = [
    (
        "Home",
        "Rizal: A Life of Courage. Start here for an overview of his life, works, and legacy.",
        "index.html",
    ),
    (
        "Timeline",
        "Key moments from Rizal's birth in Calamba to his execution in Bagumbayan.",
        "timeline.html",
    ),
    (
        "Places",
        "Geographic maps of the Philippines and Europe showing the places that shaped Rizal's life.",
        "places.html",
    ),
    (
        "Works",
        "A searchable index of Rizal's novels, poems, essays, letters, translations, and other works.",
        "works.html",
    ),
    (
        "Own Words",
        "Sourced quotations from Rizal's writings, grouped by theme.",
        "quotes.html",
    ),
    (
        "Movies",
        "Films and documentaries that portray José Rizal, from early silent biopics to modern ensemble dramas.",
        "movies.html",
    ),
    (
        "Quiz",
        "Ten-question quizzes at easy, medium, hard, and mixed-review levels.",
        "quiz.html",
    ),
    (
        "Sources",
        "Image credits, work-text editions, licenses, bibliography links, and the project disclaimer.",
        "sources.html",
    ),
]
entries.extend(
    {"type": "Page", "title": title, "text": text, "url": url}
    for title, text, url in pages
)

# Timeline items and detail sections.
timeline = read("pages/timeline.html")
for item_id, year, raw_title, raw_text in re.findall(
    r'<li class="timeline-item" id="([^"]+)">\s*<span class="timeline-year">(.*?)</span>'
    r"\s*<div>.*?<h2>(.*?)</h2>\s*<p>(.*?)</p>",
    timeline,
    re.S,
):
    entries.append(
        {
            "type": "Timeline",
            "title": f"{clean(year)} · {clean(raw_title)}",
            "text": clean(raw_text),
            "url": f"timeline.html#{item_id}",
        }
    )

for part in timeline.split('<section class="detail-card"')[1:]:
    body = part.split("</section>", 1)[0]
    section_id = re.match(r'\s+id="([^"]+)"', body)
    heading = re.search(r"<h2>(.*?)</h2>", body, re.S)
    if not section_id or not heading:
        continue
    entries.append(
        {
            "type": "Timeline",
            "title": clean(heading.group(1)),
            "text": clean(body),
            "url": f"timeline.html#{section_id.group(1)}",
        }
    )

# Works index, enriched with the curated context and sourced text from works.js.
works_html = read("pages/works.html")
works_js = read("js/works.js")

extras = {}
for key, raw_context, raw_why in re.findall(
    r'\n    "([^"]+)": \{\s*context: "((?:[^"\\]|\\.)*)",\s*why: "((?:[^"\\]|\\.)*)"',
    works_js,
):
    extras[key] = (js_string(raw_context), js_string(raw_why))

excerpt_block = re.search(r"const TEXT_EXCERPTS = \{([\s\S]*?)\n  \};", works_js)
excerpts = {}
if excerpt_block:
    for key, raw_html in re.findall(
        r'\n    "([^"]+)": \{[\s\S]*?html: `([\s\S]*?)`', excerpt_block.group(1)
    ):
        excerpts[key] = shorten(clean(raw_html))

work_items = re.findall(
    r'<li><span class="work-meta">(.*?)</span><div><strong>(.*?)</strong><p>(.*?)</p></div></li>',
    works_html,
    re.S,
)
for year, raw_title, raw_text in work_items:
    title = clean(raw_title)
    key = slugify(title)
    context, why = extras.get(key, ("", ""))
    text_parts = [
        clean(year),
        clean(raw_text),
        context,
        why,
        f"Sourced text: {excerpts[key]}" if key in excerpts else "",
    ]
    entries.append(
        {
            "type": "Work",
            "title": title,
            "text": " ".join(part for part in text_parts if part),
            "url": f"works.html#{key}",
        }
    )

# Quotations.
quotes_html = read("pages/quotes.html")
for number, match in enumerate(
    re.finditer(r'<article class="quote-card" id="([^"]+)"[\s\S]*?</article>', quotes_html), 1
):
    quote_id, card = match.group(1), match.group(0)
    theme = re.search(r'<span class="quote-theme">(.*?)</span>', card, re.S)
    quote = re.search(r"<blockquote[^>]*>\s*<p>(.*?)</p>", card, re.S)
    work = re.search(r'<p class="quote-work">(.*?)</p>', card, re.S)
    if not quote:
        continue
    title = (
        f"Quotation {number}: {clean(work.group(1)) if work else clean(theme.group(1) if theme else '')}"
    )
    text = clean(quote.group(1))
    if theme:
        text = clean(theme.group(1)) + " — " + text
    entries.append(
        {
            "type": "Quotation",
            "title": title,
            "text": text,
            "url": f"quotes.html#{quote_id}",
        }
    )

# Films and documentaries that portray Rizal (not adaptations of his books).
movies_html = read("pages/movies.html")
for movie_id, _movie_type, card in re.findall(
    r'<article class="movie-card" id="([^"]+)" data-type="([^"]+)">([\s\S]*?)</article>',
    movies_html,
):
    heading = re.search(r"<h2>(.*?)</h2>", card, re.S)
    if not heading:
        continue
    meta = re.search(r'<p class="movie-meta">(.*?)</p>', card, re.S)
    role = re.search(r'<p class="movie-role">(.*?)</p>', card, re.S)
    why = re.search(r'<p class="movie-why">(.*?)</p>', card, re.S)
    entries.append(
        {
            "type": "Movie",
            "title": clean(heading.group(1)),
            "text": " ".join(
                part
                for part in [
                    clean(meta.group(1) if meta else ""),
                    clean(role.group(1) if role else ""),
                    clean(why.group(1) if why else ""),
                ]
                if part
            ),
            "url": f"movies.html#{movie_id}",
        }
    )

# Places.
places_html = read("pages/places.html")
for place_id, region, card in re.findall(
    r'<article class="place-card[^"]*" data-place="([^"]+)" data-region="([^"]+)">([\s\S]*?)</article>',
    places_html,
):
    heading = re.search(r"<h3>(.*?)</h3>", card, re.S)
    summary = re.search(r'<p class="place-summary">(.*?)</p>', card, re.S)
    why = re.search(r'<p class="place-why">(.*?)</p>', card, re.S)
    if not heading:
        continue
    entries.append(
        {
            "type": "Place",
            "title": clean(heading.group(1)),
            "text": " ".join(
                part
                for part in [
                    clean(summary.group(1) if summary else ""),
                    clean(why.group(1) if why else ""),
                ]
                if part
            ),
            "url": f"places.html#place-{place_id}",
        }
    )

# Quiz questions and their study links.
quiz_js = read("js/quiz.js")
source_map = {}
for key, label, url in re.findall(
    r'(\w+): \{ label: "([^"]+)", url: "([^"]+)" \}', quiz_js
):
    source_map[key] = (label, url)

question_pattern = re.compile(
    r'question: "((?:[^"\\]|\\.)*)",\s*answers: \[([\s\S]*?)\],\s*correct: (\d+),\s*'
    r'explain: "((?:[^"\\]|\\.)*)",\s*source: SOURCES\.(\w+)'
)
for raw_question, raw_answers, correct, raw_explain, source_key in question_pattern.findall(
    quiz_js
):
    answers = [js_string(answer) for answer in re.findall(r'"((?:[^"\\]|\\.)*)"', raw_answers)]
    label, url = source_map.get(source_key, ("Quiz", "quiz.html"))
    entries.append(
        {
            "type": "Quiz",
            "title": js_string(raw_question),
            "text": (
                "Correct answer: "
                + answers[int(correct)]
                + ". "
                + js_string(raw_explain)
                + f" Study: {label}."
            ),
            "url": url,
        }
    )

output = "window.RIZAL_SEARCH_INDEX = " + json.dumps(
    entries, ensure_ascii=False, indent=2
) + ";\n"
(ROOT / "js" / "search-index.js").write_text(output, encoding="utf-8", newline="")

print(f"search entries: {len(entries)}")
for kind in sorted({entry["type"] for entry in entries}):
    print(f"  {kind}: {sum(entry['type'] == kind for entry in entries)}")
print(f"output bytes: {len(output.encode('utf-8'))}")
