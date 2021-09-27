var timeEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-btn");
var title = document.querySelector("h1");
var caption = document.querySelector('p');
var result = document.getElementById("result");
var choiceDiv = document.getElementsByClassName(".choices");
var choiceBtn;
var userChoice = '';
var secondsLeft = 75;
var highscores;

var questionBank = [
    {
        question: 'question 1?',
        choices: ['a','b','c','d'],
        answer: 'b'
    },
    {
        question: 'question 2?',
        choices: ['2a','2b','2c','2d'],
        answer: 'a'
    },
    {
        question: 'question 3?',
        choices: ['3a','3b','3c','3d'],
        answer: 'c'
    },
    {
        question: 'question 4?',
        choices: ['4a','4b','4c','4d'],
        answer: 'd'
    },
    {
        question: 'question 5?',
        choices: ['5a','5b','5c','5d'],
        answer: 'c'
    },
    {
        question: 'question 6?',
        choices: ['6a','6b','6c','6d'],
        answer: 'a'
    },
    {
        question: 'question 7?',
        choices: ['7a','7b','7c','7d'],
        answer: 'a'
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
    timeEl.textContent = 'Time: ' + secondsLeft + ' seconds left';

    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    };

  }, 1000);
};


function renderQuestion() { // question 1
    title.textContent = questionBank[index]['question'];
    caption.textContent = '';
    renderChoices();
};

function renderChoices() { 
    for (var i =0; i<questionBank[index]['choices'].length; i++) {
        choiceBtn = document.createElement('button');
        document.querySelector('.choices').appendChild(choiceBtn);
        choiceBtn.setAttribute('id',questionBank[index]['choices'][i]);
        document.getElementById(questionBank[index]['choices'][i]).textContent = questionBank[index]['choices'][i];
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

var index = 0; 
var correctAnswer = questionBank[index]['answer']
function checkAnswer() {

    if (index == questionBank.length - 1) {
        endGame();
    } else {
        if (userChoice == correctAnswer) {
            result.textContent = "Previous Question: Correct";
            index ++;
            nextQuestion();
        } else if (userChoice != correctAnswer) {
            result.textContent = 'Previous Question: Wrong'
            secondsLeft = secondsLeft - 10;
            index++;
            nextQuestion();
        };
    };
};


function nextQuestion() {
    title.textContent = questionBank[index]['question']
    document.getElementById('a').textContent = questionBank[index]['choices'][0];
    document.getElementById('b').textContent = questionBank[index]['choices'][1];
    document.getElementById('c').textContent = questionBank[index]['choices'][2];
    document.getElementById('d').textContent = questionBank[index]['choices'][3];
    correctAnswer = questionBank[index]['answer'];
};

function endGame() { 
    title.textContent = "Quiz over!"
    caption.textContent = "Your final score is: " + secondsLeft;
    //stop timer
    console.log(choiceDiv.children); // ??
    if (choiceDiv.childElementCount > 0) { // not working yet, trying to remove buttons from endGame screen
        choiceDiv.innerHtml = '';
        console.log('test');
    };
    if (secondsLeft > 0) {

    } else {
        // retry quiz to get a better score
    };
    //option to view high scores or retry quiz
};

function setHighscores() {
 //localStorage.setItem("highscores");
};


startBtn.addEventListener('click', startQuiz);

init();