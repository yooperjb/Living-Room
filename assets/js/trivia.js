//var highScores = JSON.parse(localStorage.getItem("highScores")) || []
var displayStatus = document.getElementById("answerStatus")
var currentQuestion = 0
var score = 0


const api = {
    base: "https://opentdb.com/api.php",
};

var playTrivia = function () {
    fetch(`${api.base}?amount=1&type=multiple`)
        .then(function (trivia) {
            // request was successful
            if (trivia.ok) {
                return trivia.json()
                    .then
                    (showQuiz);
            } else {
                document.querySelector(".error").textContent = "Unable to connect to Open Trivia Database"
                document.querySelector(".status").style = "display: block";
                setTimeout(function () {
                    document.querySelector(".status").style = "display: none";
                }, 2000);
            }
        })
        .catch(function (error) {
            document.querySelector(".error").textContent = "Unable to connect to Open Trivia Database";
            document.querySelector(".status").style = "display: block";
            setTimeout(function () {
                document.querySelector(".status").style = "display: none";
            }, 2000);
        });
}

var showQuiz = function (trivia) {
    console.log(trivia.results)
    document.getElementById("category").innerHTML = "Category:" + trivia.results[0].category
    document.getElementById("difficulty").innerHTML = "Difficulty:" + trivia.results[0].difficulty
    document.getElementById("question").innerHTML = "Question:" + trivia.results[0].question
    document.getElementById("answer1").innerHTML = trivia.results[0].correct_answer
    document.getElementById("answer2").innerHTML = trivia.results[0].incorrect_answers[0]
    document.getElementById("answer3").innerHTML = trivia.results[0].incorrect_answers[1]
    document.getElementById("answer4").innerHTML = trivia.results[0].incorrect_answers[2]
    answserQuiz();
}

var answserQuiz = function () {
    var correctButton = document.getElementById("answer1")
    var incorrectButton = document.querySelector(".incorrect")
    var nextButton = document.getElementById("nextQuestion")

    correctButton.addEventListener("click", function () {
        document.getElementById("answerStatus").innerHTML = "Correct! Way to Go!"
        showScore()

    })

    incorrectButton.addEventListener("click", function () {
        document.getElementById("answerStatus").innerHTML = "Nope!  That's not correct"
        document.getElementById("nextQuestion").style = "display:block"
    })

    nextButton.addEventListener("click", function () {
        document.getElementById("nextQuestion").style = "display:none"
        clearContent()
        playTrivia()
    })
}

var clearContent = function () {
    displayStatus.innerHTML = ""
};

function showScore() {

    score = score + 5
    document.getElementById("score").innerHTML = "Your score is " + score
    currentQuestion++
    if (currentQuestion < 9) {
        document.getElementById("nextQuestion").style = "display:block"
    } else {
        console.log("You've finished!")
        document.getElementById("nextQuestion").style = "display:none"
        document.getElementById("gameStatus").innerHTML = "All done!"
    }

};


playTrivia();