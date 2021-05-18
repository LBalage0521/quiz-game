// INIT APP
let firebaseConfig = {
    apiKey: "AIzaSyCIfRRSNhnZTrABftXg7iA-YTdWEIYUOkU",
    authDomain: "quiz-game-lb.firebaseapp.com",
    projectId: "quiz-game-lb",
    storageBucket: "quiz-game-lb.appspot.com",
    messagingSenderId: "437209521962",
    appId: "1:437209521962:web:4e657fa015dd8d78344853"
};
firebase.initializeApp(firebaseConfig);

// INIT DATABASE
let db = firebase.firestore();

// GET RANDOM QUESTION FROM DATABASE
document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    getRandomQuestion();
});

async function getRandomQuestion() {
    const randomNumber = Math.floor(Math.random() * 220);
    const questionRef = await db.collection('questions').where('id', '==', randomNumber).get();
    const randomQuestion = questionRef.docs[0].data();

    let question = document.querySelector('#question');
    let answer1 = document.querySelector('#answerButton1');
    let answer2 = document.querySelector('#answerButton2');
    let answer3 = document.querySelector('#answerButton3');
    let answer4 = document.querySelector('#answerButton4');
    let correctAnswerIndex = randomQuestion.correctAnswerIndex;
    question.setAttribute('value', correctAnswerIndex);

    answer1.textContent = randomQuestion.answer1;
    answer2.textContent = randomQuestion.answer2;
    answer3.textContent = randomQuestion.answer3;
    answer4.textContent = randomQuestion.answer4;
    question.textContent = randomQuestion.question;
}

// TRUE OR FALSE ANSWER

function game(event) {
    event.preventDefault();
    let answerButtons = document.querySelectorAll('.answer');
    let question = document.querySelector('#question');
    let result = document.querySelector('#score');
    let correctAnswer = document.querySelector('#question').attributes.value.value;
    let tipp = event.target;
    let correctAnswerButton = answerButtons[correctAnswer-1];

    if (tipp.value == correctAnswer && tipp.type == "submit") {
        tipp.classList.add('correct');
        answerButtons.forEach(button => {
            button.setAttribute('disabled', 'true');
        });
        questionCounter();
        increaseScore();
    }
    else if (tipp.value != correctAnswer && tipp.type == "submit") {
        tipp.classList.add('incorrect');
        correctAnswerButton.classList.add('correct');
        answerButtons.forEach(button => {
            button.setAttribute('disabled', 'true');
        });
        questionCounter();
    }

    if (numbersOfQuestion != 10) {
    setTimeout(() => {
        answerButtons.forEach(button => {
            button.removeAttribute('disabled');
            button.classList.remove('correct');
            button.classList.remove('incorrect');
        });
        getRandomQuestion();
      }, 2000);
    }

    if (numbersOfQuestion == 10) {
        setTimeout(() => {
        answerButtons.forEach(button => {
            button.classList.add('d-none');
        });
        question.textContent = 'Játék vége!';
        question.style.fontSize = '3rem';
        question.style.margin ='40px 10px 20px 10px';
        result.textContent = '';
        let p1 = document.createElement('p');
        let p2 = document.createElement('p');
        let div = document.createElement('div');
        p1.textContent = `Kérdések száma: ${numbersOfQuestion}`;
        p2.textContent = `Helyes válaszok száma: ${score}`;
        p1.style.fontSize = '2rem';
        p1.style.margin ='70px 10px 20px 10px';
        p2.style.fontSize = '2rem';
        p2.style.margin ='40px 10px 20px 10px';
        div.appendChild(p1);
        div.appendChild(p2);
        result.appendChild(div);
        return;
    }, 2000)
    }
}

let buttons = document.querySelectorAll('.answer');
buttons.forEach(button => {
    button.addEventListener('click', async (event) => {
        game(event);
    });
})

let score = 0;
let numbersOfQuestion = 0;

function increaseScore() {
    score++;
    let scoreSpan = document.querySelector('#score span');
    scoreSpan.textContent = `${score}/${numbersOfQuestion}`;
}

function questionCounter() {
    numbersOfQuestion++;
    let scoreSpan = document.querySelector('#score span');
    scoreSpan.textContent = `${score}/${numbersOfQuestion}`;
}