document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("start-btn");
  const timerDisplay = document.getElementById("timer");
  const questionContainer = document.getElementById("question-container");
  const optionsContainer = document.getElementById("options-container");
  const resultDisplay = document.getElementById("result");
  const highScoresContainer = document.getElementById("high-scores-container");
  const highScoresList = document.getElementById("high-scores-list");

  let timer;
  let timerCount = 120; // 2 minutes
  let currentQuestionIndex = 0;
  let score = 0;

  const questions = [
    {
      question: "What is the correct syntax for declaring a variable in JavaScript?",
      options: ["var x;", "variable x;", "v x;", "let x;"],
      correctAnswer: "let x;"
    },
    {
      question: "Which of the following is a primitive data type in JavaScript?",
      options: ["Object", "String", "Function", "Array"],
      correctAnswer: "String"
    },
    {
      question: "What does 'DOM' stand for?",
      options: ["Document Object Model", "Data Object Model", "Digital Output Module", "Document Oriented Model"],
      correctAnswer: "Document Object Model"
    },
    {
      question: "How do you write a comment in JavaScript?",
      options: ["//This is a comment", "/*This is a comment*/", "#This is a comment", "<!--This is a comment-->"],
      correctAnswer: "//This is a comment"
    },
    {
      question: "What is the purpose of the 'addEventListener' method?",
      options: ["To add numbers", "To attach an event handler to an element", "To create a new element", "To remove an event listener"],
      correctAnswer: "To attach an event handler to an element"
    },
    {
      question: "Which operator is used for strict equality in JavaScript?",
      options: ["==", "===", "!=", "!=="],
      correctAnswer: "==="
    },
    {
      question: "What is the result of the expression '5 + '5' in JavaScript?",
      options: ["10", "55", "Error", "Undefined"],
      correctAnswer: "55"
    },
    {
      question: "What is the purpose of the 'JSON.parse()' method?",
      options: ["To stringify a JSON object", "To parse a JSON object", "To create a JSON object", "To remove a property from a JSON object"],
      correctAnswer: "To parse a JSON object"
    },
    {
      question: "What is the purpose of the 'localStorage' object in JavaScript?",
      options: ["To store data on the server", "To store data locally on the user's browser", "To create a local variable", "To control the layout of a webpage"],
      correctAnswer: "To store data locally on the user's browser"
    },
    {
      question: "Which keyword is used to declare a function in JavaScript?",
      options: ["function", "method", "func", "define"],
      correctAnswer: "function"
    },
    {
      question: "What is the scope of a variable declared with 'const'?",
      options: ["Global scope", "Local scope", "Function scope", "Block scope"],
      correctAnswer: "Block scope"
    },
    {
      question: "How do you check the type of a variable in JavaScript?",
      options: ["typeof variable", "typeOf(variable)", "variable.type()", "type(variable)"],
      correctAnswer: "typeof variable"
    },
    {
      question: "What is the purpose of the 'fetch' API in JavaScript?",
      options: ["To perform asynchronous HTTP requests", "To fetch data from a local file", "To fetch data from a database", "To fetch images for a webpage"],
      correctAnswer: "To perform asynchronous HTTP requests"
    },
    {
      question: "Which method is used to add a new element to the end of an array in JavaScript?",
      options: ["push()", "add()", "append()", "insert()"],
      correctAnswer: "push()"
    },
    {
      question: "What does 'NaN' stand for in JavaScript?",
      options: ["Not a Number", "Null and None", "No Answer", "Newly Assigned Number"],
      correctAnswer: "Not a Number"
    },
    {
      question: "What is the purpose of the 'setTimeout' function in JavaScript?",
      options: ["To set the time zone of the browser", "To delay the execution of a function", "To update the system time", "To set a timer for animation"],
      correctAnswer: "To delay the execution of a function"
    },
    {
      question: "How do you declare a constant variable in JavaScript?",
      options: ["const x = 10;", "let x = 10;", "var x = 10;", "const int x = 10;"],
      correctAnswer: "const x = 10;"
    },
    {
      question: "What is the purpose of the 'splice' method in JavaScript?",
      options: ["To split a string into an array", "To add or remove elements from an array", "To merge two arrays", "To reverse the elements of an array"],
      correctAnswer: "To add or remove elements from an array"
    },
    {
      question: "Which statement is used to exit a switch statement in JavaScript?",
      options: ["exit;", "break;", "return;", "continue;"],
      correctAnswer: "break;"
    },
    // Add more questions...
  ];

  function startQuiz() {
    startBtn.style.display = "none";
    displayQuestion();
    startTimer();
  }

  function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;

    optionsContainer.innerHTML = "";
    currentQuestion.options.forEach((option, index) => {
      const button = document.createElement("button");
      button.textContent = option;
      button.classList.add("answer-btn");
      button.addEventListener("click", () => checkAnswer(index));
      optionsContainer.appendChild(button);
    });
  }

  function checkAnswer(optionIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    optionsContainer.innerHTML = "";

    const correctAnswerIndex = currentQuestion.options.findIndex(
      (option) => option === currentQuestion.correctAnswer
    );

    if (optionIndex === correctAnswerIndex) {
      score++;
      resultDisplay.textContent = "Correct!";
    } else {
      resultDisplay.textContent = "Incorrect! The correct answer was: " + currentQuestion.correctAnswer;
      timerCount -= 15;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }

  function startTimer() {
    timer = setInterval(function () {
      timerCount--;
      timerDisplay.textContent = `Time: ${Math.floor(timerCount / 60)}:${(timerCount % 60).toLocaleString('en-US', { minimumIntegerDigits: 2, useGrouping: false })}`;

      if (timerCount <= 0) {
        endQuiz();
      }
    }, 1000);
  }

  function endQuiz() {
    clearInterval(timer);
    questionContainer.textContent = "";
    optionsContainer.innerHTML = "";
    resultDisplay.textContent = `Quiz Over! Your score is ${score}.`;

    const initials = prompt("Enter your initials:");
    if (initials) {
      saveHighScore(initials, score);
      displayHighScores();
    }
  }

  function saveHighScore(initials, score) {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push({ initials, score });
    highScores.sort((a, b) => b.score - a.score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
  }

  function displayHighScores() {
    const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScoresList.innerHTML = "";
    highScores.forEach((entry, index) => {
      const listItem = document.createElement("li");
      listItem.textContent = `${index + 1}. ${entry.initials}: ${entry.score}`;
      highScoresList.appendChild(listItem);
    });
    highScoresContainer.style.display = "block";
  }

  startBtn.addEventListener("click", startQuiz);
});
