var questions = [
  {
      question: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts",
  },
  {
      question: "The condition in an if / else statement is enclosed within ____.",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses",
  },
  {
      question: "What tag do you put your javascript in within an HTML page?",
      choices: ["<script>", "<javascript>", "<java>", "<js>"],
      answer: "<script>",
  },
  {
      question: "What is the proper way to call a function in javascript?",
      choices: ["call.exampleFunction", "exampleFunction();", "function exampleFunction", "exampleFunction(call);"],
      answer: "exampleFunction();",
  },
  {
      question: "Select the choice that resembles a standard for loop.",
      choices: ["for (i < 10) {...", "for [i === true; i++]", "for (i++, exampleFunction())", "for (i = 0; i < 10; i++)"],
      answer: "for (i = 0; i < 10; i++)",
  },
  {
      question: "What do you find inside an Array?",
      choices: ["a list of multiple values of all variabele types", "functions", "a list of numerical values", "multiple loops within eachother"],
      answer: "a list of multiple values of all variabele types",
  },
  {
      question: "How do you declare a variable in JavaScript?",
      choices: ["new var = exampleVariable;", "var String = exampleVariable", "var exampleVariable;", "var.exampleVariable;"],
      answer: "var exampleVariable;",
  },
];

var questionEl = document.querySelector("#question");
var optionListEl = document.querySelector("#option-list");
var questionResultEl = document.querySelector("#question-result");
var timerEl = document.querySelector("#timer");
var heading = document.createElement("div");
heading.id = "heading";
document.body.appendChild(heading);
var instructions = document.createElement("p");
instructions.id = "instruct";
document.body.appendChild(instructions);
var scorepage= document.createElement("p");
scorepage.id = "scorepage";
scorepage.innerHTML = "View Highscores";
document.body.appendChild(scorepage);
var startbtn = document.createElement("button");
startbtn.id = "start";
startbtn.innerHTML = "Start Quiz";
document.body.appendChild(startbtn);

var questionIndex = 0;
var correctCount = 0;
var checker = false;
var timeLeft = 61;
var intervalId;
timerEl.textContent = "Time Remaining: ";
var allUsers = new Array();



function endQuiz() {

  clearInterval(intervalId);
  document.body.innerHTML = "<h1> Game Over </h1>";


  setTimeout(function () {
      name = prompt("What is your name?");
      if (name === "null") {
          location.href= "Scorepage.html";
      } else {
          var user = {
              name: name,
              score: correctCount
          }
  
          allUsers = localStorage.getItem("allUsers");
  
          if (!allUsers) {
              allUsers = []
          } else {
              allUsers = JSON.parse(allUsers)
          }
  
          allUsers.push(user);
          allUsers.sort(function(a, b){
              return b.score - a.score;
            });
  
          localStorage.setItem("allUsers", JSON.stringify(allUsers));
          showHighScore();
      }
  }, 2000);

}

function showHighScore() {
  location.href= "Scorepage.html";
}

function updateTime() {

  timeLeft--;
  timerEl.textContent = "Time Remaining: " + timeLeft;


  if (timeLeft <= 0) {
      endQuiz();
  }

}

function renderQuestion() {
  checker = false;
  heading.style.display = 'none';
  instructions.style.display = 'none';
  startbtn.style.display = 'none';

  if (timeLeft == 0) {
      updateTime();
  }

  intervalId = setInterval(updateTime, 1000);
  timerEl.style.display = 'block';
  questionResultEl.innerHTML = "";
  optionListEl.innerHTML = "";

  questionEl.textContent = questions[questionIndex].question;
  var test = questions[questionIndex].choices;
  var choiceLength = test.length;
  for (var i = 0; i < choiceLength; i++) {
      var choice = document.createElement("li");
      choice.textContent = questions[questionIndex].choices[i];
      optionListEl.append(choice);
  }
}

function nextQuestion() {
  questionIndex++;


  if (questionIndex === questions.length) {
      endQuiz();
  } else {
      renderQuestion();
  }
}

function checkAnswer(event) {
  if (!checker) {
      checker = true;
      var target = event.target;
      clearInterval(intervalId);

      if (target.matches("li")) {
          var selected = event.target.textContent;
          if (selected == questions[questionIndex].answer) {
              correctCount += 4;
              questionResultEl.textContent = "Correct!";
          } else {
              correctCount -= 1;
              questionResultEl.textContent = "Wrong!";
              timeLeft -= 7;
          }
      }

      setTimeout(nextQuestion, 2000);
  }
  // check if answer is correct
  // Notify the user if their response is correct/wrong.  
  // Update the correctCount if necessary
  //wait 2 seconds and call next question
}

function startQuiz() {
  timerEl.style.display = 'none';
  heading.style.display = 'block';
  instructions.style.display = 'block';
  heading.textContent = "Welcome to the Coding Quiz!!";
  instructions.innerHTML = "You will have 60 seconds to complete this quiz. If you answer a question wrong,<br> 7 seconds will be subtracted from your \ntotal time. On completion, your score will<br> be recorded to the leaderboard. Press start to begin!";

  startbtn.addEventListener("click", function () {
      renderQuestion();
  });
}

optionListEl.addEventListener("click", checkAnswer);
scorepage.addEventListener("click", function() {
  location.href = "Scorepage.html";
});

startQuiz();