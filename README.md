# Rizal: Life and Works

An educational website that teaches people about the life and works of Dr. José Rizal, the national hero of the Philippines. Made for our Rizal integration project.

**Live site:** [(https://life-and-works-of-rizal-eta.vercel.app/pages/index.html)]

## Features

- **Life timeline:** key events from his birth in Calamba (1861) to his execution in Bagumbayan (1896)
- **Works:** illustrated summaries of _Noli Me Tangere_, _El Filibusterismo_, and _Mi Último Adiós_, plus a searchable, filterable index of all of Rizal's documented novels, poems, essays, plays, letters, translations, and other works (press `/` to focus the search; selected categories expand to full width); click any title for a detailed pop-up with an image or category icon, background, and further reading
- **Quiz:** easy, medium, and hard multiple-choice levels with a progress bar and answer feedback
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
├── pages/
│   ├── index.html    # Home page
│   ├── timeline.html # Life timeline
│   ├── works.html    # His major works
│   ├── quiz.html     # Quiz
│   └── sources.html  # Sources
├── css/
│   └── style.css     # Styles
├── js/
│   ├── main.js       # Shared fade-in, lightbox, and back-to-top features
│   ├── works.js      # Clickable work titles and the detail pop-up
│   ├── timeline.js   # Timeline smooth scrolling and active section navigation
│   └── quiz.js       # Quiz logic
└── images/           # Pictures used on the site
```

## How to run

1. Download or clone this repository:
   ```
   git clone https://github.com/your-username/your-repo-name.git
   ```
2. Open the folder.
3. Double-click `index.html` to open it in your browser.

## How to deploy for free

You can put the site online with Netlify, Vercel, or GitHub Pages. With Netlify Drop, drag the project folder onto the page and you get a public link in seconds.

## Group members

- Joshua Albos

## Sources

- [Add your books and websites here]

## Credits

Images include public-domain works and a CC BY-SA 4.0 photo. See the Sources page for image credits and license links. The Baroque corner ornament in `images/baroque-corner-ornament.svg` is an original drawing made for this site.
