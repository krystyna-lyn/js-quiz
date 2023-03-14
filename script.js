let timeLeft = document.querySelector('.time-left');
let quizContainer = document.getElementById('container');
let nextBtn = document.getElementById('next-button');

let countOfQuestion = document.querySelector('.number-of-question');
let displayContainer = document.getElementById('display-container');

let scoreContainer = document.querySelector('.score-container');
let restart = document.getElementById('restart');
let userScore = document.getElementById('user-score');
let startScreen = document.querySelector('.start-screen');
let startButton = document.getElementById('start-button');

let questionCount;
let scoreCount = 0;
let count = 11;
let countdown;


// questions with options and answers arrays

const quizArray = [
    {
        id: '0',
        question: 'HTML stands for _?',
        options: [
            'Hight Machine Language',
            'Hypertext and links Markup Language',
            'Hypertext Markup Language',
            'None of these',
        ],
        correct: 'Hypertext Markup Language',
    },
    {
        id: '1',
        question: 'Which event occurs when the user clicks on an HTML element?',
        options: [
            'onchange',
            'onclick',
            'onmouseclick',
            'onmouseover',
        ],
        correct: 'onclick',
    },
    {
        id: '2',
        question: 'What will the following code return: Boolean(10 > 9)',
        options: [
            'false',
            'NaN',
            'true',
            'None of these',
        ],
        correct: 'true',
    },
    {
        id: '3',
        question: 'How do you create a function in JavaScript?',
        options: [
            'function = myFunction()',
            'function: myFunction()',
            'function myFunction()',
            'None of these',
        ],
        correct: 'function myFunction()',
    },
    {
        id: '4',
        question: 'How do you call a function named "myFunction"?',
        options: [
            'myFunction()',
            'call function myFunction()',
            'call myFunction()',
            'None of these',
        ],
        correct: 'myFunction()',
    },
    {
        id: '5',
        question: 'How to write an IF statement in JavaScript?',
        options: [
            'if i = 5 then',
            'if(i==5)',
            'if i == 5 then',
            'None of these',
        ],
        correct: 'if(i==5)',
    },

    {
        id: '6',
        question: 'How can you add a comment in a JavaScript?',
        options: [
            '// comment',
            '/**comment',
            '#comment',
            'None of these',
        ],
        correct: '// comment',
    },

    {
        id: '7',
        question: 'How do you round the number 7.25, to the nearest integer?',
        options: [
            'Math.round(5.25)',
            'round(5.25)',
            'math.round(5.25)',
            'None of these',
        ],
        correct: 'Math.round(5.25)',
    },

    {
        id: '8',
        question: 'How do you find the number with the highest value of x and y?',
        options: [
            'top(x,y)',
            'ceil(x,y)',
            'math.ceil(x,y)',
            'Math.max(x,y)',
        ],
        correct: 'Math.max(x,y)',
    },

    {
        id: '9',
        question: 'What is the correct JavaScript syntax for opening a new window called "w2" ?',
        options: [
            'w2 = window("url")',
            'w2 = window.new("url")',
            'w2 = window.open("url")',
            'None of these',
        ],
        correct: 'w2 = window.open("url")',
       
    },
]


restart.addEventListener('click', () => {
    initial();
    displayContainer.classList.remove('hide');
    scoreContainer.classList.add('hide');
});

nextBtn.addEventListener('click', (displayNext = () =>{
     questionCount += 1;

     if(questionCount == quizArray.length){
        displayContainer.classList.add('hide');
        scoreContainer.classList.remove('hide');
        userScore.innerHTML = 'Your score is ' +
        scoreCount + ' out of ' + questionCount;
     }
     else{
        countOfQuestion.innerHTML = 
        questionCount + 1 + ' of ' + quizArray.length + ' Questions';

        quizDisplay(questionCount);
        count = 11;
        clearInterval(countdown);

        timerDisplay();
     }
})
);

const timerDisplay = () =>{
    countdown = setInterval(() => {
        count--;
        timeLeft.innerHTML = `${count}s`;

        if(count == 0){
            clearInterval(countdown);
            displayNext();
        }
    },1000);
};

const quizDisplay = (questionCount) => {
    let quizCards = document.querySelectorAll('.container-mid');

    quizCards.forEach((card) => {
        card.classList.add('hide');
      
    });
    quizCards[questionCount].classList.remove('hide');
};


function quizCreater(){
    quizArray.sort(() => Math.random() - 0.5);

    for(let i of quizArray){
        i.options.sort(() => Math.random() - 0.5);
        let div = document.createElement('div');
        div.classList.add('container-mid', 'hide');

        countOfQuestion.innerHTML = 1 + ' of ' + quizArray.length +
         ' Questions';

         let question_DIV = document.createElement('p');
         question_DIV.classList.add('question');
         question_DIV.innerHTML = i.question;
         div.appendChild(question_DIV);

         div.innerHTML += 
        `
         <button class='option-div' onclick='checker(this)'>
        ${i.options[0]}</button>
        
        <button class='option-div' onclick='checker(this)'>
        ${i.options[1]}</button>
           
        <button class='option-div' onclick='checker(this)'>
        ${i.options[2]}</button>

        <button class='option-div' onclick='checker(this)'>
        ${i.options[3]}</button>
        
        `;

        quizContainer.appendChild(div);

    }
}


function checker(userOption){

 var userSol = userOption.innerText;
  var userSolution=userSol.trim();
  console.log(userSolution);

    let question = document.getElementsByClassName('container-mid')[questionCount];
   

    let options = question.querySelectorAll('.option-div');


let correctAns = quizArray[questionCount].correct;

    if(userSolution == correctAns){
        userOption.classList.add('correct');
        scoreCount++;
     
    }
    else{
        userOption.classList.add('incorrect');

        options.forEach((element) => {
            if(element.innerText == correctAns){
                element.classList.add('correct');
                console.log(element);            
            }
        });    
    }
  
 

clearInterval(countdown);

options.forEach((element) => {
    element.desabled = true;
})
}

function initial(){
    quizContainer.innerHTML = "";
    questionCount = 0;
    scoreCount = 0;
    count = 11;
    clearInterval(countdown);
    timerDisplay();
    quizCreater();
    quizDisplay(questionCount);
}

startButton.addEventListener('click', () =>{
    startScreen.classList.add('hide');
    displayContainer.classList.remove('hide');
    initial();
})

window.onload = () => {
    startScreen.classList.remove('hide');
    displayContainer.classList.add('hide');
}

