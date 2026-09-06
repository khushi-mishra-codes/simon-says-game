let gameSeq = [];
let userSeq = [];

let btns = ["pink", "skyblue", "gold", "voilet"];

let started = false;
let gameOver = false;
let level = 0;
let highScore = 0;

let h2 = document.querySelector("h2");

let currScoreSpan = document.getElementById("curr-score");
let highScoreSpan = document.getElementById("high-score");
let restartBtn = document.getElementById("restart-btn");


function startGame() {
    if (!started && !gameOver) {
        started = true;
        levelUp();
    }
};


document.addEventListener("click", function (e) {
    if (e.target.closest("#restart-btn") || e.target.closest(".restart-wrapper")) {
        return;
    }
    startGame();
});

function gameFlash(btn) {
    btn.classList.add("flash");
    setTimeout(function () {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userflash");
    setTimeout(function () {
        btn.classList.remove("userflash");
    }, 250);
}

function levelUp() {
    userSeq = [];
    level++;
    h2.innerText = `Level ${level}`;

    let randIdx = Math.floor(Math.random() * 4);
    let randColor = btns[randIdx];
    let randBtn = document.querySelector(`.${randColor}`);

    gameSeq.push(randColor);
    if (randBtn) {
        setTimeout(() => {
            gameFlash(randBtn);
        }, 300);
    }
}

function checkAns(idx) {

    if (userSeq[idx] == gameSeq[idx]) {
        if (userSeq.length == gameSeq.length) {
            setTimeout(levelUp, 1000);
        }
    } else {
        //Game over logic
        let currentScore = level - 1;
        gameOver = true;
        started = false;

        if (currScoreSpan) currScoreSpan.innerText = currentScore;

        //High score evaluation
        if (currentScore > highScore) {
            highScore = currentScore;
            if (highScoreSpan) highScoreSpan.innerText = highScore;
        }
        {
            h2.innerHTML = `Game Over! Your score was <b>${currentScore}</b> <br>Press Restart button to play again.`;
        }

        document.querySelector("body").style.backgroundColor = "red";
        setTimeout(function () {
            document.querySelector("body").style.backgroundColor = "";
        }, 500);
    }
}

function btnPress() {
    if (!started || gameOver) return;

    let btn = this;
    userFlash(btn);

    let userColor = btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");
for (btn of allBtns) {
    btn.addEventListener("click", btnPress);
}

//restart btn event listener
if (restartBtn) {
    restartBtn.addEventListener("click", function () {
        if (gameOver) {
            reset();
            started = true;
            gameOver = false;
            levelUp();
        }
    });
}

function reset() {
    started = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    if (currScoreSpan) currScoreSpan.innerText = 0;

}