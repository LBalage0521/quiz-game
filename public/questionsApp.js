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

// QUEESTION HTML TABLE FILL WITH DATA
document.addEventListener('DOMContentLoaded', async (event) => {
    event.preventDefault();
    fillTable();
});
async function fillTable() {
    const queryRef = await db.collection('questions').orderBy('id', 'desc').get();
    const questions = [];
    queryRef.forEach(doc => questions.push(doc.data()));

    let tbody = document.querySelector("#searchResult tbody");
    
    questions.forEach(element => {
        let tr = document.createElement("tr");
        let id = document.createElement("td");
        id.textContent = element.id;
        let question = document.createElement("td");
        question.textContent = element.question;
        let a1 = document.createElement("td");
        a1.textContent = element.answer1;
        let a2 = document.createElement("td");
        a2.textContent = element.answer2;
        let a3 = document.createElement("td");
        a3.textContent = element.answer3;
        let a4 = document.createElement("td");
        a4.textContent = element.answer4;
        let lastItem = document.createElement("td");
        let deleteButton = document.createElement("button");
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add("btn", "btn-sm", "btn-danger");
        deleteButton.setAttribute('disabled', 'true');
        deleteButton.setAttribute("id", `${element.id}`);
        lastItem.appendChild(deleteButton);
            
        tr.appendChild(id);
        tr.appendChild(question);
        tr.appendChild(a1);
        tr.appendChild(a2);
        tr.appendChild(a3);
        tr.appendChild(a4);
        tr.appendChild(lastItem);
            
        tbody.appendChild(tr);

})
}

// BUTTON DELETE METHOD
let section = document.querySelector("section");
section.addEventListener('click', async (event) => {
    event.preventDefault();
    let queryRef = await db.collection('questions').orderBy('id', 'desc').get();
    let qref = await db.collection('questions').get();
    let questions = [];
    qref.forEach(doc => questions.push(doc.data()));
    let listLength = questions.length;
    let buttonId = event.target.id;
    elementId = queryRef.docs[listLength-buttonId].id;
    
    console.log('A törölt elem generált id-je:', elementId);
    db.collection('questions').doc(elementId).delete();
})