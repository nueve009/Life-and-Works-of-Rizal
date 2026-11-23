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

  // Real passages for works whose text survives. Short works are given in full;
  // novels and long essays use a clearly labelled excerpt. Everything here is
  // public domain except the modern Mi Último Adiós translation, credited below.
  const TEXT_EXCERPTS = {
    "noli-me-tangere": {
      label: "From the novel — dedication and opening",
      source: "The Social Cancer, trans. Charles Derbyshire (1912), via Wikisource",
      sourceUrl: "https://en.wikisource.org/wiki/The_Social_Cancer/Author%27s_Dedication",
      extent: "Excerpt",
      license: "Public domain",
      html: `
        <p class="work-text-subhead">Author's dedication</p>
        <p>To My Fatherland: Recorded in the history of human sufferings is a cancer of so malignant a character that the least touch irritates it and awakens in it the sharpest pains.</p>
        <p>… And to this end, I will strive to reproduce thy condition faithfully, without discriminations; I will raise a part of the veil that covers the evil, sacrificing to truth everything, even vanity itself, since, as thy son, I am conscious that I also suffer from thy defects and weaknesses. <em>—The Author, Europe, 1886</em></p>
        <p class="work-text-subhead">Chapter I — A Social Gathering</p>
        <p>On the last of October Don Santiago de los Santos, popularly known as Capitan Tiago, gave a dinner. In spite of the fact that, contrary to his usual custom, he had made the announcement only that afternoon, it was already the sole topic of conversation in Binondo and adjacent districts, and even in the Walled City, for at that time Capitan Tiago was considered one of the most hospitable of men, and it was well known that his house, like his country, shut its doors against nothing except commerce and all new or bold ideas.</p>
        <p>Like an electric shock the announcement ran through the world of parasites, bores, and hangers-on, whom God in His infinite bounty creates and so kindly multiplies in Manila. Some looked at once for shoe-polish, others for buttons and cravats, but all were especially concerned about how to greet the master of the house in the most familiar tone, in order to create an atmosphere of ancient friendship or, if occasion should arise, to excuse a late arrival.</p>
      `
    },
    "el-filibusterismo": {
      label: "From the novel — Chapter I",
      source: "The Reign of Greed, trans. Charles Derbyshire (1912), via Wikisource",
      sourceUrl: "https://en.wikisource.org/wiki/The_Reign_of_Greed/Chapter_1",
      extent: "Excerpt",
      license: "Public domain",
      html: `
        <p class="work-text-subhead">Chapter I — On the Upper Deck</p>
        <p><em>Sic itur ad astra</em></p>
        <p>One morning in December the steamer <em>Tabo</em> was laboriously ascending the tortuous course of the Pasig, carrying a large crowd of passengers toward the province of La Laguna. She was a heavily built steamer, almost round, like the <em>tabú</em> from which she derived her name, quite dirty in spite of her pretensions to whiteness, majestic and grave from her leisurely motion. Altogether, she was held in great affection in that region, perhaps from her Tagalog name, or from the fact that she bore the characteristic impress of things in the country, representing something like a triumph over progress, a steamer that was not a steamer at all, an organism, stolid, imperfect yet unimpeachable, which, when it wished to pose as being rankly progressive, proudly contented itself with putting on a fresh coat of paint. Indeed, the happy steamer was genuinely Filipino!</p>
        <p>Bathed in the sunlight of a morning that made the waters of the river sparkle and the breezes rustle in the bending bamboo on its banks, there she goes with her white silhouette throwing out great clouds of smoke—the Ship of State, so the joke runs, also has the vice of smoking!</p>
      `
    },
    "mi-ultimo-adios": {
      label: "The complete poem",
      source: "Modern English translation by Edwin Agustín Lozada (2001), via Wikisource",
      sourceUrl: "https://en.wikisource.org/wiki/My_Last_Farewell",
      extent: "Complete text · 14 stanzas",
      license: "Translation CC BY-SA 3.0; original Spanish public domain",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/3.0/",
      html: `
        <p class="poem-stanza">Farewell, beloved Country, treasured region of the sun,<br>Pearl of the sea of the Orient, our lost Eden!<br>To you eagerly I surrender this sad and gloomy life;<br>And were it brighter, fresher, more florid,<br>Even then I’d give it to you, for your sake alone.</p>
        <p class="poem-stanza">In fields of battle, deliriously fighting,<br>Others give you their lives, without doubt, without regret;<br>The place matters not: where there’s cypress, laurel or lily,<br>On a plank or open field, in combat or cruel martyrdom,<br>It’s all the same if the home or country asks.</p>
        <p class="poem-stanza">I die when I see the sky has unfurled its colors<br>And at last after a cloak of darkness announces the day;<br>If you need scarlet to tint your dawn,<br>Shed my blood, pour it as the moment comes,<br>And may it be gilded by a reflection of the heaven’s newly-born light.</p>
        <p class="poem-stanza">My dreams, when scarcely an adolescent,<br>My dreams, when a young man already full of life,<br>Were to see you one day, jewel of the sea of the Orient,<br>Dry those eyes of black, that forehead high,<br>Without frown, without wrinkles, without stains of shame.</p>
        <p class="poem-stanza">My lifelong dream, my deep burning desire,<br>This soul that will soon depart cries out: Salud!<br>To your health! Oh how beautiful to fall to give you flight,<br>To die to give you life, to die under your sky,<br>And in your enchanted land eternally sleep.</p>
        <p class="poem-stanza">If upon my grave one day you see appear,<br>Amidst the dense grass, a simple humble flower,<br>Place it near your lips and my soul you’ll kiss,<br>And on my brow may I feel, under the cold tomb,<br>The gentle blow of your tenderness, the warmth of your breath.</p>
        <p class="poem-stanza">Let the moon see me in a soft and tranquil light,<br>Let the dawn send its fleeting radiance,<br>Let the wind moan with its low murmur,<br>And should a bird descend and rest on my cross,<br>Let it sing its canticle of peace.</p>
        <p class="poem-stanza">Let the burning sun evaporate the rains,<br>And with my clamor behind, towards the sky may they turn pure;<br>Let a friend mourn my early demise,<br>And in the serene afternoons, when someone prays for me,<br>O Country, pray to God also for my rest!</p>
        <p class="poem-stanza">Pray for all the unfortunate ones who died,<br>For all who suffered torments unequaled,<br>For our poor mothers who in their grief and bitterness cry,<br>For orphans and widows, for prisoners in torture,<br>And for yourself pray that your final redemption you’ll see.</p>
        <p class="poem-stanza">And when the cemetery is enveloped in dark night,<br>And there, alone, only those who have gone remain in vigil,<br>Disturb not their rest, nor the mystery,<br>And should you hear chords from a zither or psaltery,<br>It is I, beloved Country, singing to you.</p>
        <p class="poem-stanza">And when my grave, then by all forgotten,<br>has not a cross nor stone to mark its place,<br>Let men plow and with a spade scatter it,<br>And before my ashes return to nothing,<br>May they be the dust that carpets your fields.</p>
        <p class="poem-stanza">Then nothing matters, cast me in oblivion.<br>Your atmosphere, your space and valleys I’ll cross.<br>I will be a vibrant and clear note to your ears,<br>Aroma, light, colors, murmur, moan, and song,<br>Constantly repeating the essence of my faith.</p>
        <p class="poem-stanza">My idolized country, sorrow of my sorrows,<br>Beloved Filipinas, hear my last good-bye.<br>There I leave you all, my parents, my loves.<br>I’ll go where there are no slaves, hangmen nor oppressors,<br>Where faith doesn’t kill, where the one who reigns is God.</p>
        <p class="poem-stanza">Goodbye, dear parents, brother and sisters, fragments of my soul,<br>Childhood friends in the home now lost,<br>Give thanks that I rest from this wearisome day;<br>Goodbye, sweet foreigner, my friend, my joy;<br>Farewell, loved ones, to die is to rest.</p>
        <p class="work-text-subhead">José Rizal, 1896</p>
      `
    },
    "a-la-juventud-filipina": {
      label: "The complete poem",
      source: "To the Philippine Youth, trans. Charles Derbyshire (1913)",
      sourceUrl: "https://www.joserizal.com/works/to-the-philippine-youth",
      extent: "Complete text · 10 stanzas",
      license: "Public domain",
      html: `
        <p class="poem-stanza">Hold high the brow serene, O youth, where now you stand;<br>Let the bright sheen<br>Of your grace be seen,<br>Fair hope of my fatherland!</p>
        <p class="poem-stanza">Come now, thou genius grand,<br>And bring down inspiration;<br>With thy mighty hand,<br>Swifter than the wind’s violation,<br>Raise the eager mind to higher station.</p>
        <p class="poem-stanza">Come down with pleasing light<br>Of art and science to the fight,<br>O youth, and there untie<br>The chains that heavy lie,<br>Your spirit free to blight.</p>
        <p class="poem-stanza">See how in flaming zone<br>Amid the shadows thrown,<br>The Spaniard’s holy hand<br>A crown’s resplendent band<br>Proffers to this Indian land.</p>
        <p class="poem-stanza">Thou, who now wouldst rise<br>On wings of rich emprise,<br>Seeking from Olympian skies<br>Songs of sweetest strain,<br>Softer than ambrosial rain;</p>
        <p class="poem-stanza">Thou, whose voice divine<br>Rivals Philomel’s refrain<br>And with varied line<br>Through the night benign<br>Frees mortality from pain;</p>
        <p class="poem-stanza">Thou, who by sharp strife<br>Wakest thy mind to life;<br>And the memory bright<br>Of thy genius’ light<br>Makest immortal in its strength;</p>
        <p class="poem-stanza">And thou, in accents clear<br>Of Phoebus, to Apelles dear;<br>Or by the brush’s magic art<br>Takest from nature’s store a part,<br>To fix it on the simple canvas’ length;</p>
        <p class="poem-stanza">Go forth, and then the sacred fire<br>Of thy genius to the laurel may aspire;<br>To spread around the fame,<br>And in victory acclaim,<br>Through wider spheres the human name.</p>
        <p class="poem-stanza">Day, O happy day,<br>Fair Filipinas, for thy land!<br>So bless the Power to-day<br>That places in thy way<br>This favor and this fortune grand!</p>
      `
    },
    "amor-patrio": {
      label: "From the essay — original Spanish",
      source: "Prosa por José Rizal, centenary edition (1961), via Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/El_Amor_Patrio",
      lang: "es",
      extent: "Excerpt · opening and closing",
      license: "Public domain",
      html: `
        <p class="work-text-subhead">El Amor Patrio</p>
        <p>He aquí un bello asunto y, por lo mismo que es bello, trilladísimo. Sabio, poeta, artista, labrador, comerciante o guerrero, viejo y joven, rey o esclavo, todos han pensado en él y le han dedicado los más preciados frutos de su inteligencia o de su corazón.</p>
        <p>… Sea, pues, cualquiera nuestra situación, amémosla siempre y no deseemos otra cosa que su bien. Así obraremos con el fin de la humanidad dictado por Dios, cual es la armonía y la paz universal de sus criaturas.</p>
        <p>Vosotros, los que habéis perdido el ideal de vuestras almas; los que, heridos en el corazón, visteis desaparecer una a una vuestras ilusiones, y semejantes a los árboles en otoño, os encontráis sin flores y sin hojas, y deseosos de amar no halláis nada digno de vosotros, ahí tenéis la patria, amadla.</p>
        <p>Amad, ¡oh, sí! pero no ya como la amaban en otro tiempo, practicando virtudes feroces, negadas y reprobadas por una verdadera moral y por la madre naturaleza; no haciendo gala de fanatismo, de destrucción y de crueldad, no; más risueña aurora aparece en el horizonte, de luces suaves y pacíficas, mensajera de la vida y de la paz; la aurora, en fin, verdadera del cristianismo, présaga de días felices y tranquilos. Deber nuestro será seguir los áridos pero pacíficos y productivos senderos de la ciencia que conducen al progreso, y de ahí a la unión deseada y pedida por Jesucristo en la noche de su dolor.</p>
        <p class="work-text-subhead">Laong Laan · Barcelona, Junio, 1882</p>
      `
    },
    "filipinas-dentro-de-cien-anos": {
      label: "From the essay — opening",
      source: "The Philippines A Century Hence, trans. Charles Derbyshire (1912), via Project Gutenberg",
      sourceUrl: "https://www.gutenberg.org/ebooks/35899",
      extent: "Excerpt",
      license: "Public domain in the United States",
      html: `
        <p>Following our usual custom of facing squarely the most difficult and delicate questions relating to the Philippines, without weighing the consequences that our frankness may bring upon us, we shall in the present article treat of their future.</p>
        <p>In order to read the destiny of a people, it is necessary to open the book of its past, and this, for the Philippines, may be reduced in general terms to what follows.</p>
        <p>Scarcely had they been attached to the Spanish crown than they had to sustain with their blood and the efforts of their sons the wars and ambitions of conquest of the Spanish people, and in these struggles, in that terrible crisis when a people changes its form of government, its laws, usages, customs, religion and beliefs the Philippines were depopulated, impoverished and retarded—caught in their metamorphosis, without confidence in their past, without faith in their present and with no fond hope for the years to come.</p>
      `
    },
    "sobre-la-indolencia-de-los-filipinos": {
      label: "From the essay — opening",
      source: "The Indolence of the Filipino, trans. Charles Derbyshire (1913), via Project Gutenberg",
      sourceUrl: "https://www.gutenberg.org/ebooks/6885",
      extent: "Excerpt",
      license: "Public domain in the United States",
      html: `
        <p>Doctor Sancianco, in his <em>Progreso de Filipinas</em>, has taken up this question, agitated, as he calls it, and, relying upon facts and reports furnished by the very same Spanish authorities that rule the Philippines, has demonstrated that such indolence does not exist, and that all said about it does not deserve reply or even passing notice.</p>
        <p>When in consequence of a long chronic illness the condition of the patient is examined, the question may arise whether the weakening of the fibers and the debility of the organs are the cause of the malady’s continuing or the effect of the bad treatment that prolongs its action. The attending physician attributes the entire failure of his skill to the poor constitution of the patient, to the climate, to the surroundings, and so on. On the other hand, the patient attributes the aggravation of the evil to the system of treatment followed. Only the common crowd, the inquisitive populace, shakes its head and cannot reach a decision.</p>
      `
    },
    "liham-sa-mga-kadalagahan-sa-malolos": {
      label: "From the letter — original Tagalog",
      source: "Ang Liham ni Dr. Jose Rizal sa mga Kadalagahan sa Malolos, via Project Gutenberg",
      sourceUrl: "https://www.gutenberg.org/ebooks/17116",
      lang: "tl",
      extent: "Excerpt · opening",
      license: "Public domain in the United States",
      html: `
        <p class="work-text-subhead">Europa, Pebrero 1889 — Sa mga kababayang dalaga sa Malolos:</p>
        <p>Nang aking sulatin ang Noli Me Tangere, tinanong kong laon, kung ang pusuang dalaga’y karaniwan kaya diyan sa ating bayan. Matay ko mang sinaliksik yaring alaala; matay ko mang pinagisa-ngisa ang lahat ñg dalagang makilala sapul sa pagkabatá, ay mañgisa-ñgisa lamang ang sumaguing larawang aking ninanasá. Tunay at labis ang matamis na loob, ang magandang ugalí, ang binibining anyó, ang mahinhing asal; ñgunit ang lahat na ito’y laguing nahahaluan ñg lubos na pagsuyó at pagsunod sa balang sabi ó hiling nang nagñgañgalang amang kalulua: anaki’y mga lantang halaman, sibul at laki sa dilim; mamulaklak ma’y walang bañgo, magbuñga ma’y walang katas.</p>
        <p>Ñgayong tumugon kayo sa uhaw naming sigaw ñg ikagagaling ñg bayan; ñgayong nagpakita kayo ñg mabuting halimbawa sa kapuá dalagang nagnanasang paris ninyong mamulat ang mata at mahañgo sa pagkalugamí, sumisigla ang aming pag-asa, inaaglahì ang sakuná, sa pagka at kayo’y katulong na namin, panatag ang loob sapagtatagumpay.</p>
      `
    },
    "me-piden-versos": {
      label: "The complete poem — original Spanish",
      source: "Me piden versos, via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Me_piden_versos",
      lang: "es",
      extent: "Complete text · 6 stanzas · original spelling",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p class="poem-stanza">Piden que pulse la lira<br>Ha tiempo callada y rota:<br>Si ya no arranco una nota<br>Ni mi musa ya me inspira!<br>Balbuce fria y delira<br>Si la tortura mi mente;<br>Cuando rie solo miente;<br>Como miente su lamento:<br>Y es que en mi triste aislamiento<br>Mi alma ni goza ni siente.</p>
        <p class="poem-stanza">Hubo un tiempo ... y es verdad!<br>Pero ya aquel tiempo huyo,<br>En que vate me llamo<br>La indulgencia a la amistad.<br>Ahora de aquella edad<br>El recuerdo apensas resta<br>Como quendan de una fiesta<br>Los misteriosos sonidos<br>Que retienen los oidos<br>Del bullicio de la orquesta.</p>
        <p class="poem-stanza">Soy planta apenas crecida<br>Arrancada del Oriente,<br>Donde es perfume el ambiente,<br>Donde es un sueno la vida:<br>Patria que jamas se olvida!<br>Ensenaronme a cantar<br>Las aves, con su trinar;<br>Con su rumor, las cascadas;<br>Y en sus playas dilatadas,<br>Los murmurios de la mar.</p>
        <p class="poem-stanza">Mientras en la infancia mia<br>Pude a su sol sonreir,<br>Dentro de mi pecho hervir<br>Volcan de fuego sentia;<br>Vate fui, porque queria<br>Con mis versos, con mi aliento,<br>Decir al rapido viento:<br>Vuela; su fama pregona!<br>Cantala de zona en zona;<br>De la tierra al firmamento!</p>
        <p class="poem-stanza">La deje! ... mis patrios lares.<br>Arbol despojados y seco!<br>Ya no repiten el eco<br>De mis pasados cantares<br>Yo cruce los vastos mares<br>Ansiando cambiar de suerte,<br>Y mi locura no advierte<br>Que en vez del bien que buscaba,<br>El mar conmigo surcaba<br>El espectro de la muerte.</p>
        <p class="poem-stanza">Toda mis hermosa ilusion,<br>Amor, entusiasmo, anhelo,<br>Alla quedan bajo el cielo<br>De tan florida región:<br>No pidais al corazon<br>Cantos de amor, que esta yerto;<br>Porque en medio del desierto<br>Donde discurro sin calma,<br>Siento que agoniza el alma<br>Y mi numen esta muerto.</p>
      `
    },
    "por-la-educacion-recibe-lustre-la-patria": {
      label: "From the poem — original Spanish",
      source: "Por la educación, via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Por_la_educaci%C3%B3n",
      lang: "es",
      extent: "Excerpt · stanzas 2–3",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p class="poem-stanza">Por ella sacrifica su existencia<br>El mortal y el placido reposo;<br>Por ella nacer vence el arte y la ciencia<br>Que ciñen al humano lauro hermoso:<br>Y cual del alto monte en la eminencia<br>Brota el puro raudal de arroyo undoso;<br>Así la educación da sin mesura<br>A la patria do mora paz segura.</p>
        <p class="poem-stanza">Do sabia educación trono levanta<br>Lozana juventud robusta crece<br>Que subyuga el error con firme planta<br>Y con nobles ideas se engrandece:<br>Del vicio la cerviz ella quebranta;<br>Negro crimen ante ella palidece:<br>Ella domina bárbaras naciones,<br>Y de salvajes hace campeones.</p>
      `
    },
    "a-la-virgen-maria": {
      label: "The complete sonnet — English translation",
      source: "The hero of the Filipinos, Appendix A (1923), trans. C. E. R.",
      sourceUrl: "https://www.gutenberg.org/ebooks/73848",
      extent: "Complete text · 2 stanzas, OCR-normalized",
      license: "Public domain in the United States",
      html: `
        <p class="poem-stanza">Dear Mary, soul of peace, our consolation,<br>That to the heavy-stricken heart doth bring<br>The cool sweet waters from the all-healing spring,<br>From that skied throne where since thy coronation<br>Our hearts are bowed in tender adoration,<br>Lean down to hear my grief’s vague whispering,<br>And o’er me, bruised and broken, deign to fling<br>The shining robe of thy serene salvation.</p>
        <p class="poem-stanza">Thou art my mother, placid Mary; thou<br>Mine only hope, my one sure source of strength.<br>Wild is the sea and inky dark the night.<br>One beacon shines! — the star upon thy brow.<br>Sharp sin assails me; but thy look at length<br>Puts sin and grief and thoughts of death to flight!</p>
        <p class="work-text-subhead">Written in Manila, about 1880 · translated by C. E. R.</p>
      `
    },
    "a-las-flores-de-heidelberg": {
      label: "The complete poem — English translation",
      source: "The hero of the Filipinos, Appendix A (1923), trans. Charles Derbyshire",
      sourceUrl: "https://www.gutenberg.org/ebooks/73848",
      extent: "Complete text · 7 stanzas, OCR-normalized",
      license: "Public domain in the United States",
      html: `
        <p class="poem-stanza">Go to my native land, go, foreign flowers,<br>Sown by the traveler on his way;<br>And there, beneath its azure sky,<br>Where all of my affections lie;<br>There from the weary pilgrim say,<br>What faith is his in that land of ours!</p>
        <p class="poem-stanza">Go there and tell how when the dawn,<br>Her early light diffusing,<br>Your petals first flung open wide;<br>His steps beside chill Neckar drawn,<br>You see him silent by your side,<br>Upon its Spring perennial musing.</p>
        <p class="poem-stanza">Saw how when morning’s light,<br>All your fragrance stealing,<br>Whispers to you as in mirth<br>Playful songs of love’s delight,<br>He, too, murmurs his love’s feeling<br>In the tongue he learned at birth.</p>
        <p class="poem-stanza">That when the sun on Koenigstuhl’s height<br>Pours out its golden flood,<br>And with its slowly warming light<br>Gives life to vale and grove and wood,<br>He greets that sun, here only upraising,<br>Which in his native land is at its zenith blazing.</p>
        <p class="poem-stanza">And tell there of that day he stood,<br>Near to a ruin’d castle gray,<br>By Neckar’s banks, or shady wood,<br>And pluck’d you from beside the way;<br>Tell, too, the tale to you addressed,<br>And how with tender care,<br>Your bending leaves he press’d<br>’Twixt pages of some volume rare.</p>
        <p class="poem-stanza">Bear then, O flowers, love’s message bear;<br>My love to all the lov’d ones there,<br>Peace to my country — fruitful land —<br>Faith whereon its sons may stand,<br>And virtue for its daughters’ care;<br>All those beloved creatures greet,<br>That still around home’s altar meet.</p>
        <p class="poem-stanza">And when you come unto its shore,<br>This kiss I now on you bestow,<br>Fling where the winged breezes blow;<br>That borne on them it may hover o’er<br>All that I love, esteem, and adore.<br>But though, O flowers, you come unto that land,<br>And still perchance your colors hold;<br>So far from this heroic strand,<br>Whose soil first bade your life unfold,<br>Still here your fragrance will expand;<br>Your soul that never quits the earth<br>Whose light smiled on you at your birth.</p>
        <p class="work-text-subhead">Translated by Charles Derbyshire</p>
      `
    },
    "el-canto-del-viajero": {
      label: "The complete poem — English translation",
      source: "The Song of the Traveler, The hero of the Filipinos, Appendix A (1923), trans. Arthur P. Ferguson",
      sourceUrl: "https://www.gutenberg.org/ebooks/73848",
      extent: "Complete text · 8 stanzas, OCR-normalized",
      license: "Public domain in the United States",
      html: `
        <p class="poem-stanza">Like to a leaf that is fallen and withered,<br>Tossed by the tempest from pole unto pole;<br>Thus roams the pilgrim abroad without purpose,<br>Roams without love, without country or soul.</p>
        <p class="poem-stanza">Following anxiously treacherous fortune,<br>Fortune which e’en as he grasps at it flees;<br>Vain though the hopes that his yearning is seeking,<br>Yet does the pilgrim embark on the seas!</p>
        <p class="poem-stanza">Ever impelled by the invisible power,<br>Destined to roam from the East to the West;<br>Oft he remembers the faces of loved ones,<br>Dreams of the day when he, too, was at rest.</p>
        <p class="poem-stanza">Chance may assign him a tomb on the desert,<br>Grant him a final asylum of peace;<br>Soon by the world and his country forgotten,<br>God rest his soul when his wanderings cease!</p>
        <p class="poem-stanza">Often the sorrowing pilgrim is envied,<br>Circling the globe like a sea-gull above;<br>Little, ah, little they know what a void<br>Saddens his soul by the absence of love.</p>
        <p class="poem-stanza">Home may the pilgrim return in the future,<br>Back to his loved ones his footsteps he bends;<br>Naught will he find but the snow and the ruins,<br>Ashes of love and the tomb of his friends,</p>
        <p class="poem-stanza">Pilgrim, begone! Nor return more hereafter,<br>Stranger thou art in the land of thy birth;<br>Others may sing of their love while rejoicing,<br>Thou once again must roam o’er the earth.</p>
        <p class="poem-stanza">Pilgrim, begone! Nor return more hereafter,<br>Dry are the tears that a while for thee ran;<br>Pilgrim, begone! And forget thine affliction,<br>Loud laughs the world at the sorrows of man.</p>
        <p class="work-text-subhead">Translated by Arthur P. Ferguson</p>
      `
    },
    "mi-retiro": {
      label: "From the poem — opening, English translation",
      source: "My Retreat, The hero of the Filipinos, Appendix A (1923), trans. Charles Derbyshire",
      sourceUrl: "https://www.gutenberg.org/ebooks/73848",
      extent: "Excerpt · first 3 stanzas, OCR-normalized",
      license: "Public domain in the United States",
      html: `
        <p class="poem-stanza">By the spreading beach where the sands are soft and fine,<br>At the foot of the mount in its mantle of green,<br>I have built my hut in the pleasant grove’s confine;<br>From the forest seeking peace and a calmness divine,<br>Rest for the weary brain and silence to my sorrow keen.</p>
        <p class="poem-stanza">Its roof the frail palm-leaf and its floor the cane,<br>Its beams and posts of the unhewn wood;<br>Little there is of value in this hut so plain,<br>And better by far in the lap of the mount to have lain,<br>By the song and the murmur of the high sea’s flood.</p>
        <p class="poem-stanza">A purling brook from the woodland glade<br>Drops down o’er the stones and around it sweeps,<br>Whence a fresh stream is drawn by the rough cane’s aid;<br>That in the still night its murmur has made,<br>And in the day’s heat a crystal fountain leaps.</p>
      `
    },
    "himno-al-trabajo": {
      label: "From the poem — English translation",
      source: "Hymn to Labor, Rizal’s Own Story of His Life (1918), trans. Charles Derbyshire",
      sourceUrl: "https://www.gutenberg.org/ebooks/48438",
      extent: "Excerpt · first 2 stanzas and chorus",
      license: "Public domain in the United States",
      html: `
        <p class="work-text-subhead">Men</p>
        <p class="poem-stanza">Now the east with light is reddening,<br>And to our fields and tasks we fare;<br>By the toil of man sustaining<br>Life and home and country there.</p>
        <p class="poem-stanza">Though the earth be hard and stubborn,<br>And the sun unpitying glow,<br>For our country and our homes<br>Love an easy way will show.</p>
        <p class="work-text-subhead">Chorus</p>
        <p class="poem-stanza">For his country in peace,<br>For his country in war,<br>Let the Filipino work,<br>Let him live, let him die.</p>
      `
    },
    "el-consejo-de-los-dioses": {
      label: "From the play — opening scene, original Spanish",
      source: "Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/El_Consejo_de_los_Dioses",
      lang: "es",
      extent: "Excerpt · opening scene",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>Júpiter, sentado en el trono de oro y piedras preciosas y llevando en la mano el cetro de ciprés, tiene a sus pies el águila, cuyo plumaje de acero refleja mil diversos colores: los rayos, sus terribles armas, yacen en el suelo. A su derecha está su esposa, la celosa JUNO, con refulgente diadema y el vanidoso pavo real. A su izquierda, la sabia Palas (Minerva), hija y consejera, adornada de su casco y terrible égida, ciñiendo el verde olivo y sosteniendo gallardamente su pesada lanza. Formando severo contraste está Saturno, acurrucado y mirando desde lejos tan hermoso grupo. En gracioso desorden hállase la hermosa VENUS, recostada en un lecho de rosas, coronada de oloroso mirto, y acariciando al AMOR; el divino APOLO, que pulsa blandamente su lira de oro y nácar y jugando con las ocho Musas, mientras que Marte, Belona, Alcides y Momo cierran aquel círculo escogido. Detrás de Júpiter y de Juno se hallan Hebe y Ganimedes. Hacia el lado derecho de Júpiter se halla la Justicia, sentada en su trono, teniendo en las manos sus atributos.</p>
      `
    },
    "como-se-gobiernan-las-filipinas": {
      label: "From the essay — opening, original Spanish",
      source: "Cómo se gobiernan las Filipinas, via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/C%C3%B3mo_se_gobiernan_las_Filipinas",
      lang: "es",
      extent: "Excerpt · opening",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>De algunos años a esta parte el porvenir de aquellas islas preocupa, no sólo a sus habitantes que son los que están más interesados, sino también a muchos peninsulares que hasta hace muy poco ignoraban quizás su situación geográfica y la raza que las habita, etnográficamente hablando.</p>
        <p>Todos ven, todos presienten, todos están convencidos de que aquello va mal, de que algo allí deja mucho que desear; unos lo atribuyen a una cosa, otros a otra. Los mismos partidarios del gobierno allí imperante convienen en que existen males necesarios, sin sospechar que caen en una gran ridiculez o en un atraso de ideas lamentable. Decirle a un enfermo que su enfermedad es necesaria y que no debe tratar de combatirla es volver a los primitivos tiempos de la Medicina, es confesarse impotente; médico que diga tal cosa a su paciente, debe aconsejarle consulte otras lumbreras.</p>
      `
    },
    "los-viajes": {
      label: "From the essay — opening, original Spanish",
      source: "Los Viajes, Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/Los_Viajes",
      lang: "es",
      extent: "Excerpt · opening",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>¿Quién es el que no ha viajado? ¿Quién no ama los viajes, si son el sueño de la juventud al sentir por primera vez la conciencia de la vida, si son un libro para la edad madura, cuando el ansia de saber ocupa el espíritu, y, en fin, son el último adiós del anciano cuando se despide del Mundo para emprender el más misterioso de los caminos?</p>
        <p>El viaje es un capricho en la niñez, una pasión en el joven, una necesidad en los hombres y una elegía en los ancianos.</p>
        <p>Es tan innato en el hombre el deseo de viajar como el saber, que no parece sino que la Providencia lo ha puesto en cada uno de nosotros, para que aguijoneados por él estudiemos y admiremos sus obras, nos comuniquemos y fraternicemos los que nos hallamos separados por las distancias, y unidos formemos una sola familia, aspiración de todos los pensadores.</p>
      `
    },
    "revista-de-madrid": {
      label: "From the article — opening, original Spanish",
      source: "Revista de Madrid, Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/Revista_de_Madrid",
      lang: "es",
      extent: "Excerpt · opening",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>El frío ha acentuado.</p>
        <p>Los árboles se van despojando de sus pomposas galas, y convertidos en secos esqueletos, completan la melancolía de los nebulosos días. Una fina lluvia, un viento más fino aun, horrible, helado que viene del Guadarrama, como si este le recordase a Madrid que no en vano se levanta al norte; el piso a veces blanco y resbaladizo, una espesa niebla que envuelve todos los objetos en su blanquecino velo, dándoles un aspecto y una expresión particular, he aquí los tonos y matices de este penúltimo mes del año, las sencillas notas de su canto fúnebre entonado a la muerte de la naturaleza.</p>
        <p>Con la caída de las hojas, van cayendo también muchos enfermos y ¡cuantos no descienden al sepulcro! Los pordioseros se han aumentado tan pronto como la estación ha traido nuevas necesidades.</p>
      `
    },
    "la-vision-de-fr-rodriguez": {
      label: "From the pamphlet — opening scene, original Spanish",
      source: "La Visión de Fr. Rodriguez, Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/La_Visi%C3%B3n_De_Fr._Rodriguez",
      lang: "es",
      extent: "Excerpt · opening scene",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>Arrellanado en un cómodo sillón, y satisfecho de sí mismo y de lo que había cenado, estaba una noche Fr. José Rodriguez soñando en los cuartos que con sus libritos sacaba de los bolsillos filipinos, cuando de repente, cual si por arte de encantamiento, tomó un blanco brillantísimo la amarilla luz del quinqué, el aire se llenó de un suave perfume, y un hombre se presentó sin saberse de donde ni como vino.</p>
        <p>Era éste un anciano de mediana estatura, moreno, delgado, cuya barba blanca contrastaba con unos ojos vivos y brillantes, que prestaban a su semblante una animación extraordinaria. Cubría sus hombros una capa pluvial, y su cabeza una mitra, que con el báculo que llevaba en la mano, le daba el aspecto de un obispo.</p>
        <p>Al verle Fr. Rodriguez murmuró bostezando:</p>
        <p>—¡Ensueños de mi fecunda imagi…!</p>
        <p>La visión no le dejó concluir la frase; sacudióle con el báculo en el cogote.</p>
        <p>—¡Eh! ¡Bromas pesadas! —exclamó el fraile cogiéndose la parte dolorida, mientras se frotaba un ojo;— ya veo que no es un sueño, pero ¡compare!</p>
      `
    },
    "por-telefono": {
      label: "From the handbill — opening, original Spanish",
      source: "Por Teléfono, Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/Por_Tel%C3%A9fono",
      lang: "es",
      extent: "Excerpt · opening",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>El año de 1900 se unían por primera vez las Filipinas a la Metrópoli por medio del hilo telefónico tendido por una sociedad anglo-catalana, llamada The Trans-Oceanic Telephone Company, tan conocida en su tiempo por sus ideas verdaderamente atrevidas.</p>
        <p>Gracias a la perfección de los aparatos se podían oir desde Madrid los suspiros místicos de los frailes, orando delante de las imágenes sagradas, sus rezos llenos de piedad, sus frases humildes, sus palabras de conformidad y resignación y hasta las acciones de gracias con que recibían las limosnas de arroz y sardinas que el pueblo les daba compadecido de sus ayunos y abstinencias. Tal era la perfección del teléfono, que se oía hasta el silencio que reinaba en los refectorios, y por el ruido de la masticación se sabía a ciencia cierta que el más glotón de los frailes no comía arriba de cinco bocados diarios.</p>
        <p>—¡Qué pobres y qué virtuosos son estos sacerdotes! exclamaban en Madrid los demócratas conmovidos.</p>
        <p>—¡Qué pobres y qué virtuosos son estos sacerdotes! repetía el teléfono en Filipinas y lo publicaba en todas partes, en los conventos, iglesias, etcétera.</p>
      `
    },
    "makamisa": {
      label: "From the novel — opening, original Tagalog",
      source: "Makamisa, Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/Makamisa",
      lang: "tl",
      extent: "Excerpt · opening",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>Tumigil ang tugtugan at natapos ang misa ni Pare Agaton.</p>
        <p>Humugong ang simbahan sa bulong-bulungan at sagadsaran ng̃ mg̃a chinelas ñg nag̃agsisilabas. Sagilsilan at pawisan sa init at antok, ang iba’y kukurap-kurap, ang iba’y naghihikab at ga kumukurus pa, ay nagtutulakan sa pagdukuang ñg benditang nakalagay sa dalawang mangkok na pingas, malapit sa pintuan. Sa pagdadagildilan ay may batang umaatug̃al, matandang nagmumurá at nagbubulâ ang labi, may dalagang naninikó, kunot ang noo’t pairap sa kalapit na binata, na tila bagá mauubusan ng tubig na maruming tila na putikang tirahan ng kiti-kiti. Gayon ang pagaagawang maisawsaw ang daliri, málahid man lamang maikurus sa noo, batok, puson at iba’t iba pang sangkap ng katawan. Taás ng̃ mg̃a lalaki ang hawak na salakot o sambalilo kaya, sa takot na madurog; pigil na magaling ng̃ mg̃a babai ang panyo sa ulo at baka mahulog; may nakukusamot na damit, may napupunit na manipis na kayo, may nahuhulugan ng chinelas at nagpupumilit magbalik at nang makuha, g̃uni’t nadadalá ng̃ karamihang tulak ng̃ mg̃a punong bayang lumalabas na taás ang yantok, tanda ng̃ kanilang kapangyarihan.</p>
        <p>Ano pa’t sa isang hindi nakababatid ng̃ ugali sa katagalugan, ang dagildilang ito’t pagaagawan sa tubig ay makakatakut at maiisip na nasusunog ang simbahan, kundangan lamang at may ilang nagpatirang babaeng may loob sa Dios, na hindi lumalabas kundi nagdarasal ng̃ pasigaw at naghihiyawan na tila bagá ibig sabihin:</p>
      `
    },
    "mariang-makiling": {
      label: "From the tale — opening, original Spanish",
      source: "Mariang Makiling, Prosa por José Rizal, centenary edition (1961), via Spanish Wikisource",
      sourceUrl: "https://es.wikisource.org/wiki/Prosa_por_Jos%C3%A9_Rizal/Mariang_Makiling",
      lang: "es",
      extent: "Excerpt · opening",
      license: "Original public domain; Wikisource transcription CC BY-SA 4.0",
      licenseUrl: "https://creativecommons.org/licenses/by-sa/4.0/",
      html: `
        <p>En mi pueblo se conserva una leyenda, la leyenda de Mariang Makíling.</p>
        <p>Era una joven que habitaba el hermoso monte que separa las provincias de La Laguna y Tayabas. Jamás se supo a punto fijo el lugar de su morada, porque los que tuvieron la fortuna de dar con ella después de vagar mucho tiempo como perdidos en los bosques, ni han podido volver, ni han sabido encontrar el camino, ni están conformes en el sitio ni en su descripción. Mientras unos le dan por morada un hermoso palacio, brillante como un relicario de oro, rodeado de jardines y hermosos parques, otros afirman que sólo vieron una miserable choza, de techo remendado, y dindines de sawali. Semejante contradicción puede dar lugar a que se crea que tanto unos como otros mienten donosamente, es verdad; pero puede deberse también a que Mariang Makíling tuviese dos viviendas como muchas personas acomodadas.</p>
        <p>Según testigos oculares, era ella una joven, alta, esbelta, de grandes y negros ojos, larga y abundante cabellera. Su color era un moreno limpio y claro, el Kayumanging-Kaligatan que dicen los tagalos; sus manos y pies, pequeños y delicadísimos, y la expresión de su rostro, siempre grave y seria: era una criatura fantástica, mitad ninfa, mitad sílfide, nacida a los rayos de la luna de Filipinas, en el misterio de sus augustos bosques, y al arrullo de las olas del vecino lago.</p>
      `
    },
    "rizal-s-own-story-of-his-life": {
      label: "From the memoir — My Boyhood, chapter II",
      source: "Rizal’s Own Story of His Life, ed. Austin Craig (1918), via Project Gutenberg",
      sourceUrl: "https://www.gutenberg.org/ebooks/48438",
      extent: "Excerpt · My Schooling in Binan",
      license: "Public domain in the United States",
      html: `
        <p>Binan is a town about one and one-half hour’s drive from my own town, Kalamba. My father was born in Binan, and he wished me to go there to continue the study of Latin, which I had just begun. He sent me over one Sunday in the care of my brother. The parting from my family was tearful on the side of my parents and my sisters, but I was nine years old and managed to hide my own tears. We reached Binan at nightfall. We went to an aunt’s house where I was to live. When the moon came up, a cousin took me around the town. Binan appeared to me large and wealthy but neither attractive nor cheerful.</p>
        <p>My brother left me after he presented me to the schoolmaster, who, it seemed, had been his own teacher. The schoolmaster was a tall, thin man with a long neck and a sharp nose. His body leaned slightly forward. He wore a shirt of sinamay that had been woven by the deft fingers of Batangas women. He knew Latin and Spanish grammar by heart; but his severity, I believe now, was too great. This is all that I remember of him. His classroom was in his own house, only some thirty meters from my aunt’s home.</p>
        <p>When I entered the classroom for the first time, he said to me:</p>
        <p>“You, do you speak Spanish?”<br>“A little, sir,” I answered.<br>“Do you know Latin?”<br>“A little, sir,” I again answered.</p>
      `
    },
    "memorias-de-un-estudiante-de-manila": {
      label: "From the memoir — chapter VI, original Spanish",
      source: "Memorias de un estudiante de Manila, chapter VI, Revista Filipina (Verano 2022), via Carayan Press",
      sourceUrl: "https://revista.carayanpress.com/page16/page299/page291/memoriasrizal.html",
      lang: "es",
      extent: "Excerpt · chapter VI opening",
      license: "Original Spanish public domain; digital edition credited to Revista Filipina / Carayan Press",
      html: `
        <p>Despiértate, corazón, vuelve a encender tu apagada lumbre para que a su calor recuerdes aquel tiempo al cual no me atrevo a juzgar. Ve, mente pensadora, y recorre de nuevo aquellos lugares, aquellos momentos en que bebiste junto con el néctar la amarga hiel de los amores y desengaños.</p>
        <p>… Después de la vacaciones de aquel memorable año, busqué una casa en Intramuros y la encontré en la calle de la Solana, cuyo casero era un sacerdote. Mi madre decía que con lo que sabía, me bastaba ya, y no volviera más a Manila. ¿Habrá mi madre tenido presentimiento de lo que me iba a suceder? ¿Tendrá en efecto doble vista el corazón de las madres?</p>
      `
    },
    "letters-to-ferdinand-blumentritt": {
      label: "From a letter to Blumentritt — on Noli Me Tangere",
      source: "The hero of the Filipinos (1923), quoting Rizal’s letter to Ferdinand Blumentritt",
      sourceUrl: "https://www.gutenberg.org/ebooks/73848",
      extent: "Excerpt · letter about the novel, OCR-normalized",
      license: "Public domain in the United States",
      html: `
        <p>The novel tells of many things that until now have not been touched upon. They are so peculiar to ourselves that we have been sensitive about them. In this book I have attempted what no one else seems to have been willing to do. For one thing, I have dared to answer the calumnies that for centuries have been heaped upon us and upon our country.</p>
        <p>I have written of the social condition of the Philippines and of the life of the Filipinos. I have told the truth about our beliefs, our hopes, our longings, our complaints, and our sorrows. I have tried to show the difference between real religion and the hypocrisy that under its cloak has impoverished and brutalized us.</p>
        <p>The incidents that I have related are all true and have actually occurred.</p>
      `
    },
    "tribute-to-blumentritt": {
      label: "The last letter to Blumentritt",
      source: "National Museum of the Philippines, Ferdinand Blumentritt",
      sourceUrl: "http://rizal.nationalmuseum.gov.ph/scholar/ferdinand-blumentritt",
      extent: "Complete short letter",
      license: "Original letter public domain; English wording credited to the National Museum of the Philippines",
      html: `
        <p class="work-text-subhead">Fort Santiago, 29 December 1896</p>
        <p>My dear Brother, When you receive this letter, I shall be dead by then. Tomorrow at seven, I shall be shot; but I am innocent of the crime of rebellion. I am going to die with a tranquil conscience. Adieu, my best, my dearest friend, and never think ill of me!</p>
        <p class="work-text-subhead">José Rizal</p>
      `
    }
  };

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
    button.id = `work-${slug}`;
    li.id = slug;
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
    const textInfo = TEXT_EXCERPTS[slug];
    work.searchText = [
      titleText, work.meta, work.summary, category,
      extra.context, extra.why, fallback.context, fallback.why,
      textInfo && textInfo.html.replace(/<[^>]*>/g, " ")
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
  const textSection = $("detail-text-section");
  const textLabel = $("detail-text-label");
  const textSource = $("detail-text-source");
  const textBody = $("detail-text");
  const textNote = $("detail-text-note");

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

    const textInfo = TEXT_EXCERPTS[work.slug];
    textSection.hidden = !textInfo;
    textBody.replaceChildren();
    if (textInfo) {
      textLabel.textContent = textInfo.label || "From the work";
      textSource.replaceChildren(document.createTextNode((textInfo.source || "") + " "));
      if (textInfo.sourceUrl) {
        const sourceLink = document.createElement("a");
        sourceLink.href = textInfo.sourceUrl;
        sourceLink.target = "_blank";
        sourceLink.rel = "noopener noreferrer";
        sourceLink.textContent = "View source ↗";
        textSource.append(sourceLink);
      }
      textBody.innerHTML = textInfo.html;
      if (textInfo.lang) {
        textBody.setAttribute("lang", textInfo.lang);
      } else {
        textBody.removeAttribute("lang");
      }
      const noteParts = [textInfo.extent || "Excerpt", textInfo.license].filter(Boolean);
      textNote.replaceChildren(document.createTextNode(noteParts.join(" · ")));
      if (textInfo.licenseUrl) {
        const licenseLink = document.createElement("a");
        licenseLink.href = textInfo.licenseUrl;
        licenseLink.target = "_blank";
        licenseLink.rel = "noopener noreferrer";
        licenseLink.textContent = "License details ↗";
        textNote.append(document.createTextNode(" · "), licenseLink);
      }
    }

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

  // Links from the Own Words page open the matching work dialog directly.
  function openFromHash() {
    let slug = window.location.hash.slice(1);
    try { slug = decodeURIComponent(slug); } catch (_) { /* keep the raw hash */ }
    if (!slug) return;
    const work = works.find((candidate) => candidate.slug === slug);
    if (!work) return;
    open(work, visibleWorks.includes(work) ? visibleWorks : works, work.trigger);
  }
  window.addEventListener("hashchange", openFromHash);
  openFromHash();
})();
