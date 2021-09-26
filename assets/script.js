var timeEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-btn");
var title = document.querySelector("h1");
var result = document.getElementById("result");
var choiceBtn;
var userChoice = '';
var secondsLeft = 60;
var highscores

var questionBank = [
    {
        question: 'question 1?',
        choices: ['a','b','c','d'],
        answer: 'b'
    },
    {
        question: 'question 2?',
        choices: ['a','b','c','d'],
        answer: 'a'
    },
    {
        question: 'question 3?',
        choices: ['a','b','c','d'],
        answer: 'c'
    }
];







function init() {
    getHighscores();
};

function getHighscores() {
    var storedScores = localStorage.getItem("highscores");

    if (storedScores === null) {
        // something .textContent = No scores to display
    } else {
        // .textContent = storedScores
    };

};

function startQuiz() {
    setTime();
    renderQuestion();
    startBtn.remove();
};


function setTime() {

    var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = 'Time: ' + secondsLeft;

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      timesUp();
    };

  }, 1000);
};

function timesUp() {

};

function renderQuestion() {
    title.textContent = questionBank[0]['question'];
    document.querySelector('p').textContent = '';
    renderChoices();
};

function renderChoices() { 
    for (var i =0; i<questionBank[0]['choices'].length; i++) {
        choiceBtn = document.createElement('button');
        document.querySelector('.choices').appendChild(choiceBtn);
        choiceBtn.setAttribute('id',questionBank[0]['choices'][i]);
        document.getElementById(questionBank[0]['choices'][i]).textContent = questionBank[0]['choices'][i];
    };
    var choiceA = document.getElementById('a');
    var choiceB = document.getElementById('b');
    var choiceC = document.getElementById('c');
    var choiceD = document.getElementById('d');

    choiceA.addEventListener('click', function () {
        userChoice = 'a';
        checkAnswer();
    });
    choiceB.addEventListener('click', function () {
        userChoice = 'b';
        checkAnswer();
    });
    choiceC.addEventListener('click', function () {
        userChoice = 'c';
        checkAnswer();
    });
    choiceD.addEventListener('click', function () {
        userChoice = 'd';
        checkAnswer();
    });
    
};


function checkAnswer() {
    console.log(userChoice);
    var correctAnswer = questionBank[0]['answer']
    if (userChoice == correctAnswer) {
        result.textContent = "correct"
    } else {
        result.textContent = 'wrong'
        secondsLeft = secondsLeft - 5;
    };
};



function setHighscores() {
 //localStorage.setItem("highscores");
};


startBtn.addEventListener('click', startQuiz);

init();