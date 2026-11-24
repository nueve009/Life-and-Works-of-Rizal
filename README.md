# Rizal: Life and Works

An educational website that teaches people about the life and works of Dr. José Rizal, the national hero of the Philippines. Made for our Rizal integration project.

**Live site:** [(https://life-and-works-of-rizal-eta.vercel.app/pages/index.html)]

**Companion essay:** [ESSAY.md](ESSAY.md) explains how the project adds to and changes prevailing views about Rizal.

## Features

- **Life timeline:** key events from his birth in Calamba (1861) to his execution in Bagumbayan (1896)
- **Works:** illustrated summaries of _Noli Me Tangere_, _El Filibusterismo_, and _Mi Último Adiós_, plus a searchable, filterable index of all of Rizal's documented novels, poems, essays, plays, letters, translations, and other works (press `/` to focus the search; selected categories expand to full width); click any title for a detailed pop-up with an image or category icon, background, why it matters, further reading, and the actual sourced text where it survives (full text for short poems, letters, and sonnets; clear excerpts for novels, long essays, memoirs, tales, and plays)
- **Places:** interactive geographic maps (Natural Earth outlines with latitude/longitude pins) for the Philippines and Europe, plus a location list linking Calamba, Dapitan, Madrid, Berlin, and other places to the relevant timeline and work entries
- **Own Words:** theme-filtered quotations from the sourced work texts, each with its translator/edition credit and a link back to the full work dialog
- **Movies:** a filterable guide to films and documentaries that portray Rizal, from the 1912 silent biopic to 2023's _GomBurZa_, with cast notes and source links
- **Quiz:** easy, medium, hard, and mixed-review levels with ten questions each, answer explanations, study links, and a progress bar
- **Site-wide search:** a search dialog available from every page (button in the navigation or Ctrl/Cmd+K) covering pages, timeline entries, works, sourced work excerpts, quotations, movies, places, and quiz questions
- **Interactive details:** smooth timeline navigation, active section highlighting, image lightbox, and a back-to-top button
- **Visual style:** original Spanish-Filipino Baroque corner ornaments in espresso-brown line art, drawn as a scalable SVG
- **Sources:** image credits, bibliography links, full-text references, and a clear disclaimer that the site is for an integration project and should not be cited

## Built with

- HTML
- CSS
- JavaScript

No frameworks or installs needed.

## Project structure

```
├── index.html        # Redirects to the pages folder
├── ESSAY.md          # Companion essay on the project's view of Rizal
├── pages/
│   ├── index.html    # Home page
│   ├── timeline.html # Life timeline
│   ├── places.html   # Interactive places explorer
│   ├── works.html    # His major works
│   ├── quotes.html   # Rizal in His Own Words
│   ├── movies.html   # Films and documentaries featuring Rizal
│   ├── quiz.html     # Quiz
│   └── sources.html  # Sources
├── css/
│   └── style.css     # Styles
├── js/
│   ├── main.js       # Shared fade-in, lightbox, and back-to-top features
│   ├── search-index.js # Embedded site-wide search data
│   ├── search.js     # Site-wide search dialog and keyboard shortcuts
│   ├── works.js      # Clickable work titles and the detail pop-up
│   ├── places.js     # Places map selection and region filters
│   ├── quotes.js     # Own Words theme filters and random quote
│   ├── movies.js     # Movies page filters
│   ├── timeline.js   # Timeline smooth scrolling and active section navigation
│   └── quiz.js       # Quiz logic
├── tools/
│   └── build-search-index.py # Regenerates js/search-index.js
└── images/           # Pictures used on the site
```

## How to run

1. Download or clone this repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Open the folder.
3. Double-click `index.html` to open it in your browser.

## Updating the search index

After editing page text, quiz questions, or work excerpts, regenerate the embedded search data with:

```
python tools/build-search-index.py
```

This uses only the Python standard library and rewrites `js/search-index.js`.

## How to deploy for free

You can put the site online with Netlify, Vercel, or GitHub Pages. With Netlify Drop, drag the project folder onto the page and you get a public link in seconds.

## Group members

- Joshua Albos

## Sources

- [Add your books and websites here]

## Credits

Images include public-domain works and a CC BY-SA 4.0 photo. The Philippines outline on the Places page uses public-domain [Natural Earth](https://www.naturalearthdata.com/about/terms-of-use/) boundary data. See the Sources page for image credits and license links. The Baroque corner ornament in `images/baroque-corner-ornament.svg` is an original drawing made for this site.
