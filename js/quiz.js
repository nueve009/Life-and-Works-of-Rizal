// The quiz data is kept separate from the page-building code for easy editing.
const questions = [
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
    question: "Which school did Rizal attend in Manila before studying at the University of Santo Tomas?",
    answers: ["Ateneo Municipal de Manila", "University of the Philippines", "Colegio de San Juan de Letran", "Escuela Normal"],
    correct: 0
  },
  {
    question: "In which European city did Rizal continue his medical studies?",
    answers: ["Paris", "Rome", "Madrid", "London"],
    correct: 2
  },
  {
    question: "In what year was Noli Me Tangere published?",
    answers: ["1887", "1891", "1892", "1896"],
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
    question: "Where was Rizal exiled from 1892 to 1896?",
    answers: ["Cavite", "Dapitan", "Madrid", "Hong Kong"],
    correct: 1
  },
  {
    question: "What is Mi Último Adiós?",
    answers: ["A novel about exile", "A speech in Madrid", "A farewell poem", "A medical journal"],
    correct: 2
  },
  {
    question: "Where was Rizal executed in 1896?",
    answers: ["Calamba", "Dapitan", "Bagumbayan", "Biñan"],
    correct: 2
  }
];

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

let currentQuestion = 0;
let score = 0;

// Show one question and create its answer buttons.
function showQuestion() {
  const item = questions[currentQuestion];
  progress.textContent = `Question ${currentQuestion + 1} of ${questions.length}`;
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

// End the quiz, or advance to the next question.
function advanceQuiz() {
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
    ? "Perfect score! You know Rizal’s story well."
    : "Review the timeline and works, then try the quiz again.";
  tryAgainButton.focus();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  results.hidden = true;
  quizContent.hidden = false;
  showQuestion();
  questionHeading.focus();
}

nextButton.addEventListener("click", advanceQuiz);
tryAgainButton.addEventListener("click", restartQuiz);
showQuestion();
