const questions = [
  {
    question: "Türkiye'nin başkenti neresidir?",
    options: ["Ankara", "İstanbul", "İzmir", "Bursa"],
    correctIndex: 0,
  },
  {
    question: "Fransa'nın başkenti neresidir?",
    options: ["Lyon", " Paris", "Marsilya", "Nice"],
    correctIndex: 1,
  },
  {
    question: "İngiltere'nin başkenti neresidir?",
    options: ["Londra", "Manchester", "Liverpool", "Birmingham"],
    correctIndex: 0,
  },
  {
    question: "İtalya'nın başkenti neresidir?",
    options: ["Napoli", "Milano", " Roma", "Torino"],
    correctIndex: 2,
  },
  {
    question: "Almanya'nın başkenti neresidir?",
    options: ["Berlin", "Hamburg", "Münih", "Köln"],
    correctIndex: 0,
  },
];

let currentQuestionIndex = 0;
let score = 0;
let userName = "";

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const finishButton = document.getElementById("finish-button");
const resultContainer = document.getElementById("result-container");
const userNameElement = document.getElementById("user-name");
const userScoreElement = document.getElementById("user-score");
const highScoresButton = document.getElementById("high-scores-button");
const highScoresContainer = document.getElementById("high-scores-container");
const highScoresList = document.getElementById("high-scores-list");
const resetButton = document.getElementById("reset-button");
const restartButton = document.getElementById("restart-button");
const startButton = document.getElementById("start-button");
const quizModal = document.getElementById("quiz-container");

nextButton.addEventListener("click", nextQuestion);
finishButton.addEventListener("click", showFinalScore);
highScoresButton.addEventListener("click", showHighScores);
resetButton.addEventListener("click", resetHighScores);
restartButton.addEventListener("click", restartQuiz);
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.classList.add("hidden");
  quizModal.classList.remove("hidden");
}

function loadQuestion() {
  const question = questions[currentQuestionIndex];
  questionElement.textContent = question.question;

  optionsContainer.innerHTML = "";
  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => checkAnswer(index));
    optionsContainer.appendChild(button);

    if (currentQuestionIndex === questions.length - 1) {
      nextButton.classList.add("hidden");
      finishButton.classList.remove("hidden");
    }
  });
}

function checkAnswer(selectedIndex) {
  const question = questions[currentQuestionIndex];
  const selectedOption =
    optionsContainer.getElementsByTagName("button")[selectedIndex];

  if (selectedIndex === question.correctIndex) {
    score++;
    console.log(selectedOption.textContent);
    selectedOption.classList.add("correct");
  } else if (selectedIndex !== question.correctIndex) {
    console.log(selectedOption.textContent);
    selectedOption.classList.add("wrong");
  }

  const options = optionsContainer.getElementsByTagName("button");
  for (const option of options) {
    option.disabled = true;
  }

  nextButton.disabled = false;
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else if (currentQuestionIndex === questions.length) {
    showFinalScore();
  }
}

function showFinalScore() {
  resultContainer.classList.remove("hidden");
  quizModal.classList.add("hidden");
  userName = prompt("Lütfen adınızı girin:");
  userNameElement.textContent = userName;
  userScoreElement.textContent = score;
  saveHighScore(userName, score);
}

function saveHighScore(userName, score) {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScores.push({ name: userName, score: score });
  highScores.sort((a, b) => b.score - a.score);
  localStorage.setItem("highScores", JSON.stringify(highScores));
}

function showHighScores() {
  const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
  highScoresList.innerHTML = "";
  highScores.forEach((entry) => {
    const li = document.createElement("li");
    li.textContent = `${entry.name}: ${entry.score}`;
    highScoresList.appendChild(li);
  });
  highScoresContainer.classList.remove("hidden");
  highScoresButton.classList.add("hidden");
}

function resetHighScores() {
  localStorage.removeItem("highScores");
  highScoresList.innerHTML = "";
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  userName = "";

  resultContainer.classList.add("hidden");
  highScoresContainer.classList.add("hidden");

  nextButton.classList.remove("hidden");
  finishButton.classList.add("hidden");

  loadQuestion();
  startButton.classList.remove("hidden");
  
  highScoresButton.classList.remove("hidden"); // highScoresButton'ı her restart'ta görünür yap
}


loadQuestion();
