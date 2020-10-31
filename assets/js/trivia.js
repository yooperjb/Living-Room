//var highScores = JSON.parse(localStorage.getItem("highScores")) || []


questionNumber = 1;
playerScore = 0;
const api = {
    base: "https://opentdb.com/api.php",
};

// fetch trivia api and pass results to showQuiz
var playTrivia = function () {
    fetch(`${api.base}?amount=3&type=multiple`)
        .then(response => response.json())
        .then(trivia => {
            console.log("Trivia:", trivia);
            $("quizContainer").empty()
            showQuiz(trivia);
        })

        // if an error is caught - Display something to page here
        .catch((error) => {
            console.log("We have an Error!");
            console.log(error);
        });
};

// After successful fetch showQuiz
var showQuiz = function (trivia) {

    //console.log("Results:" ,trivia.results)

    JSON.stringify(trivia.results)
    console.log(trivia.results)


    // get first trivia results object - this could be randomized 1-3
    var triviaQuestion = trivia.results[0]


    // localStorage.setItem("triviaQuestion", JSON.stringify(trivia.results));
    // data = JSON.parse(localStorage.getItem("triviaQuestion")) || [];

    var correctAnswer = triviaQuestion
    console.log("TriviaQuestion: ", triviaQuestion)

    // set html data to trivia info
    $("#score").html("Score: " + playerScore);
    $("#category").html("Category: " + triviaQuestion.category);
    $("#difficulty").html("Difficulty: " + triviaQuestion.difficulty);
    $("#question").html("Question " + questionNumber + ":&nbsp;" + triviaQuestion.question);

    var randomNum = Math.floor(Math.random() * 4 + 1);
    var incorrectIndex = 0;

    for (let i = 1; i < 5; i++) {

        // if random number = index assign button to correct answer
        if (i === randomNum) {
            var answerBtn = $("<button>").html(triviaQuestion.correct_answer).attr("class", "correct");
        }

        // assign button to incorrect answer
        else {
            var answerBtn = $("<button>").html(triviaQuestion.incorrect_answers[incorrectIndex]).attr("class", "incorrect");
            incorrectIndex++;
        }

        // append button to buttons div
        $("#buttons").append(answerBtn);

    }
}

// When answer button is clicked check for answer
$("#buttons").on("click", "button", function () {
    var buttonClass = $(this).attr("class");

    // if correct answer is clicked
    if (buttonClass === "correct") {
        $("#answerStatus").text("That is the correct answer!");
        playerScore++;
        $("#score").html("Score: " + playerScore);
        $("#buttons").empty();

    } // if incorrect answer is clicked
    else {

        $("#answerStatus").html("Nope, that is not the correct answer. The correct answer is: " + $(this).siblings(".correct").text());
        $("#buttons").empty();

    }
    questionNumber++;
    console.log(questionNumber)
    // clear out the buttons and create a next question button
    console.log("PlayerScore: ", playerScore);
    $("#next").show()

})

$("#next").on("click", function () {

    if (questionNumber < 4) {
        $("#answerStatus").text("");
        $("#next").hide();

        playTrivia();
    } else {
        // $("#buttons").empty();
        $("#score").html("Score: " + playerScore);
        $("#answerStatus").text("Game Over!");
        $("#next").text("Play again?")
        $("#next").show();
        $("#quit").show();
        $("#saveScore").show();

        if ($("#next").value() === true) {


            console.log()

        } else {
            //Thank you.  Good bye  -- button to close or play again
        }


        //if save score
        //  //hide Leave game? | play again?
        //  //add to localStorage and Display List
        //      //input initials - up to three letters
        //      //validate initials
        //      //save to LS
        //  //display on page in #highScores
        //      // "clear HS" button
        //THEN once HS are displayed
        //  //Show  Play again? or Leave game?  Buttons

        //If Leave Game
        //Similar to joke close code:
        // $("#closeJokeButton").click(function () {
        //     $("#sectionContainer").hide();
        // });

        //If play again
        // playTrivia();






    }




    // $("#answerStatus").text("");
    // $("#next").hide();
    // playTrivia();
});


// This will be the function to call when game is quit - save score to localStorage, etc. 
//$("#quit").on("click", quitGame());

// This will get replaced with listener for Trivia button on main page
playTrivia();