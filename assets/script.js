var timeEl = document.querySelector(".timer");
var startBtn = document.querySelector(".start-btn");
var title = document.querySelector("h1");
var caption = document.querySelector('p');
var result = document.getElementById("result");
var resultDiv = document.getElementById("result-div")
var choiceDiv = document.querySelector(".choices");
var viewHSBtn = document.querySelector(".highscores");
var highscoresDiv = document.getElementById('#highscores');
var choiceBtn;
var form;
var enterHighscore;
var submitHighscore;
var timerInterval;
var storedScores = [];
var initials;
var newScore;
var clearScoresBtn;
var returnFirstPageBtn;
var userChoice = '';
var secondsLeft = 75;
var choiceClass = ['a','b','c','d'];

var questionBank = [
    {
        question: 'What does HTML stand for?',
        choices: ['Handle Tag Marker Lag','HyperText Markup Language','Host Text Method Landing','Hacking The Main Line'],
        answer: 'b'
    },
    {
        question: 'What does CSS stand for?',
        choices: ['Casading Style Sheet','Code Sign Simplified','Capital Source Symbol','Code Script Selector'],
        answer: 'a'
    },
    {
        question: 'Given the following array: ["apples", "oranges", "banana"], at what index is "banana" located?',
        choices: ['1','2','3','4'],
        answer: 'b'
    },
    {
        question: 'Which of the following is NOT a type of variable in javascript?',
        choices: ['string','number','boolean','python'],
        answer: 'd'
    },
    {
        question: 'What do you call a mistake in code?',
        choices: ['blemish','insect','bug','weed'],
        answer: 'c'
    },
    {
        question: 'Which of the following is NOT a type of loop?',
        choices: ['event listener','for','while','do-while'],
        answer: 'a'
    },
    {
        question: 'In javascript, which of the following symbols is accociated with calling an element by its id?',
        choices: ['#','^','~','*'],
        answer: 'a'
    }
];


function init() {
    getHighscores();
};

function getHighscores() {
    storedScores = JSON.parse(localStorage.getItem("storedScores")) || [];
};

function startQuiz() {
    timerInterval = setInterval(setTime,1000);
    setTime();
    renderQuestion();
    startBtn.remove();
    viewHSBtn.style.visibility = 'hidden';
};


function setTime() {
    secondsLeft--;
    timeEl.textContent = 'Time: ' + secondsLeft + ' seconds left';
    if(secondsLeft <= 0) {
      clearInterval(timerInterval);
      endGame();
    };
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
        choiceBtn.setAttribute('id',choiceClass[i]);
        document.getElementById(choiceClass[i]).textContent = questionBank[index]['choices'][i];
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

    clearInterval(timerInterval);
    if (choiceDiv.childElementCount > 0) { 
        choiceDiv.remove();
    };
    if (secondsLeft > 0) {
        caption.textContent = "Your final score is: " + secondsLeft;
        result.textContent = 'Enter initials: ';
        result.style.paddingBottom = '0';
        form = document.createElement('form');
        resultDiv.appendChild(form);
        enterHighscore = document.createElement('input');
        resultDiv.appendChild(enterHighscore);
        enterHighscore.setAttribute('type','text');
        submitHighscore = document.createElement('input');
        resultDiv.appendChild(submitHighscore);
        submitHighscore.setAttribute('type','submit');
        submitHighscore.setAttribute('value','Submit');
        submitHighscore.classList.add('submit-h-s-btn');
        submitHighscore.addEventListener('click', setHighscores);
        
    } else {
        result.textContent = 'Final score: 0. Try again for a better score'
        viewHighscores();
    };
};

function setHighscores() {
    initials = enterHighscore.value;
    newScore = {"secondsLeft": secondsLeft, "initials": initials};
    storedScores.push(newScore);
    localStorage.setItem("storedScores", JSON.stringify(storedScores));
    storedScores = JSON.parse(localStorage.getItem("storedScores"));
    form.remove();
    enterHighscore.remove();
    submitHighscore.remove();
    result.textContent = '';
    viewHighscores();
};

function viewHighscores() {
    title.textContent = 'Highscores: ';
    startBtn.remove();

    if (storedScores === null) {
        caption.textContent = 'No scores to display';
    } else {
        for (var j=0; j<storedScores.length; j++) {
        highscoresDiv = document.createElement('p');
        caption.appendChild(highscoresDiv);
        highscoresDiv.setAttribute('id',j);
        document.getElementById(j).textContent = storedScores[j].initials + ' : ' + storedScores[j].secondsLeft;
        };
    };
    // return to first page button
    returnFirstPageBtn = document.createElement('button');
    returnFirstPageBtn.textContent = 'Return to first page'
    resultDiv.appendChild(returnFirstPageBtn);
    returnFirstPageBtn.addEventListener('click', returnFirstPage)
    // clear highscores button
    clearScoresBtn = document.createElement('button');
    clearScoresBtn.textContent = 'Clear Highscores';
    resultDiv.appendChild(clearScoresBtn);
    clearScoresBtn.addEventListener('click',clearHighscores);

};

function clearHighscores() {
    caption.textContent = 'No scores to display';
    localStorage.clear(); 
};

function returnFirstPage() {
    location.reload(); // will restart the page
};

startBtn.addEventListener('click', startQuiz);
viewHSBtn.addEventListener('click',viewHighscores);

init();