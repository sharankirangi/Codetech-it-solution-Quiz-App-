const questions = [
    {
        question: " Whta is the full form HTML",
        answers :   [
            {text: "Hper Text Markup Language",correct: true},
            {text: "Hperlinks and Text Markup Language",correct: false},
            {text: "Home Tool Markup Language",correct: false},
            {text: "Hper Text Machine Language",correct: false},
            
        ]
    },
    {
        question: "What does vlink attribute mean? ",
        answers :   [
            {text: "Active Link",correct: false},
            {text: "Very Good Link",correct: false},
            {text: "Virtual Link",correct: false},
            {text: "Visted Link",correct: true},
        ]    
    },
    {
        question: " What CSS stand for? ",
        answers :   [
            {text: "Creative Style Sheets",correct: false},
            {text: "Computer Style Sheets ",correct: false},
            {text: "Cascading Style Sheets ",correct: true},
            {text: " Cascade Style Sheets",correct: false},
        ]     
    },
    {
        question: " Which CSS property controls the text size? ",
        answers :   [
            {text: "Font-Style",correct: false},
            {text: "Font-Size",correct: true},
            {text: "Text-Size",correct: false},
            {text: "Text-Style",correct: false},
        ]       
    },
    {
        question: " What does the 'typeof' operator do in javascript? ",
        answers :   [
            {text: "Assigns a value to a variable",correct: false},
            {text: "Assigns a value to a variable",correct: false},
            {text: "Concatenates two string",correct: false},
            {text: "Returns the data type of a variabl",correct: true},
        ]
     }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("timer");
let currentQuestionIndex = 0;
let score = 0;
let timer;

function startQuiz(){
     currentQuestionIndex = 0;
     score = 0;
     nextButton.innerHTML="Next";
     showQuestion();
     startTimer();
}

function startTimer(){
    let timeLeft = 5;
    timer = setInterval(function () {
        timerElement.innerHTML = timeLeft + "s";

        if (timeLeft <= 0) {
            clearInterval(timer);
            showScore();
        }

        timeLeft -= 1;
    }, 1000);
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.
    question;

     currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer)
     });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
       answerButtons.removeChild(answerButtons.firstChild); 
    }
}
function selectAnswer(e){
    const selectionBtn = e.target;
    const isCorrect = selectionBtn.dataset.correct == "true";
    if(isCorrect){
        selectionBtn.classList.add("correct");
        score++;
    } else{
        selectionBtn.classList.add("incorrect"); 
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct ==="true"){
            button.classList.add("correct");
        }
        button.disabled = "true";
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}
function handleNextButton(){
    clearInterval(timer);
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        startTimer();
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})
startQuiz();