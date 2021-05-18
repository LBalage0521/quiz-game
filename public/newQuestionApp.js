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

// FORM POST METHOD
let newQuizForm = document.querySelector('#newQuizForm'); 
newQuizForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    let correctAnswerIndex = document.querySelector('input[type=radio]:checked').value;
    let qref = await db.collection('questions').get();
    let questions = [];
    qref.forEach(doc => questions.push(doc.data()));
    let id = questions.length + 1;
    db.collection('questions').orderBy('id', 'desc')
    db.collection('questions').add({
        question: newQuizForm.question.value,
        answer1: newQuizForm.answer1.value,
        answer2: newQuizForm.answer2.value,
        answer3: newQuizForm.answer3.value,
        answer4: newQuizForm.answer4.value,
        correctAnswerIndex: correctAnswerIndex,
        id: id
    });
    newQuizForm.reset();   
});