var timeEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-btn");
var title = document.querySelector("h1");
var result = document.getElementById("result");
var choiceBtn;

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
    var secondsLeft = 60;
    var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = 'Time: ' + secondsLeft;

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
    };

  }, 1000);
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
        // console.log(questionBank[0]['choices'][i]);
        choiceBtn.addEventListener('click',checkAnswer);
    };
    
};


function checkAnswer() { 
    for (var j=0; j<questionBank[0]['choices'].length; j++) {
        choiceBtn = document.getElementById(questionBank[0]['choices'][j]).textContent;
        // not working properly, 


    };    
            console.log(choiceBtn);
        console.log(questionBank[0]['answer']);
        if ( choiceBtn[j] == questionBank[0]['answer'] ) {
            //move to next qustion
            result.textContent = 'Correct!'
        } else {
            //subtract from the timer
            result.textContent = 'Wrong!'
        };

};


function setHighscores() {
 //localStorage.setItem("highscores");
};


startBtn.addEventListener('click', startQuiz);

init();