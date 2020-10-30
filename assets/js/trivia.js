//var highScores = JSON.parse(localStorage.getItem("highScores")) || []
var displayStatus = document.getElementById("answerStatus")
var nextButton = document.getElementById("nextQuestion")
var currentQuestion = 0
var score = 0
var choice = document.querySelector(".answer")
document.getElementById("questionNumber").html = currentQuestion


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
            // document.querySelector(".error").textContent = "Unable to connect to Open Trivia Database";
            // document.querySelector(".status").style = "display: block";
            // setTimeout(function () {
            //     document.querySelector(".status").style = "display: none";
            // }, 2000);
        });
}

var showQuiz = function (trivia) {
    console.log(trivia.results)
    document.getElementById("category").innerHTML = "Category:" + trivia.results[0].category
    document.getElementById("difficulty").innerHTML = "Difficulty:" + trivia.results[0].difficulty
    document.getElementById("question").innerHTML = "Question:" + trivia.results[0].question

    var pointer = 0;

    var random = (Math.floor(Math.random * 4) + 1) //correct_answer

    for (var index = 1; index < 5; index++) {
        if (index === random) {
            document.getElementById("answer" + index).style = "display:inline";
            document.getElementById("answer" + index).innerHTML = trivia.results[0].correct_answer;

        } else {
            document.getElementById("answer" + index).style = "display:inline";
            document.getElementById("answer" + index).innerHTML = trivia.results[0].incorrect_answers[pointer];
            pointer++;
        }
    }

    document.querySelectorAll("answer").forEach((item) => {
        //remove listener
        item.addEventListener("click", (event) => {
            event.preventDefault();
            //check if item innerHTML is correct

            document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer;
            gameStatus();
        });
    });


    // document.getElementsByClassName("correct")
    //     .addEventListener("click", function (event) {
    //         console.log(score);
    //         event.preventDefault();
    //         document.getElementById("answerStatus").innerHTML = "Way to Go! Yes, the correct answer is " + trivia.results[0].correct_answer
    //         console.log("correct");
    //         var correct = true
    //         quizStatus(correct)
    //     })

    // document.getElementsByClassName(".incorrect").forEach((item) => {
    //     item.addEventListener("click", (event) => {
    //         console.log("incorrect");
    //         event.preventDefault();
    //         document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer
    //         gameStatus()

    //     });
    // });



    // incorrect1.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     console.log("incorrect1");
    //     event.preventDefault();
    //     document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer
    //     gameStatus()
    // })

    // incorrect2.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     console.log("incorrect2");
    //     event.preventDefault();
    //     document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer
    //     gameStatus()
    // })

    // incorrect3.addEventListener("click", function (event) {
    //     event.preventDefault();
    //     console.log("incorrect3");
    //     event.preventDefault();
    //     document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer
    //     gameStatus()
    // })

    // document.getElementById("myDIV").removeEventListener("mousemove", myFunction);

}


var quizStatus = function (correct) {
    if (correct) {
        score += 1
        console.log(score)
        document.getElementById("score").innerHTML = "Your score is " + score
        gameStatus()
    }
    else {
        console.log(score)
        document.getElementById("score").innerHTML = "Your score is " + score
    }
}

var gameStatus = function () {
    currentQuestion += 1
    console.log(currentQuestion)
    if (currentQuestion <= 10) {
        console.log(currentQuestion)
        document.getElementById("answer1").style = "display:none"
        document.getElementById("answer2").style = "display:none"
        document.getElementById("answer3").style = "display:none"
        document.getElementById("answer4").style = "display:none"
        document.getElementById("nextQuestion").style = "display:block"


    } else {
        console.log("You've finished!")
        document.getElementById("nextQuestion").style = "display:none"
        document.getElementById("answer1").style = "display:none"
        document.getElementById("answer2").style = "display:none"
        document.getElementById("answer3").style = "display:none"
        document.getElementById("answer4").style = "display:none"
        document.getElementById("gameStatus").innerHTML = "All done!"
    }
};

nextButton.addEventListener("click", function (event) {
    event.preventDefault()
    document.getElementById("nextQuestion").style = "display:none"
    clearContent()
    playTrivia()
})

var clearContent = function () {
    displayStatus.innerHTML = ""
};


playTrivia();




// choice.addEventListener("click", gameStatus());

    // document.querySelector(".answer").forEach((item) => {
    //     item.addEventListener("click", (event) => {
    //         console.log("answer");
    //         event.preventDefault();
    //         gameStatus()
    //     });
    // });

        // document.querySelectorAll(".incorrect").forEach((item) => {
    //     item.addEventListener("click", (event) => {
    //         console.log("incorrect");
    //         event.preventDefault();
    //         document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer
    //         gameStatus()


    // document.querySelectorAll(".incorrect").forEach((item) => {
    //     item.addEventListener("click", (event) => {
    //         console.log("incorrect");
    //         event.preventDefault();
    //         document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer
    //         gameStatus()

    //     });
    // });