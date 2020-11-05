var highScores = JSON.parse(localStorage.getItem("highScores")) || []
const api = {
    base: "https://opentdb.com/api.php",
};
var questionNumber = 1;
var playerScore = 0;

// When main Trivia button is clicked startTrivia
$("#trivia-button").on("click", function () {
    startTrivia();
});

var startTrivia = function () {
    $("#content-cell").empty();
    questionNumber = 1; //reset questionNumber
    playerScore = 0; // reset playerScore
    displayQuiz();
    fetchTrivia();
};

var displayQuiz = function () {
    var quizContainerEl = $("<div>").attr({ id: "quizContainer", class: "quiz" });
    var triviaHeaderEL = $("<h4>").attr({ id: "triviaHeader", class: "middleH4" });

    var errorEl = $("<p>").attr({ id: "error" }).hide();
    var scoreEl = $("<h5>").attr({ id: "score", class: "middleH5" });

    var categoryEl = $("<h6>").attr({ id: "category", class: "quiz-category" });
    var difficultyEl = $("<h6>").attr({ id: "difficulty", class: "quiz-category" });
    var questionEl = $("<p>").attr({ id: "question" });

    var quizButtonsEl = $("<div>").attr({ id: "quizButtons", class: "quiz-buttons" });

    var answerStatusEl = $("<p>").attr({ id: "answerStatus", class: "answer-status" });
    var gameOverEl = $("<p>").text("Game Over!").attr({ id: "gameOver" }).hide();

    var divButtonEl = $("<div>");
    var buttonNextEl = $("<button>").attr({ id: "next" }).hide().on("click", function () { next() });

    var playAgainBtn = $("<button>").text("Play Again?").attr({ id: "playAgain", class: "orange darken-4 z-depth-2 waves-effect waves-light hoverable trivia-button" }).on("click", function () {
        startTrivia();
    }).hide();

    var buttonQuitEl = $("<button>").text("Quit?").attr({ id: "quit", class: "orange darken-4 z-depth-2 waves-effect waves-light hoverable trivia-button" }).on("click", function () {
        $("#content-cell").empty()
    }).hide();

    // initials form elements
    var initialsFormEl = $("<form>").attr({ id: "initialsForm", class: "initialsform" });

    // putting buttons into div //
    divButtonEl.append(buttonNextEl, playAgainBtn, buttonQuitEl);

    // appending elements to quiz container //
    quizContainerEl.append(triviaHeaderEL, errorEl, scoreEl, categoryEl, difficultyEl, questionEl, quizButtonsEl, answerStatusEl, gameOverEl, divButtonEl, initialsFormEl);

    $("#content-cell").append(quizContainerEl);
};

// fetch trivia api and pass results to showQuiz
var fetchTrivia = function () {
    //console.log("PlayTriva run");
    fetch(`${api.base}?amount=3&type=multiple`)
        .then(response => response.json())
        .then(trivia => {
            $("quizContainer").empty()
            showQuiz(trivia);
        })

        // if an error is caught - Display something to page here - this needs to go to a function.
        .catch((error) => {
            error = $("#error").html("There is an error with the API.")
        });
};

// After successful fetch showQuiz
var showQuiz = function (trivia) {

    // get first trivia results object - this could be randomized 1-3
    var triviaQuestion = trivia.results[0]

    // set html data to trivia info
    $("#triviaHeader").html("Play Trivia!");//.show()
    $("#score").html("<h4>Score: " + playerScore) + "</h4>";
    $("#category").html("<h5>Category: " + triviaQuestion.category + "</h5>"
    );
    $("#difficulty").html("<h6>Difficulty: " + triviaQuestion.difficulty) + "</h6>";
    $("#question").html("Question " + questionNumber + ":&nbsp;" + triviaQuestion.question);

    // send trivia question to createAnswerButtons
    createAnswerButtons(triviaQuestion);
}

// create answer buttons
var createAnswerButtons = function (question) {

    // randomize where the correct button is
    var randomNum = Math.floor(Math.random() * 4 + 1);
    var incorrectIndex = 0;
    var correctAnswer = question.correct_answer;

    for (let i = 1; i < 5; i++) {
        // if random number = index assign button to correct answer
        if (i === randomNum) {

            var answerBtn = $("<button>").html(correctAnswer).addClass("orange darken-4 z-depth-2 waves-effect waves-light hoverable trivia-button").attr("isCorrect", "yes").on("click", function () {
                checkAnswer("yes", correctAnswer);
            });
        }

        // assign button to incorrect answer
        else {

            var answerBtn = $("<button>").html(question.incorrect_answers[incorrectIndex]).addClass("orange darken-4 z-depth-2 waves-effect waves-light hoverable trivia-button").attr("isCorrect", "no").on("click", function () {
                checkAnswer("no", correctAnswer);
            });
            incorrectIndex++;
        }
        // append button to buttons div
        $("#quizButtons").append(answerBtn);
    }
};

// When answer button is clicked check for answer
var checkAnswer = function (answer, correct) {

    // if correct answer is clicked
    if (answer === "yes") {
        $("#answerStatus").text("That is the correct answer!");
        playerScore++;
        $("#quizButtons").empty();
    } // if incorrect answer is clicked
    else {
        $("#answerStatus").html("Nope, that is not the correct answer. The correct answer is: " + correct);

        // hide quiz buttons show next button
        $("#quizButtons").empty();
    }
    //Advance Question Number
    questionNumber++;

    if (questionNumber > 10) {
        endTrivia();
    }
    else {
        // run function to empty contents and runTrivia
        $("#next").text("Next Question").addClass("trivia-button orange darken-4 z-depth-2   waves-effect waves-light hoverable").show();
    }
};

var next = function () {

    $("#answerStatus").text("");
    $("#next").toggle();
    fetchTrivia();
};

// after last question is answered run endTrivia
var endTrivia = function () {

    // create initial form elements
    var inputInitialsEl = $("<input>").attr({ id: "inputInitials", placeholder: "Two initials please", name: "inputInitials", minlength: "2", maxlength: "2", type: "text" });
    var spacerEl = $("<br />")
    var buttonSubmitEl = $("<button>").text("Submit").attr({ id: "submit", class: "trivia-button orange darken-4 z-depth-2 waves-effect waves-light hoverable" }).on("click", function (event) {
        event.preventDefault();
        initialsForm()
    });
    var pValidateEl = $("<p>").attr({ id: "validate" });

    // append initial form elements to initialsForm
    $("#initialsForm").append(inputInitialsEl, spacerEl, buttonSubmitEl, pValidateEl).show();
};

// when initials submit button is clicked
var initialsForm = function () {

    var initials = $("#inputInitials").val();
    var patt = new RegExp("^[a-zA-Z]+$");
    var res = patt.test(initials);

    if (!initials || initials.length > 3 || !res) {
        $("#inputInitials").val("Initials only")
        return;
    }

    highScores.push({ initials, score: playerScore })
    highScores.sort(function (a, b) {
        if (a.score < b.score) {
            return 1;
        } else if (a.score > b.score) {
            return -1;
        } else if (a.initials > b.initials) {
            return 1;
        } else if (a.initials < b.initials) {
            return -1;
        } else {
            return 0;
        }
    })
    highScores.splice(10)
    localStorage.setItem("highScores", JSON.stringify(highScores))
    $("#initialsForm").toggle();
    $("#high-scores").toggle();
    $("#category").toggle();
    $("#answerStatus").toggle();
    $("#difficulty").toggle();
    $("#question").toggle();

    $("#divButtonEl").show();
    $("#playAgain").show();
    $("#quit").show();

    // load new scores
    loadScores();
};

// when quit button is clicked
$("#quit").on("click", function () {
    $("#quizContainer").empty();
})

// load High Scores from localStorage
var loadScores = function () {
    $("#scoreDisplay").empty();
    var scoreList = $("<ul>");

    highScores.forEach((element) => {
        var highscore = $("<li>").html(element.initials + " | " + element.score);
        scoreList.append(highscore);
    })

    $("#scoreDisplay").append(scoreList);
    $("#high-scores").show();
    $("#clearScores").show();

    $("#clearScores").on("click", function () {
        $("#scoreDisplay").empty();
        highScores = []
        localStorage.setItem("highScores", JSON.stringify(highScores))
    })
};

loadScores();