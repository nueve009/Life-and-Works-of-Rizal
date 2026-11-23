// Expanded quiz: four ten-question sets, each with an explanation and a study link.
const SOURCES = {
  birth: { label: "Timeline: birth and early life", url: "timeline.html" },
  education: { label: "Timeline: education", url: "timeline.html#education" },
  family: { label: "Timeline: family", url: "timeline.html#family" },
  people: { label: "Timeline: significant people", url: "timeline.html#people" },
  travels: { label: "Timeline: travels", url: "timeline.html#travels" },
  exile: { label: "Timeline: exile in Dapitan", url: "timeline.html#exile" },
  manila: { label: "Places: Manila", url: "places.html#place-manila" },
  dapitan: { label: "Places: Dapitan", url: "places.html#place-dapitan" },
  paris: { label: "Places: Paris", url: "places.html#place-paris" },
  berlin: { label: "Places: Berlin", url: "places.html#place-berlin" },
  ghent: { label: "Places: Ghent", url: "places.html#place-ghent" },
  london: { label: "Places: London", url: "places.html#place-london" },
  bagumbayan: { label: "Places: Bagumbayan / Luneta", url: "places.html#place-bagumbayan" },
  noli: { label: "Work: Noli Me Tángere", url: "works.html#noli-me-tangere" },
  filibusterismo: { label: "Work: El Filibusterismo", url: "works.html#el-filibusterismo" },
  ultimo: { label: "Work: Mi Último Adiós", url: "works.html#mi-ultimo-adios" },
  amor: { label: "Work: Amor Patrio", url: "works.html#amor-patrio" },
  makamisa: { label: "Work: Makamisa", url: "works.html#makamisa" }
};

const quizSets = {
  easy: [
    {
      question: "Where was José Rizal born?",
      answers: ["Calamba, Laguna", "Dapitan, Mindanao", "Manila", "Cebu"],
      correct: 0,
      explain: "He was born in Calamba, Laguna, on 19 June 1861.",
      source: SOURCES.birth
    },
    {
      question: "On what date was Rizal born?",
      answers: ["December 30, 1861", "June 19, 1861", "June 12, 1898", "November 30, 1863"],
      correct: 1,
      explain: "His birthday was 19 June 1861; 30 December is the date of his execution.",
      source: SOURCES.birth
    },
    {
      question: "Where was Rizal exiled from 1892 to 1896?",
      answers: ["Cavite", "Dapitan", "Madrid", "Hong Kong"],
      correct: 1,
      explain: "After his return from Europe, Rizal was exiled to Dapitan in Mindanao.",
      source: SOURCES.exile
    },
    {
      question: "Which novel did Rizal publish first?",
      answers: ["El Filibusterismo", "Noli Me Tangere", "Mi Último Adiós", "La Solidaridad"],
      correct: 1,
      explain: "Noli Me Tángere appeared in 1887, four years before its sequel.",
      source: SOURCES.noli
    },
    {
      question: "Where was Rizal executed in 1896?",
      answers: ["Calamba", "Dapitan", "Bagumbayan", "Biñan"],
      correct: 2,
      explain: "He was executed at Bagumbayan, now Luneta/Rizal Park in Manila.",
      source: SOURCES.bagumbayan
    },
    {
      question: "Who were Rizal’s parents?",
      answers: [
        "Francisco Mercado and Teodora Alonso",
        "Paciano and Lucía Rizal",
        "Domingo Lam-co and Rosa Mercado",
        "Máximo Viola and Teodora Alonso"
      ],
      correct: 0,
      explain: "His father was Francisco Mercado and his mother was Teodora Alonso.",
      source: SOURCES.family
    },
    {
      question: "What was Rizal’s mother’s name?",
      answers: ["Teodora Alonso", "Rosa Mercado", "Lucía Rizal", "María Clara"],
      correct: 0,
      explain: "Teodora Alonso was one of his first teachers at home.",
      source: SOURCES.family
    },
    {
      question: "How many children were in Rizal’s family?",
      answers: ["Eleven", "Seven", "Five", "Fourteen"],
      correct: 0,
      explain: "José was the seventh of eleven children.",
      source: SOURCES.family
    },
    {
      question: "In which city did Rizal organize La Liga Filipina in 1892?",
      answers: ["Manila", "Cebu", "Dapitan", "Madrid"],
      correct: 0,
      explain: "He founded the civic association in Manila before his exile.",
      source: SOURCES.manila
    },
    {
      question: "What is the title of Rizal’s farewell poem?",
      answers: [
        "Mi Último Adiós",
        "A la Juventud Filipina",
        "Himno a Talisay",
        "Mi retiro"
      ],
      correct: 0,
      explain: "He hid “Mi Último Adiós” in a stove before his execution.",
      source: SOURCES.ultimo
    }
  ],
  medium: [
    {
      question: "Which Manila school did Rizal attend before studying at the University of Santo Tomas?",
      answers: [
        "Ateneo Municipal de Manila",
        "University of the Philippines",
        "Colegio de San Juan de Letran",
        "Escuela Normal"
      ],
      correct: 0,
      explain: "He studied at the Ateneo Municipal before moving on to Santo Tomas.",
      source: SOURCES.education
    },
    {
      question: "Which novel is the sequel to Noli Me Tangere?",
      answers: ["La Solidaridad", "El Filibusterismo", "Mi Último Adiós", "The Indolence of the Filipino"],
      correct: 1,
      explain: "El Filibusterismo was printed in 1891 as the darker sequel.",
      source: SOURCES.filibusterismo
    },
    {
      question: "Who is the main character who returns as Simoun in El Filibusterismo?",
      answers: ["Elias", "Basilio", "Crisóstomo Ibarra", "Isagani"],
      correct: 2,
      explain: "Crisóstomo Ibarra reappears in disguise as the jeweler Simoun.",
      source: SOURCES.filibusterismo
    },
    {
      question: "What kind of work is Mi Último Adiós?",
      answers: ["A novel about exile", "A speech in Madrid", "A farewell poem", "A medical journal"],
      correct: 2,
      explain: "It is a fourteen-stanza farewell poem written before his execution.",
      source: SOURCES.ultimo
    },
    {
      question: "What civic association did Rizal organize in Manila in 1892?",
      answers: ["La Liga Filipina", "Katipunan", "La Solidaridad", "Propaganda Committee"],
      correct: 0,
      explain: "La Liga Filipina was the reform association he founded that year.",
      source: SOURCES.manila
    },
    {
      question: "Which reform newspaper carried many of Rizal’s essays from Barcelona?",
      answers: ["La Solidaridad", "El Filibusterismo", "The Manila Times", "Diario de Manila"],
      correct: 0,
      explain: "La Solidaridad was founded by Filipinos in Barcelona in 1889.",
      source: SOURCES.amor
    },
    {
      question: "Who helped finance the Berlin printing of Noli Me Tángere in 1887?",
      answers: ["Máximo Viola", "Paciano Rizal", "Valentín Ventura", "Ferdinand Blumentritt"],
      correct: 0,
      explain: "Rizal borrowed money from his friend Máximo Viola to print the novel.",
      source: SOURCES.noli
    },
    {
      question: "Which three priests are honored in the dedication of El Filibusterismo?",
      answers: [
        "Gómez, Burgos, and Zamora",
        "Rizal, Paciano, and Blumentritt",
        "Ibarra, Elias, and Isagani",
        "Viola, Ventura, and Pastells"
      ],
      correct: 0,
      explain: "The novel is dedicated to the three priests executed in 1872.",
      source: SOURCES.filibusterismo
    },
    {
      question: "What did Rizal build with his students in Dapitan?",
      answers: [
        "A relief map of Mindanao",
        "A printing press",
        "A school observatory",
        "A stone bridge"
      ],
      correct: 0,
      explain: "He and his students made a relief map of Mindanao for the town plaza.",
      source: SOURCES.dapitan
    },
    {
      question: "In which European city was El Filibusterismo printed in 1891?",
      answers: ["Ghent", "Madrid", "Heidelberg", "Barcelona"],
      correct: 0,
      explain: "The sequel was printed in Ghent with help from Valentín Ventura.",
      source: SOURCES.ghent
    }
  ],
  hard: [
    {
      question: "Which medical specialty did Rizal pursue in Paris and Heidelberg?",
      answers: ["Surgery", "Ophthalmology", "Pediatrics", "Psychiatry"],
      correct: 1,
      explain: "He trained as an eye doctor, including work with eye specialists in Europe.",
      source: SOURCES.paris
    },
    {
      question: "Which degree did Rizal earn in Madrid in 1884?",
      answers: ["Law", "Philosophy", "Medicine", "Engineering"],
      correct: 2,
      explain: "He completed his medical degree at the Universidad Central de Madrid.",
      source: SOURCES.education
    },
    {
      question: "Who was Rizal’s older brother and trusted adviser?",
      answers: ["Paciano Rizal", "Ferdinand Blumentritt", "Marcelo H. del Pilar", "Graciano López Jaena"],
      correct: 0,
      explain: "Paciano, his older brother, supported him throughout his studies and exile.",
      source: SOURCES.family
    },
    {
      question: "Why was Rizal leaving Dapitan in 1896 when he was arrested?",
      answers: [
        "To attend university in Madrid",
        "To serve as a doctor in Cuba",
        "To publish a new novel in Hong Kong",
        "To join a diplomatic mission in Japan"
      ],
      correct: 1,
      explain: "He had volunteered for medical service in Cuba when he was arrested.",
      source: SOURCES.travels
    },
    {
      question: "Who was the Austrian scholar and close correspondent of Rizal?",
      answers: ["Otto Becker", "Ferdinand Blumentritt", "Félix Resurrección Hidalgo", "Pablo Pastells"],
      correct: 1,
      explain: "Ferdinand Blumentritt was the Austrian scholar who corresponded with him for years.",
      source: SOURCES.people
    },
    {
      question: "Which society in Berlin heard Rizal’s treatise on Tagalog verse?",
      answers: [
        "The Ethnographical Society of Berlin",
        "The Royal Medical Society",
        "The Berlin Academy of Sciences",
        "The Philippine Reform Council"
      ],
      correct: 0,
      explain: "He presented “Arte Métrica del Tagalog” to the Ethnographical Society in 1887.",
      source: SOURCES.berlin
    },
    {
      question: "At which university did Rizal earn his medical degree in 1884?",
      answers: [
        "Universidad Central de Madrid",
        "University of Santo Tomas",
        "University of Heidelberg",
        "Sorbonne University"
      ],
      correct: 0,
      explain: "He continued his studies in Madrid and graduated there in 1884.",
      source: SOURCES.education
    },
    {
      question: "Which friend helped print El Filibusterismo in Ghent?",
      answers: ["Valentín Ventura", "Máximo Viola", "Pablo Pastells", "Otto Becker"],
      correct: 0,
      explain: "Valentín Ventura helped finance and arrange the Ghent printing.",
      source: SOURCES.ghent
    },
    {
      question: "Where did Rizal copy Morga’s Sucesos de las Islas Filipinas by hand?",
      answers: ["The British Museum in London", "The Vatican Library", "The National Library in Madrid", "The Ateneo library"],
      correct: 0,
      explain: "He copied the rare history at the British Museum while in London.",
      source: SOURCES.london
    },
    {
      question: "What is the title of Rizal’s unfinished third novel?",
      answers: ["Makamisa", "Mi retiro", "El Consejo de los Dioses", "Amor Patrio"],
      correct: 0,
      explain: "He left Tagalog and Spanish drafts of Makamisa unfinished.",
      source: SOURCES.makamisa
    }
  ]
};

// A deterministic review set that draws from all three difficulties.
quizSets.mixed = [
  quizSets.easy[0], quizSets.medium[0], quizSets.hard[0],
  quizSets.easy[5], quizSets.medium[5], quizSets.hard[5],
  quizSets.easy[7], quizSets.medium[7], quizSets.hard[7],
  quizSets.easy[9]
];

const difficultyNames = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard",
  mixed: "Mixed review"
};

const levelSelection = document.getElementById("level-selection");
const quizContent = document.getElementById("quiz-content");
const results = document.getElementById("results");
const progress = document.getElementById("quiz-progress");
const progressBar = document.getElementById("quiz-progress-bar");
const progressFill = document.getElementById("quiz-progress-fill");
const questionHeading = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
const studyLink = document.getElementById("study-link");
const nextButton = document.getElementById("next-button");
const scoreOutput = document.getElementById("score");
const scoreMessage = document.getElementById("score-message");
const tryAgainButton = document.getElementById("try-again");
const chooseLevelButton = document.getElementById("choose-level");

let selectedDifficulty = "";
let currentQuestion = 0;
let score = 0;

// Start the selected difficulty from its first question.
function startQuiz(difficulty) {
  selectedDifficulty = difficulty;
  currentQuestion = 0;
  score = 0;
  levelSelection.hidden = true;
  results.hidden = true;
  quizContent.hidden = false;
  showQuestion();
  questionHeading.focus();
}

// Show one question and create its answer buttons.
function showQuestion() {
  const questions = quizSets[selectedDifficulty];
  const item = questions[currentQuestion];
  progress.textContent = `${difficultyNames[selectedDifficulty]} · Question ${currentQuestion + 1} of ${questions.length}`;
  if (progressBar && progressFill) {
    progressBar.setAttribute("aria-valuemax", String(questions.length));
    progressBar.setAttribute("aria-valuenow", String(currentQuestion + 1));
    progressFill.style.width = `${((currentQuestion + 1) / questions.length) * 100}%`;
  }
  questionHeading.textContent = item.question;
  answersContainer.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
  if (studyLink) {
    studyLink.hidden = true;
    studyLink.removeAttribute("href");
    studyLink.textContent = "";
  }
  nextButton.hidden = true;

  item.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.className = "answer-option";
    button.type = "button";
    button.textContent = answer;
    button.addEventListener("click", () => selectAnswer(index));
    answersContainer.append(button);
  });
}

// Lock the choices after the first selection and explain the result.
function selectAnswer(selectedIndex) {
  const questions = quizSets[selectedDifficulty];
  const item = questions[currentQuestion];
  const correctIndex = item.correct;
  const answerButtons = answersContainer.querySelectorAll("button");
  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("is-correct");
    if (index === selectedIndex && index !== correctIndex) button.classList.add("is-wrong");
  });

  if (selectedIndex === correctIndex) {
    score += 1;
    feedback.textContent = `Correct! ${item.explain}`;
    feedback.classList.add("correct");
  } else {
    feedback.textContent = `Not quite. ${item.explain}`;
    feedback.classList.add("incorrect");
  }
  if (studyLink) {
    studyLink.href = item.source.url;
    studyLink.textContent = `Study this: ${item.source.label} →`;
    studyLink.hidden = false;
  }
  nextButton.textContent = currentQuestion === questions.length - 1 ? "See your score" : "Next question →";
  nextButton.hidden = false;
}

// End the selected quiz, or advance to its next question.
function advanceQuiz() {
  const questions = quizSets[selectedDifficulty];
  currentQuestion += 1;
  if (currentQuestion < questions.length) {
    showQuestion();
    questionHeading.focus();
    return;
  }

  quizContent.hidden = true;
  results.hidden = false;
  scoreOutput.textContent = `${score} / ${questions.length}`;
  scoreMessage.textContent = score === questions.length
    ? `Perfect score on the ${difficultyNames[selectedDifficulty].toLowerCase()} quiz!`
    : `Review Rizal’s life and works, then try the ${difficultyNames[selectedDifficulty].toLowerCase()} quiz again.`;
  tryAgainButton.focus();
}

// Return to difficulty selection so the learner can choose another level.
function chooseAnotherLevel() {
  quizContent.hidden = true;
  results.hidden = true;
  levelSelection.hidden = false;
  levelSelection.querySelector("button").focus();
}

document.querySelectorAll(".level-option").forEach((button) => {
  button.addEventListener("click", () => startQuiz(button.dataset.level));
});
nextButton.addEventListener("click", advanceQuiz);
tryAgainButton.addEventListener("click", () => startQuiz(selectedDifficulty));
chooseLevelButton.addEventListener("click", chooseAnotherLevel);
