// Each difficulty has its own five-question quiz.
const quizSets = {
  easy: [
    {
      question: "Where was José Rizal born?",
      answers: ["Calamba, Laguna", "Dapitan, Mindanao", "Manila", "Cebu"],
      correct: 0
    },
    {
      question: "On what date was Rizal born?",
      answers: ["December 30, 1861", "June 19, 1861", "June 12, 1898", "November 30, 1863"],
      correct: 1
    },
    {
      question: "Where was Rizal exiled from 1892 to 1896?",
      answers: ["Cavite", "Dapitan", "Madrid", "Hong Kong"],
      correct: 1
    },
    {
      question: "Which novel did Rizal publish first?",
      answers: ["El Filibusterismo", "Noli Me Tangere", "Mi Último Adiós", "La Solidaridad"],
      correct: 1
    },
    {
      question: "Where was Rizal executed in 1896?",
      answers: ["Calamba", "Dapitan", "Bagumbayan", "Biñan"],
      correct: 2
    }
  ],
  medium: [
    {
      question: "Which Manila school did Rizal attend before studying at the University of Santo Tomas?",
      answers: ["Ateneo Municipal de Manila", "University of the Philippines", "Colegio de San Juan de Letran", "Escuela Normal"],
      correct: 0
    },
    {
      question: "Which novel is the sequel to Noli Me Tangere?",
      answers: ["La Solidaridad", "El Filibusterismo", "Mi Último Adiós", "The Indolence of the Filipino"],
      correct: 1
    },
    {
      question: "Who is the main character who returns as Simoun in El Filibusterismo?",
      answers: ["Elias", "Basilio", "Crisóstomo Ibarra", "Isagani"],
      correct: 2
    },
    {
      question: "What kind of work is Mi Último Adiós?",
      answers: ["A novel about exile", "A speech in Madrid", "A farewell poem", "A medical journal"],
      correct: 2
    },
    {
      question: "What civic association did Rizal organize in Manila in 1892?",
      answers: ["La Liga Filipina", "Katipunan", "La Solidaridad", "Propaganda Committee"],
      correct: 0
    }
  ],
  hard: [
    {
      question: "Which medical specialty did Rizal pursue in Paris and Heidelberg?",
      answers: ["Surgery", "Ophthalmology", "Pediatrics", "Psychiatry"],
      correct: 1
    },
    {
      question: "Which degree did Rizal earn in Madrid in 1884?",
      answers: ["Law", "Philosophy", "Medicine", "Engineering"],
      correct: 2
    },
    {
      question: "Who was Rizal’s older brother and trusted adviser?",
      answers: ["Paciano Rizal", "Ferdinand Blumentritt", "Marcelo H. del Pilar", "Graciano López Jaena"],
      correct: 0
    },
    {
      question: "Why was Rizal leaving Dapitan in 1896 when he was arrested?",
      answers: ["To attend university in Madrid", "To serve as a doctor in Cuba", "To publish a new novel in Hong Kong", "To join a diplomatic mission in Japan"],
      correct: 1
    },
    {
      question: "Who was the Austrian scholar and close correspondent of Rizal?",
      answers: ["Otto Becker", "Ferdinand Blumentritt", "Félix Resurrección Hidalgo", "Pablo Pastells"],
      correct: 1
    }
  ]
};

const difficultyNames = {
  easy: "Easy",
  medium: "Medium",
  hard: "Hard"
};

const levelSelection = document.getElementById("level-selection");
const quizContent = document.getElementById("quiz-content");
const results = document.getElementById("results");
const progress = document.getElementById("quiz-progress");
const questionHeading = document.getElementById("question");
const answersContainer = document.getElementById("answers");
const feedback = document.getElementById("feedback");
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
  questionHeading.textContent = item.question;
  answersContainer.replaceChildren();
  feedback.textContent = "";
  feedback.className = "feedback";
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
  const correctIndex = questions[currentQuestion].correct;
  const answerButtons = answersContainer.querySelectorAll("button");
  answerButtons.forEach((button, index) => {
    button.disabled = true;
    if (index === correctIndex) button.classList.add("is-correct");
    if (index === selectedIndex && index !== correctIndex) button.classList.add("is-wrong");
  });

  if (selectedIndex === correctIndex) {
    score += 1;
    feedback.textContent = "Correct! Well done.";
    feedback.classList.add("correct");
  } else {
    feedback.textContent = `Not quite. The correct answer is: ${questions[currentQuestion].answers[correctIndex]}.`;
    feedback.classList.add("incorrect");
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
