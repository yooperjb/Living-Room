//var highScores = JSON.parse(localStorage.getItem("highScores")) || []
var displayStatus = document.getElementById("answerStatus")
var nextButton = document.getElementById("nextQuestion")
var quizQuestions = document.querySelectorAll(".astyle")
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
    console.log("question posted")


    var correctAnswer = trivia.results[0].correct_answer;
    console.log(correctAnswer)

    var pointer = 0;
    var random = Math.floor(Math.random() * 4 + 1) //correct_answer
    // console.log(random.value)

    for (var index = 1; index < 5; index++) {
        if (index === random) {

            document.getElementById("answer" + index).style = "display:inline";
            document.getElementById("answer" + index).innerHTML = trivia.results[0].correct_answer;
            var correctHTML = document.getElementById("answer" + index).innerHTML


        } else {
            document.getElementById("answer" + index).style = "display:inline";
            document.getElementById("answer" + index).innerHTML = trivia.results[0].incorrect_answers[pointer];
            pointer++;
        }
    }
    // debugger;
    // document.getElementById("myDIV").removeEventListener("mousemove", myFunction);

    console.log(correctHTML)


    // document.querySelector(".answer").innerHTML
    document.querySelectorAll(".answer").forEach(function (item) {

        item.addEventListener("click", function handler() {
            // this.removeEventListener('click', handler);

            if (correctHTML === document.querySelectorAll(".answer").innerHTML) {
                astyle.style = "display:none"
                document.getElementById("answerStatus").innerHTML = "Way to Go! Yes, the correct answer is " + correctHTML
                console.log("correct");
                var correct = true
                gameStatus(correct)

            }
            else {
                document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + correctHTML;

                console.log("incorrect");
                document.getElementById("score").innerHTML = "Your score is " + score


                gameStatus()

            }

        })
    });
}


var gameStatus = function (correct) {
    if (correct) {
        score += 1
        console.log(score)
        document.getElementById("score").innerHTML = "Your score is " + score
    } else {
        score = score
        console.log(score)
        document.getElementById("score").innerHTML = "Your score is " + score
    }

    currentQuestion += 1
    console.log(currentQuestion)
    if (currentQuestion <= 10) {
        console.log(currentQuestion)
        quizQuestions.style = "display:none"
        document.getElementById("nextQuestion").style = "display:block"


    } else {
        console.log(currentQuestion)
        console.log("You've finished!")
        document.getElementById("nextQuestion").style = "display:none"
        quizQuestions.style = "display:none"
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





    // var buttons = document.querySelectorAll('.answer')





    //out of scope function 



    // document.querySelectorAll(".answer").forEach((item) => {

    //     //item.removeEventListener("click", (event));
    //     item.addEventListener("click", (event) => {
    //         event.preventDefault();
    //         //check if item innerHTML is correct
    //         debugger;
    //         if (document.correctAnswer === document.querySelector(".answer").innerHTML) {
    //             document.getElementById("answerStatus").innerHTML = "Way to Go! Yes, the correct answer is " +
    //                 // trivia.results[0].correct_answer
    //                 console.log("correct");
    //             score += 1
    //             console.log(score)
    //             document.getElementById("score").innerHTML = "Your score is " + score
    //             gameStatus()

    //         } else {
    //             document.getElementById("answerStatus").innerHTML = "Nope! That's not correct. The correct answer is " + trivia.results[0].correct_answer;
    //             document.getElementById("score").innerHTML = "Your score is " + score
    //             gameStatus();
    //         }

    //     });
    // });