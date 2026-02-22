document.addEventListener("DOMContentLoaded", () => {

  // 🔹 ПИТАННЯ
  const questions = [
    {
      question: "Яка столиця України?",
      answers: ["Львів", "Київ", "Харків", "Одеса"],
      correct: 1
    },
    {
      question: "Скільки планет існує в Сонячній Системі?",
      answers: ["7", "8", "9", "10"],
      correct: 1
    },
    {
      question: "Що є основним елементом веб-сторінки?",
      answers: ["CSS", "HTML", "Python", "Java"],
      correct: 1
    },
    {
      question: "Скільки всього боссів в Dark Souls 3?",
      answers: ["24", "16", "30", "19"],
      correct: 3
    },
    {
      question: "Скільки полігонів у Морфлінга з гри Dota 2?",
      answers: ["1700", "1164", "3000", "2500"],
      correct: 3
    }
  ];

  // 🔹 DOM
  const startScreen = document.getElementById("start-screen");
  const quizScreen = document.getElementById("quiz-screen");
  const resultScreen = document.getElementById("result-screen");

  const startBtn = document.getElementById("start-btn");
  const restartBtn = document.getElementById("restart-btn");

  const questionText = document.getElementById("question-text");
  const answersContainer = document.getElementById("answers-container");
  const resultText = document.getElementById("result-text");
  const timerDisplay = document.getElementById("timer");
  const scoreDisplay = document.getElementById("score-display");

  // 🔹 СТАН
  let questionIndex = 0;
  let score = 0;
  let interval;
  let timeLeft;

  // 🔹 СТАРТ
  startBtn.addEventListener("click", startGame);
  restartBtn.addEventListener("click", startGame);

  function startGame() {
    questionIndex = 0;
    score = 0;
    scoreDisplay.textContent = "Бали: 0";

    startScreen.classList.add("hide");
    resultScreen.classList.add("hide");
    quizScreen.classList.remove("hide");

    showQuestion();
  }

  // 🔹 ПОКАЗ ПИТАННЯ
  function showQuestion() {
    clearInterval(interval);
    startTimer();

    answersContainer.innerHTML = "";
    const q = questions[questionIndex];
    questionText.textContent = q.question;

    q.answers.forEach((answer, index) => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.className = "answer-btn";

      btn.addEventListener("click", () => checkAnswer(index, btn));
      answersContainer.appendChild(btn);
    });
  }

  // 🔹 ВІДПОВІДЬ
  function checkAnswer(index, button) {
    const correctIndex = questions[questionIndex].correct;

    if (index === correctIndex) {
      button.classList.add("correct");
      score++;
      scoreDisplay.textContent = `Бали: ${score}`;
    } else {
      button.classList.add("wrong");
    }

    document
      .querySelectorAll(".answer-btn")
      .forEach(btn => btn.disabled = true);

    setTimeout(nextQuestion, 1000);
  }

  // 🔹 НАСТУПНЕ ПИТАННЯ
  function nextQuestion() {
    questionIndex++;

    if (questionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  }

  // 🔹 РЕЗУЛЬТАТ
  function showResult() {
    quizScreen.classList.add("hide");
    resultScreen.classList.remove("hide");

    const accuracy = Math.round((score / questions.length) * 100);
    resultText.textContent =
      `Твій результат: ${score} з ${questions.length} (${accuracy}%)`;
  }

  // 🔹 ТАЙМЕР
  function startTimer() {
    timeLeft = 15;
    timerDisplay.textContent = `Час: ${timeLeft}`;

    interval = setInterval(() => {
      timeLeft--;
      timerDisplay.textContent = `Час: ${timeLeft}`;

      if (timeLeft <= 0) {
        clearInterval(interval);
        nextQuestion();
      }
    }, 1000);
  }

});