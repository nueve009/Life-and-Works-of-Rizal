// Turn each title in the works index into a button that opens a detail dialog.
// The list itself is written in HTML, so it stays readable without JavaScript.
(function () {
  "use strict";

  const dialog = document.getElementById("work-detail");
  if (!dialog || typeof dialog.showModal !== "function") return;

  const $ = (id) => document.getElementById(id);

  // Used when a work has no extra note of its own.
  const CATEGORY_INFO = {
    "Novels & unfinished fiction": {
      context: "Rizal used fiction to reach readers an argument alone could not. Alongside the two published novels, several starts and fragments survive, including a third novel he never finished.",
      why: "His novels made colonial injustice visible to a wide audience and became central texts in Philippine literature."
    },
    Poems: {
      context: "He wrote poems all his life: as a prize-winning student in Manila, a young man abroad, an exile in Dapitan, and a prisoner awaiting execution.",
      why: "The poems reveal his private hopes, homesickness, and patriotism alongside the public arguments of his essays."
    },
    Plays: {
      context: "These dramas were written while Rizal was a student in Manila, years before he left for Europe and joined the reform movement.",
      why: "They show the young Rizal using theatre, allegory, and religious drama to celebrate learning and question unjust authority."
    },
    "Essays & articles": {
      context: "Most of these pieces appeared in La Solidaridad, the reform newspaper founded by Filipinos in Barcelona in 1889, or in newspapers at home.",
      why: "The essays are Rizal's direct argument with colonial policy: education, representation, equal rights, and the future of the Philippines."
    },
    "Letters, pamphlets & documents": {
      context: "Letters, petitions, and civic papers show Rizal outside the published spotlight, organizing, corresponding, and defending himself.",
      why: "They tie his ideas to real events: the Calamba land dispute, La Liga Filipina, his exile in Dapitan, and his trial."
    },
    "Autobiography & travel writing": {
      context: "Rizal recorded his own childhood and his journeys in memoirs and diaries, many of which were published only after his death.",
      why: "These fragments let us see the man behind the public image, in his own words."
    },
    "History, language & science": {
      context: "He worked as a historian, linguist, folklorist, and naturalist, gathering evidence about Philippine society, language, and the natural world.",
      why: "This scholarship challenged the claim that Filipinos had no civilization before Spanish rule and preserved knowledge that colonial writers ignored."
    },
    "Tales & translations": {
      context: "Rizal collected folk tales and brought European works into Tagalog, often illustrating the stories himself.",
      why: "They show his belief that Filipino children deserved literature in their own language."
    },
    "Visual art & sculpture": {
      context: "He drew, painted, and sculpted from childhood, and in Dapitan he helped build a relief map of Mindanao in the town plaza.",
      why: "These surviving pieces show another side of Rizal's wide-ranging mind beyond his writing."
    }
  };

  // Extra detail and reading links for the best-documented works.
  const EXTRA = {
    "noli-me-tangere": {
      context: "Printed in Berlin in 1887 with a loan from his friend Máximo Viola. The Latin title means 'touch me not'; in the dedication Rizal compares his country to a cancer that must be exposed before it can be cured.",
      why: "The novel was condemned by Church authorities and banned in the Philippines, but copies circulated in secret. It became the founding text of Filipino nationalist literature.",
      links: [
        { label: "English translation, The Social Cancer (Project Gutenberg)", url: "https://www.gutenberg.org/ebooks/6737" },
        { label: "Spanish original (Project Gutenberg)", url: "https://www.gutenberg.org/ebooks/20228" }
      ]
    },
    "el-filibusterismo": {
      context: "Printed in Ghent in 1891 with help from his friend Valentín Ventura. Rizal dedicated it to Mariano Gómez, José Burgos, and Jacinto Zamora, the three priests executed in 1872.",
      why: "The darker sequel asks whether reform is still possible after the failure of the Noli, and warns that revenge corrupts even those who seek freedom.",
      links: [
        { label: "English translation, The Reign of Greed (Project Gutenberg)", url: "https://www.gutenberg.org/ebooks/10676" },
        { label: "Spanish original (Project Gutenberg)", url: "https://www.gutenberg.org/ebooks/30903" }
      ]
    },
    makamisa: {
      context: "Rizal began a third novel after settling in Hong Kong in late 1891. He started in Tagalog, continued in Spanish, and left both versions unfinished; the Spanish drafts were identified in the National Library in 1987.",
      why: "The fragment offers a glimpse of the fiction he might have written had he lived longer."
    },
    "mi-ultimo-adios": {
      context: "Fourteen stanzas written in Fort Santiago before his execution on 30 December 1896. Rizal hid the poem in a small alcohol stove and told his sister Trinidad that there was something inside. It was printed in Hong Kong in 1897 without his title.",
      why: "The poem became the best-known statement of Filipino patriotism and sacrifice, and has been translated into many languages.",
      links: [
        { label: "Poem at Project Gutenberg", url: "https://www.gutenberg.org/ebooks/18600" }
      ]
    },
    "a-la-juventud-filipina": {
      context: "Rizal wrote 'To the Filipino Youth' at eighteen for a contest held by the Liceo Artístico-Literario in Manila, and won first prize, a silver pen shaped like a feather.",
      why: "It calls on young Filipinos to use their talents, calling them 'the fair hope of the fatherland.'"
    },
    "amor-patrio": {
      context: "His first published essay appeared in the Manila newspaper Diariong Tagalog in August 1882, soon after he arrived in Spain. He signed it with the pen name Laong Laan.",
      why: "It treats love of country as a duty to be acted on, not merely a feeling, and announces the reform argument he would develop for the rest of his life."
    },
    "filipinas-dentro-de-cien-anos": {
      context: "A four-part essay serialized in La Solidaridad in 1889 and 1890. Rizal looks back over three centuries of Spanish rule and then forward to the coming decades.",
      why: "His warnings that Spain must reform or lose the colony proved strikingly accurate within a decade.",
      links: [
        { label: "English text at Project Gutenberg", url: "https://www.gutenberg.org/ebooks/35899" }
      ]
    },
    "sobre-la-indolencia-de-los-filipinos": {
      context: "A five-part essay published in La Solidaridad in 1890. Spanish writers often blamed poverty in the colony on supposed Filipino laziness.",
      why: "Rizal answered the stereotype historically, tracing trade and industry decline to colonial policy rather than to the character of the people.",
      links: [
        { label: "English text at Project Gutenberg", url: "https://www.gutenberg.org/ebooks/6885" }
      ]
    },
    "liham-sa-mga-kadalagahan-sa-malolos": {
      context: "Written from London in February 1889 to a group of young women in Malolos who had asked for a school where they could study Spanish. It is his major surviving work in Tagalog.",
      why: "He praises their courage and urges Filipino women to educate themselves rather than accept blind obedience as a virtue.",
      links: [
        { label: "Tagalog text at Project Gutenberg", url: "https://www.gutenberg.org/ebooks/17116" }
      ]
    },
    "annotations-to-morga-s-sucesos-de-las-islas-filipinas": {
      context: "Antonio de Morga's history of the Philippines was published in 1609. Rizal copied it by hand in the British Museum in 1888 and 1889 and filled the margins with notes, corrections, and counter-evidence; the annotated edition was printed in Paris in 1890.",
      why: "He set out to show that Filipinos had a civilization of their own before the Spanish arrived."
    },
    "a-las-flores-de-heidelberg": {
      context: "Written in Heidelberg in the spring of 1886 while Rizal was training as an eye doctor in Germany.",
      why: "The poem asks flowers to carry his love home, giving a gentle voice to the homesickness of his years abroad."
    },
    "mi-retiro": {
      context: "A long poem written in Dapitan in 1895 and sent to his mother, Teodora. It describes his house by the sea and the peace he found there, along with the pain of distance.",
      why: "It is one of his most personal poems, showing how he made exile into a space for work and reflection."
    },
    "himno-a-talisay": {
      context: "A song written for the boys who studied with Rizal at his school in Talisay, Dapitan.",
      why: "It celebrates work, study, and life by the sea, and reflects the importance he gave to education even in exile."
    },
    "el-consejo-de-los-dioses": {
      context: "A classical allegory written for an 1880 literary contest in Manila honoring Cervantes. The gods of Greek mythology hold a contest to name the greatest poet.",
      why: "It shows how thoroughly the young Rizal had absorbed the European humanist tradition."
    },
    "junto-al-pasig": {
      context: "A short religious play written for the Ateneo de Manila and staged on 8 December 1880, the feast of the Immaculate Conception.",
      why: "It is an early example of his use of drama for an audience of fellow students and teachers."
    },
    "sa-aking-mga-kabata": {
      context: "This Tagalog poem is traditionally said to have been written by Rizal at the age of eight, but no manuscript in his hand exists and its language does not match the Tagalog of the 1860s.",
      why: "It is still taught in Philippine schools, but historians dispute the attribution. Treat it as part of the cultural record rather than a confirmed early work."
    },
    "la-vision-de-fr-rodriguez": {
      context: "A sharp polemical booklet published in 1889 under the pseudonym Dimas Alang.",
      why: "It shows Rizal's willingness to enter the rough-and-tumble of the reform press, not just write measured essays."
    },
    "estatuto-de-la-liga-filipina": {
      context: "Rizal founded La Liga Filipina on 3 July 1892 to bring Filipinos together for reform. He was arrested three days later.",
      why: "The statute shows his practical program for civic organization, not only his ideas in print."
    },
    "datos-para-mi-defensa": {
      context: "Points for his defense written in Fort Santiago during the final weeks of 1896, when he was charged with rebellion.",
      why: "The document shows how he answered the accusations against him and defended the reform work he had done."
    },
    "rizal-s-own-story-of-his-life": {
      context: "A set of childhood memoirs that survived in scattered fragments and were collected by the American writer Austin Craig in 1912.",
      why: "Rizal recalls his mother reading to him by candlelight, the lake at Calamba, and his school in Biñan."
    },
    "memorias-de-un-estudiante-de-manila": {
      context: "Student memoirs written between 1878 and 1881 under the pen name P. Jacinto.",
      why: "They record the schooling and early influences that shaped the writer and doctor he became."
    },
    "mariang-makiling": {
      context: "Published in 1890 under the pen name Laong Laan, this is Rizal's version of the legend of the mountain maiden of Makiling.",
      why: "It shows his interest in preserving Filipino folklore as material for a national literature."
    },
    "the-monkey-and-the-turtle": {
      context: "Rizal retold the Filipino fable in English for the London journal Trübner's Oriental Record in 1889, and later drew it as a series of illustrated panels in Dapitan.",
      why: "The drawings and his illustrated Tagalog translations are why he is often called the first Filipino cartoonist."
    },
    "arte-metrica-del-tagalog": {
      context: "A treatise on Tagalog verse presented to the Ethnographical Society of Berlin in 1887.",
      why: "It treats Tagalog as a language worthy of serious scholarly study at a time when colonial opinion dismissed it."
    },
    "specimens-of-tagal-folklore": {
      context: "An ethnographic article published in London in 1889, collecting Tagalog proverbs, puzzles, and verses for an audience of European scholars.",
      why: "It preserved examples of popular culture that might otherwise have gone unrecorded."
    },
    "two-eastern-fables": {
      context: "A comparative study of Philippine and Japanese folklore published in 1889.",
      why: "It places Filipino stories in a wider Asian context rather than treating them as curiosities."
    },
    "relief-map-of-mindanao": {
      context: "Built in the Dapitan town plaza in 1892 with his former Ateneo teacher, Fr. Francisco de Paula Sánchez, and local students.",
      why: "The map was declared a National Cultural Treasure in 2011 and remains a visible record of Rizal's work in exile."
    },
    "the-triumph-of-science-over-death": {
      context: "A small allegorical statuette Rizal sculpted as a gift for his friend and fellow scholar Ferdinand Blumentritt.",
      why: "It expresses his faith in knowledge and progress, themes that run through his writing."
    },
    "the-mother-s-revenge": {
      context: "A small sculpture made in Dapitan in 1894, showing a mother dog attacking the crocodile that has seized her pup.",
      why: "It is a rare surviving example of the sculpture he made during exile."
    },
    "william-tell-translation": {
      context: "Rizal translated Friedrich Schiller's play about a people rising against a tyrant into Tagalog, most likely while he was in Germany in about 1886. Sources differ on the exact date.",
      why: "His choice of subject and language shows how deliberately he brought European literature to Filipino readers."
    },
    "tales-by-hans-christian-andersen-translations": {
      context: "Rizal translated and illustrated several of Andersen's fairy tales in Tagalog, reportedly for his nephews and nieces.",
      why: "Together with his own drawings for folk tales, these made him a pioneer of children's literature in Tagalog."
    }
  };

  const DEFAULT_LINKS = [
    { label: "Complete works bibliography", url: "https://www.joserizal.com/works/rizal-complete-works/" },
    { label: "Books by Rizal at Project Gutenberg", url: "https://www.gutenberg.org/ebooks/author/2183" },
    { label: "Sources & further reading", url: "sources.html" }
  ];

  // Local pictures that genuinely relate to a work. Everything else gets an icon.
  const IMAGES = {
    "noli-me-tangere": { src: "../images/noli-cover.jpg", alt: "Original cover of Noli Me Tangere", caption: "Original cover, 1887" },
    "el-filibusterismo": { src: "../images/el-filibusterismo-cover.jpg", alt: "Facsimile cover of El Filibusterismo", caption: "1891 facsimile cover" },
    "makamisa": { src: "../images/jose-rizal.jpg", alt: "Portrait of José Rizal", caption: "José Rizal, circa 1890s" },
    "mi-ultimo-adios": { src: "../images/jose-rizal.jpg", alt: "Portrait of José Rizal", caption: "José Rizal, circa 1890s" },
    "a-la-juventud-filipina": { src: "../images/jose-rizal.jpg", alt: "Portrait of José Rizal", caption: "José Rizal, circa 1890s" },
    "amor-patrio": { src: "../images/jose-rizal.jpg", alt: "Portrait of José Rizal", caption: "José Rizal, circa 1890s" },
    "mi-primera-inspiracion": { src: "../images/jose-rizal.jpg", alt: "Portrait of José Rizal", caption: "José Rizal, circa 1890s" },
    "mi-retiro": { src: "../images/teodora-alonso.jpg", alt: "Portrait of Teodora Alonso", caption: "Teodora Alonso, Rizal's mother" },
    "goodbye-to-leonor": { src: "../images/leonor-rivera-sketch.jpg", alt: "Sketch of Leonor Rivera", caption: "Leonor Rivera, sketch attributed to Rizal" },
    "to-josephine": { src: "../images/josephine-bracken.jpg", alt: "Portrait of Josephine Bracken", caption: "Josephine Bracken" },
    "letters-to-ferdinand-blumentritt": { src: "../images/blumentritt-sketch.jpg", alt: "Sketch of Ferdinand Blumentritt by Rizal", caption: "Ferdinand Blumentritt, sketched by Rizal" },
    "tribute-to-blumentritt": { src: "../images/blumentritt-sketch.jpg", alt: "Sketch of Ferdinand Blumentritt by Rizal", caption: "Ferdinand Blumentritt, sketched by Rizal" },
    "the-triumph-of-science-over-death": { src: "../images/blumentritt-sketch.jpg", alt: "Sketch of Ferdinand Blumentritt by Rizal", caption: "Ferdinand Blumentritt, friend and correspondent" },
    "cartas-con-el-p-pablo-pastells": { src: "../images/dapitan-clinic.jpg", alt: "Rizal's clinic in Dapitan", caption: "Rizal's clinic in Dapitan" },
    "himno-a-talisay": { src: "../images/dapitan-clinic.jpg", alt: "Rizal's clinic in Dapitan", caption: "Dapitan, where Rizal taught and wrote" },
    "notes-on-philippine-shells": { src: "../images/dapitan-clinic.jpg", alt: "Rizal's clinic in Dapitan", caption: "Rizal collected specimens during his exile" },
    "the-mother-s-revenge": { src: "../images/dapitan-clinic.jpg", alt: "Rizal's clinic in Dapitan", caption: "Sculpted during Rizal's exile in Dapitan" },
    "relief-map-of-mindanao": { src: "../images/dapitan-clinic.jpg", alt: "Rizal's clinic in Dapitan", caption: "Built in the Dapitan town plaza" },
    "los-agricultores-filipinos": { src: "../images/marcelo-del-pilar.jpg", alt: "Portrait of Marcelo H. del Pilar", caption: "Marcelo H. del Pilar, co-founder of La Solidaridad" },
    "como-se-gobiernan-las-filipinas": { src: "../images/graciano-lopez-jaena.jpg", alt: "Portrait of Graciano López Jaena", caption: "Graciano López Jaena, founder of La Solidaridad" },
    "petition-of-the-town-of-calamba": { src: "../images/paciano-rizal.jpg", alt: "Monument to Paciano Rizal", caption: "Paciano Rizal, who supported the Calamba petition" },
    "historia-de-la-familia-rizal-de-la-calamba": { src: "../images/teodora-alonso.jpg", alt: "Portrait of Teodora Alonso", caption: "Teodora Alonso, Rizal's mother" },
    "wooden-bust-of-francisco-mercado": { src: "../images/francisco-mercado-bust.png", alt: "Wooden bust of Francisco Mercado by Rizal", caption: "Rizal's wooden bust of his father" }
  };

  // Simple line icons stand in when no relevant photograph exists.
  const CATEGORY_ICONS = {
    "Novels & unfinished fiction": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 6.5C10.5 5.2 8.4 4.6 5 4.5v13c3.4.1 5.5.7 7 2 1.5-1.3 3.6-1.9 7-2v-13c-3.4.1-5.5.7-7 2Z"/><path d="M12 6.5v13"/></svg>',
    Poems: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M20 4c-6.5.2-11 3.1-13 8.8L4.5 20l7.4-2.2C17.3 15.8 20 11 20 4Z"/><path d="M5 19.5 14 10"/><path d="M14.5 10.5c1.5.3 2.7-.4 3.6-2"/></svg>',
    Plays: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M4 8a8 8 0 0 1 16 0v3a4 4 0 0 1-4 4h-1.2L12 18l-2.8-3H8a4 4 0 0 1-4-4Z"/><path d="M8.5 10.5h.01M15.5 10.5h.01"/><path d="M9.5 13.5c1.5.9 3.5.9 5 0"/></svg>',
    "Essays & articles": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="1.5"/><path d="M7 9h10M7 12h10M7 15h6"/></svg>',
    "Letters, pamphlets & documents": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><rect x="3" y="6" width="18" height="12" rx="1.5"/><path d="m4 7 8 6 8-6"/></svg>',
    "Autobiography & travel writing": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5Z"/></svg>',
    "History, language & science": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M9 3h6M10.5 3v6l-5.2 9.1A2 2 0 0 0 7 21h10a2 2 0 0 0 1.7-2.9L13.5 9V3"/><path d="M7.8 15h8.4"/></svg>',
    "Tales & translations": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.8 3.2 2.8 14.8 0 18M12 3c-2.8 3.2-2.8 14.8 0 18"/></svg>',
    "Visual art & sculpture": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"><path d="M12 3a9 9 0 1 0 0 18h1.8a2.2 2.2 0 0 0 0-4.4h-1a1.8 1.8 0 0 1 0-3.6h2.8A4.4 4.4 0 0 0 20 9 6 6 0 0 0 12 3Z"/><path d="M8 9h.01M12 7h.01M16 9.5h.01"/></svg>'
  };

  const CATEGORY_COLORS = {
    "Novels & unfinished fiction": "#743621",
    Poems: "#9c4d35",
    Plays: "#65704f",
    "Essays & articles": "#4c573a",
    "Letters, pamphlets & documents": "#8c5a2b",
    "Autobiography & travel writing": "#5a6f73",
    "History, language & science": "#4f6178",
    "Tales & translations": "#8a6a3c",
    "Visual art & sculpture": "#7a4a63"
  };

  function slugify(text) {
    return text
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "");
  }

  const items = Array.from(document.querySelectorAll(".works-list li"));
  function makeThumb(slug, category, large) {
    const thumb = document.createElement("span");
    thumb.className = large ? "work-thumb work-thumb-large" : "work-thumb";
    const image = IMAGES[slug];

    if (image) {
      const img = document.createElement("img");
      img.src = image.src;
      img.alt = large ? image.alt : "";
      img.loading = "lazy";
      thumb.append(img);
    } else {
      thumb.classList.add("work-thumb-icon");
      thumb.setAttribute("aria-hidden", "true");
      thumb.innerHTML = CATEGORY_ICONS[category] || CATEGORY_ICONS.Poems;
      thumb.style.setProperty("--accent", CATEGORY_COLORS[category] || "#9c4d35");
    }
    return thumb;
  }

  const works = items.map((li, index) => {
    const titleEl = li.querySelector("strong");
    const summaryEl = li.querySelector("p");
    const metaEl = li.querySelector(".work-meta");
    const categoryEl = li.closest(".works-category");
    if (!titleEl || !summaryEl || !metaEl || !categoryEl) return null;

    const titleText = titleEl.textContent.trim();
    const slug = slugify(titleText);
    const category = categoryEl.querySelector("h3").childNodes[0].textContent.trim();

    const button = document.createElement("button");
    button.type = "button";
    button.className = "work-open";
    button.innerHTML = titleEl.outerHTML;
    button.setAttribute("aria-label", "View details for " + titleText);
    titleEl.replaceWith(button);

    li.querySelector("div").classList.add("work-body");
    li.prepend(makeThumb(slug, category, false));

    const work = {
      index: index,
      slug: slug,
      titleHtml: titleEl.innerHTML,
      summary: summaryEl.textContent.trim(),
      meta: metaEl.textContent.trim(),
      category: category,
      trigger: button,
      li: li
    };
    const extra = EXTRA[slug] || {};
    const fallback = CATEGORY_INFO[category] || {};
    work.searchText = [
      titleText, work.meta, work.summary, category,
      extra.context, extra.why, fallback.context, fallback.why
    ].filter(Boolean).join(" ").toLowerCase();
    return work;
  }).filter(Boolean);

  if (!works.length) return;

  let lastTrigger = null;
  let currentWork = null;
  let activeList = works;
  let visibleWorks = works.slice();

  const closeButton = dialog.querySelector(".work-detail-close");
  const prevButton = $("detail-prev");
  const nextButton = $("detail-next");
  const linksList = $("detail-links");

  function render(work, list) {
    currentWork = work;
    activeList = list;
    const extra = EXTRA[work.slug] || {};
    const fallback = CATEGORY_INFO[work.category] || {
      context: "This work is part of Rizal's wider body of writing.",
      why: "It helps show the range of subjects he addressed."
    };

    $("detail-category").textContent = work.category;
    $("detail-title").innerHTML = work.titleHtml;
    $("detail-meta").textContent = work.meta;
    $("detail-summary").textContent = work.summary;
    $("detail-context").textContent = extra.context || fallback.context;
    $("detail-why").textContent = extra.why || fallback.why;

    const art = $("detail-art");
    art.replaceChildren();
    const image = IMAGES[work.slug];
    if (image) {
      const img = document.createElement("img");
      img.src = image.src;
      img.alt = image.alt;
      img.loading = "lazy";
      const caption = document.createElement("figcaption");
      caption.textContent = image.caption || "";
      caption.hidden = !caption.textContent;
      art.append(img, caption);
    } else {
      art.append(makeThumb(work.slug, work.category, true));
    }

    const links = (extra.links || []).concat(DEFAULT_LINKS);
    linksList.replaceChildren(...links.map((link) => {
      const li = document.createElement("li");
      const a = document.createElement("a");
      a.href = link.url;
      a.textContent = link.label;
      if (/^https?:\/\//.test(link.url)) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }
      li.append(a);
      return li;
    }));

    const position = list.indexOf(work);
    prevButton.disabled = position <= 0;
    nextButton.disabled = position === list.length - 1;
    dialog.scrollTop = 0;
  }

  function open(work, list, trigger) {
    lastTrigger = trigger || null;
    render(work, list);
    if (!dialog.open) dialog.showModal();
    closeButton.focus();
  }

  function step(direction) {
    const position = activeList.indexOf(currentWork);
    const next = activeList[position + direction];
    if (next) render(next, activeList);
  }

  works.forEach((work) => {
    work.trigger.addEventListener("click", () => open(work, visibleWorks, work.trigger));
  });

  // The three illustrated cards use the same detail view.
  document.querySelectorAll(".work-card h2").forEach((heading) => {
    const work = works.find((candidate) => candidate.slug === slugify(heading.textContent.trim()));
    if (!work) return;
    heading.innerHTML = '<button class="work-open" type="button">' + heading.innerHTML + "</button>";
    const trigger = heading.querySelector(".work-open");
    trigger.setAttribute("aria-label", "View details for " + heading.textContent.trim());
    trigger.addEventListener("click", () => {
      const list = visibleWorks.includes(work) ? visibleWorks : works;
      open(work, list, trigger);
    });
  });

  closeButton.addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    if (lastTrigger) lastTrigger.focus({ preventScroll: true });
  });

  prevButton.addEventListener("click", () => step(-1));
  nextButton.addEventListener("click", () => step(1));
  dialog.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft") step(-1);
    if (event.key === "ArrowRight") step(1);
  });

  // Search and category filtering.
  const searchInput = $("work-search");
  const clearButton = $("work-search-clear");
  const resultCount = $("works-result-count");
  const emptyMessage = $("works-empty");
  const filterButtons = Array.from(document.querySelectorAll(".category-filter"));
  const panels = Array.from(document.querySelectorAll(".works-category"));
  const grid = document.querySelector(".index-grid");
  let activeCategory = "all";

  function matchesQuery(work, query) {
    return !query || work.searchText.includes(query);
  }

  function filterWorks() {
    const query = searchInput.value.trim().toLowerCase();
    visibleWorks = works.filter((work) =>
      (activeCategory === "all" || work.category === activeCategory) && matchesQuery(work, query)
    );

    works.forEach((work) => { work.li.hidden = !visibleWorks.includes(work); });
    panels.forEach((panel) => {
      const rows = Array.from(panel.querySelectorAll(".works-list li"));
      panel.hidden = !rows.some((row) => !row.hidden);
    });

    // Give a single visible category the whole row so it does not look stranded.
    const singlePanel = activeCategory !== "all" || panels.filter((panel) => !panel.hidden).length === 1;
    grid.classList.toggle("is-filtered", singlePanel);

    filterButtons.forEach((button) => {
      const category = button.dataset.category;
      const count = works.filter((work) =>
        (category === "all" || work.category === category) && matchesQuery(work, query)
      ).length;
      button.querySelector(".filter-count").textContent = count;
      const selected = category === activeCategory;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-pressed", String(selected));
    });

    clearButton.hidden = !query;
    emptyMessage.hidden = visibleWorks.length > 0;
    resultCount.textContent = (query || activeCategory !== "all")
      ? `Showing ${visibleWorks.length} of ${works.length} works`
      : `Showing all ${works.length} works`;
  }

  // Press "/" to jump to search, the same shortcut used by many sites.
  document.addEventListener("keydown", (event) => {
    if (event.key !== "/" || event.altKey || event.ctrlKey || event.metaKey) return;
    const target = event.target;
    if (target && target.nodeType === 1 &&
        (target.matches("input, textarea, select") || target.isContentEditable)) return;
    event.preventDefault();
    searchInput.focus();
    searchInput.select();
  });

  searchInput.addEventListener("input", filterWorks);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && searchInput.value) {
      event.preventDefault();
      searchInput.value = "";
      filterWorks();
    }
  });
  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    filterWorks();
    searchInput.focus();
  });
  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.category;
      filterWorks();
    });
  });

  filterWorks();
})();
