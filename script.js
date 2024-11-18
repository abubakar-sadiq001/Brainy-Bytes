'use strict';

const lightMode = document.querySelector(".light");
const darkMode =  document.querySelector(".dark");
const mainEl = document.querySelector(".container");
const operatorEl = document.querySelectorAll(".operators");
//
// pop-up box
const popOpened = document.querySelector(".pop-up");
const popUpClosed = document.querySelector(".pop-up--close");
const cancelIcon = document.querySelector(".closePop");
const closePop2 = document.querySelector(".closePop2");
const popUpBtn = document.getElementById("closeBtn");
const closePopUpBtn = document.getElementById("closePopUpBtn");
const overlayEl = document.getElementById("overlay");

cancelIcon.addEventListener("click", hidePopUp);
popUpBtn.addEventListener("click", hidePopUp);
overlayEl.addEventListener("click", hidePopUp);
//
const multiplyEl = document.getElementById('multiply');
const divideEl = document.getElementById('divide');
const userInputEl = document.getElementById('myInput');
const err_message = document.getElementById('err_message');
// Random numbers
    let rand1 = Math.ceil(Math.random() * 100 + 1);
    let rand2 = Math.ceil(Math.random() * 100 + 1);
    let correct_ans = rand1  + rand2;

let rank = JSON.parse(localStorage.getItem("rank"));  
if (!rank) {
    rank = 0;
}  
let rankEl = document.querySelector('.rank-score');
rankEl.innerHTML = `🏆 Rank: ${rank}`;
const headingText = document.querySelector('.align-center');
headingText.textContent = `What is (${rand1} + ${rand2}) ?` 

const wrong_soundEl =  document.getElementById('wrong_answer');
const correct_soundEl =  document.getElementById('correct_answer');

const submitBtn = document.getElementById('submit').addEventListener('click', addition);

 // Target enter key to submit
 userInputEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        console.log("you clicked enter");
        addition();
    }
});
function addition() {
    if (!userInputEl.value) {
        err_message.textContent = 'Enter your answer 👆';
    } else if (correct_ans === +userInputEl.value) {
        rankEl.textContent = `🏆 Rank: ${rank+=2}`;
        correct_soundEl.play();
        updateStorage();
        displayPopUp();
        setTimeout(() => {
            rand1 = Math.ceil(Math.random() * 100 + 1);
            rand2 = Math.ceil(Math.random() * 100 + 1);
            correct_ans = rand1 + rand2;
            headingText.textContent = `What is (${rand1} + ${rand2}) ?`;
        }, 1000);
    } else {
        wrong_soundEl.play();
        err_message.textContent = "";
        userInputEl.addEventListener('input', () => {
            err_message.textContent = "";
        });
        errorPupUpClose();
    }
    userInputEl.value = "";
    function updateStorage() {
        localStorage.setItem("rank", JSON.stringify(rank));
    }
}
lightMode.addEventListener("click", lightModeFunc);

function lightModeFunc() {
    document.body.style.background = "#070707";
    mainEl.style.background = "#140F2D";
    darkMode.classList.add('unhidden');
    darkMode.style.display = "block";
    lightMode.style.display = "none";
    err_message.style.color = 'white';
    for (let i = 0; i < operatorEl.length; i++) {
        operatorEl[i].style.backgroundColor = "rgb(212, 228, 250)";
    }
}
darkMode.addEventListener('click', darkModeFunc);

function darkModeFunc() {
    document.body.style.background = "#fff";
    mainEl.style.background = "rgb(212, 228, 250)";
    darkMode.style.display = 'none';
    lightMode.style.display = 'block';
    err_message.style.color = '#000';
    for (let i = 0; i < operatorEl.length; i++) {
        operatorEl[i].style.backgroundColor = "#fff";
    }
}


// Screen pop-up
function displayPopUp() {
    popOpened.style.display = "block";
    overlayEl.style.display = "block";
}
// Hide pop-up
function hidePopUp()  {
    popOpened.style.display = "none";
    overlayEl.style.display = "none";
}


// err pop-up
function errorPupUpClose() {
    popUpClosed.style.display = "block";
    overlayEl.style.display = "block";
    
}

closePop2.addEventListener("click", hidePopUpClose);
closePopUpBtn.addEventListener("click", hidePopUpClose);
overlayEl.addEventListener("click", hidePopUpClose);


// hide pop-up closed
function hidePopUpClose() {
    popUpClosed.style.display = "none";
    overlayEl.style.display = "none";
}