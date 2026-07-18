const startBtn = document.getElementById("start-btn");
const startScreen = document.getElementById("start-screen");
const gameScreen = document.getElementById("game-screen");

const scoreEl = document.getElementById("score");
const questionEl = document.getElementById("question");
const markEl = document.getElementById("mark");
const inputEl = document.getElementById("user-input");
const enterBtn = document.getElementById("enter-btn");
const timerEl = document.getElementById("timer");

let score = 0;
let correctAnswer = 0;
let timer;
let timeLeft = 10;

// Hide game when page loads
gameScreen.classList.add("hidden");
markEl.textContent = "";

startBtn.addEventListener("click", startGame);
enterBtn.addEventListener("click", checkAnswer);


// Allow Enter key
inputEl.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        checkAnswer();
    }
});

function startGame() {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");

    score = 0;
    scoreEl.textContent = `Score: ${score}`;

    generateQuestion();
    startTimer();
}

function generateQuestion() {

    let operator = Math.floor(Math.random() * 4);

    let num1;
    let num2;

    switch (operator) {

        // Addition
        case 0:
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;

            correctAnswer = num1 + num2;
            questionEl.textContent = `${num1} + ${num2}`;
            break;

        // Subtraction
        case 1:
            num1 = Math.floor(Math.random() * 20) + 1;
            num2 = Math.floor(Math.random() * 20) + 1;

            // Prevent negative answers
            if (num2 > num1) {
                [num1, num2] = [num2, num1];
            }

            correctAnswer = num1 - num2;
            questionEl.textContent = `${num1} - ${num2}`;
            break;

        // Multiplication
        case 2:
            num1 = Math.floor(Math.random() * 12) + 1;
            num2 = Math.floor(Math.random() * 12) + 1;

            correctAnswer = num1 * num2;
            questionEl.textContent = `${num1} × ${num2}`;
            break;

        // Division
        case 3:
            num2 = Math.floor(Math.random() * 12) + 1;
            correctAnswer = Math.floor(Math.random() * 12) + 1;

            num1 = num2 * correctAnswer;

            questionEl.textContent = `${num1} ÷ ${num2}`;
            break;
    }

    inputEl.value = "";
    inputEl.focus();

    markEl.textContent = "";
    markEl.classList.remove("correct", "wrong");
}

function checkAnswer() {

    if (Number(inputEl.value) === correctAnswer) {

        clearInterval(timer);

        score++;
        scoreEl.textContent = `Score: ${score}`;

        markEl.textContent = "Correct";
        markEl.classList.remove("wrong");
        markEl.classList.add("correct");

        setTimeout(function () {
            generateQuestion();
            startTimer();
        }, 1000);

    } else {

        clearInterval(timer);

        markEl.textContent = "Wrong";
        markEl.classList.remove("correct");
        markEl.classList.add("wrong");

        setTimeout(function () {
            resetGame();
        }, 2000);
    }
}

function startTimer() {

    clearInterval(timer);

    timeLeft = 10;
    timerEl.textContent = `${timeLeft}s Left`;

    timer = setInterval(function () {

        timeLeft--;
        timerEl.textContent = `${timeLeft}s Left`;

        if (timeLeft <= 0) {

            clearInterval(timer);

            markEl.textContent = "Time Out!";
            markEl.classList.remove("correct");
            markEl.classList.add("wrong");

            setTimeout(function () {
                resetGame();
            }, 2000);
        }

    }, 1000);
}

function resetGame() {

    clearInterval(timer);

    gameScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");

    score = 0;
    scoreEl.textContent = "Score: 0";

    questionEl.textContent = "";
    timerEl.textContent = "10s Left";

    inputEl.value = "";

    markEl.textContent = "";
    markEl.classList.remove("correct", "wrong");
}