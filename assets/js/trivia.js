var highScores = JSON.parse(localStorage.getItem("highScores")) || []

$("#trivia-button").on("click", function () {

    $("#content-cell").empty();
    // $(".trivia-content").show();
    // $("#sectionContainer").hide();
    // $("#quizContainer").show();
    var quizContainerEl = $("<div>").attr({ id: "quizContainer", class: "quiz" });
    var triviaHeaderEL = $("<h4>").attr({ id: "triviaHeader" });
   
    var errorEl = $("<p>").attr({ id: "error" });
    var scoreEl = $("<p>").attr({ id: "score" });
    var categoryEl = $("<p>").attr({ id: "category" });
    var difficultyEl = $("<p>").attr({ id: "difficulty" });
    var questionEl = $("<p>").attr({ id: "question" });
    var quizButtonsEl = $("<div>").attr({ id: "quizButtons", class: "quiz-buttons" }).on("click", quizButtons ());
    var divPEl = $("<div>").attr({ id: "divP" });
    var answerStatusEl = $("<p>").attr({ id: "answerStatus" });
    var gameOverEl = $("<p>").text("Game Over!").attr({ id: "gameOver" });
    var divButtonEl = $("<div>");
    var buttonNextEl = $("<button>").attr({ id: "next" }).on("click", next());
    var buttonQuitEl = $("<button>").text("Quit?").attr({ id: "quit" }).on("click", function () {
        $("#content-cell").empty()});
    var buttonSaveScoreEl = $("<button>").text("Save Score?").attr({ id: "saveScore" });
    var initialsFormEl = $("<form>").attr({ id: "initialsForm" }).on("submit", initialsForm());
    var pFormEl = $("<p>").text("Enter two initials please");
    var inputInitialsEl = $("<input>").attr({ id: "inputInitials", name: "inputInitials", minlength: "2", maxlength: "2", type: "text" });
    var buttonSubmitEl = $("<button>").text("Submit").attr({ id: "submit", class: "trivia-button orange darken-4 z-depth-2 waves-effect waves-light hoverable" });
    var pValidateEl = $("<p>").attr({ id: "validate" });
    
    // putting child into form //
    initialsFormEl.append(pFormEl, inputInitialsEl, buttonSubmitEl, pValidateEl);
    // putting buttons into div //
    divButtonEl.append(buttonNextEl, buttonQuitEl, buttonSaveScoreEl);
    // appending elements to quiz container //
    quizContainerEl.append(triviaHeaderEL, errorEl, scoreEl, categoryEl, difficultyEl, questionEl, quizButtonsEl, divPEl, answerStatusEl, gameOverEl, divButtonEl, initialsFormEl);
    
    $("#content-cell").append(quizContainerEl);

    playTrivia();
});

questionNumber = 1;
playerScore = 0;
const api = {
    base: "https://opentdb.com/api.php",
};

//Activate Triva Quiz from button on top of Main page!


// fetch trivia api and pass results to showQuiz
var playTrivia = function () {
    fetch(`${api.base}?amount=3&type=multiple`)
        .then(response => response.json())
        .then(trivia => {
            $("quizContainer").empty()
            showQuiz(trivia);
        })

        // if an error is caught - Display something to page here
        .catch((error) => {
            error = $("#error").html("There is an error with the API.")
        });
};

// After successful fetch showQuiz
var showQuiz = function (trivia) {

    JSON.stringify(trivia.results)

    // get first trivia results object - this could be randomized 1-3
    var triviaQuestion = trivia.results[0]

    // set html data to trivia info
    $("#triviaHeader").show().html("Play Trivia!")
    $("#score").html("<h4>Score: " + playerScore) + "</h4>";
    $("#category").html("<h5>Category: " + triviaQuestion.category + "</h5>"
    );
    $("#difficulty").html("<h6>Difficulty: " + triviaQuestion.difficulty) + "</h6>";
    $("#question").html("<style='text-align:left'><b>Question " + questionNumber + ":&nbsp;" + triviaQuestion.question + "</b></style>");

    var randomNum = Math.floor(Math.random() * 4 + 1);
    var incorrectIndex = 0;

    for (let i = 1; i < 5; i++) {
        // if random number = index assign button to correct answer
        if (i === randomNum) {
            var answerBtn = $("<button>").html(triviaQuestion.correct_answer).addClass("correct orange darken-4 z-depth-2 waves-effect waves-light hoverable trivia-button");
        }

        // assign button to incorrect answer
        else {
            var answerBtn = $("<button>").html(triviaQuestion.incorrect_answers[incorrectIndex]).addClass("incorrect orange darken-4 z-depth-2 waves-effect waves-light hoverable trivia-button");
            incorrectIndex++;
        }
        // append button to buttons div
        $("#quizButtons").append(answerBtn);
    }
}
var quizButtons = function () {
// When answer button is clicked check for answer
// $("#quizButtons").on("click", "button", function () {
    var buttonClass = $(this).attr("class");

    // if correct answer is clicked
    if (buttonClass === "correct") {
        $("#answerStatus").text("That is the correct answer!");
        playerScore++;
        $("#score").html("<h4>Score: " + playerScore) + "</h4>";
        $("#quizButtons").empty();

    } // if incorrect answer is clicked
    else {
        $("#answerStatus").html("Nope, that is not the correct answer. The correct answer is: " + $(this).siblings(".correct").text());
        $("#quizButtons").empty();
    }
    //Advance Question and Score
    questionNumber++;
    $("#next").show().text("Next Question").addClass("trivia-button orange darken-4 z-depth-2 waves-effect waves-light hoverable")
    if (questionNumber >= 4) {
        $("#initialsForm").show();
        $("#score").html("<h4>Score: " + playerScore) + "</h4>";
        $("#answerStatus").show();
        $("#next").text("Play again?").addClass("trivia-button orange darken-4 z-depth-2 waves-effect waves-light hoverable");
        $("#quit").show().addClass("trivia-button orange darken-4 z-depth-2 waves-effect waves-light hoverable");
    }
}
var next = function () {
// $("#next").on("click", function () {
    $("#answerStatus").text("");
    $("#next").hide();
    $("#initialsForm").hide()
    if (questionNumber >= 4) {
        playerScore = 0;
        $("#score").html("<h4>Score: " + playerScore) + "</h4>";
        questionNumber = 0;
        $("#next").text("Next Question").addClass("trivia-button orange darken-4 z-depth-2 waves-effect waves-light hoverable")
        $("#quit").hide();
    }
    playTrivia();
};

// $("#quit").on("click", function () {
//     $("#quizContainer").hide();
// })
var initialsForm = function () {
// $("#initialsForm").on("submit", function (event) {
    // event.preventDefault();

    var initials = $(this).children("input").val()
    var patt = new RegExp("^[a-zA-Z]+$");
    var res = patt.test(initials);

    // $(document).ready(function () {
    //     $('input#input_text, textarea#textarea2').characterCounter();
    // });

    if (!initials || initials.length > 3 || !res) {
        $("#inputInitials").val("Please enter two letters.")
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
    $("#initialsForm").hide()
    $("#high-scores").show()
    // $(highScores).removeData()
    loadScores();
}

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