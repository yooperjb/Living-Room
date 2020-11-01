var highScores = JSON.parse(localStorage.getItem("highScores")) || []

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
            $("quizContainer").empty()
            showQuiz(trivia);
        })

        // if an error is caught - Display something to page here
        .catch((error) => {
            $("#error").html("There is an error with the API.")
        });
};

// After successful fetch showQuiz
var showQuiz = function (trivia) {

    JSON.stringify(trivia.results)

    // get first trivia results object - this could be randomized 1-3
    var triviaQuestion = trivia.results[0]

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
    //Advance Question and Score
    questionNumber++;
    $("#next").show()
    if (questionNumber >= 4) {
        $("#initialsForm").show();
        $("#score").html("Score: " + playerScore);
        $("#answerStatus").show();
        $("#next").text("Play again?")
        $("#quit").show();
    }
})

$("#next").on("click", function () {
    $("#answerStatus").text("");
    $("#next").hide();
    $("#initialsForm").hide()
    if (questionNumber >= 4) {
        playerScore = 0;
        $("#score").html("Score: " + playerScore);
        questionNumber = 0;
        $("#next").text("Next Question")
        $("#quit").hide();
    }
    playTrivia();
});

$("#quit").on("click", function () {
    $("#quizContainer").hide();
})

$("#initialsForm").on("submit", function (event) {
    event.preventDefault();

    var initials = $(this).children("input").val()
    var patt = new RegExp("^[a-zA-Z]+$");
    var res = patt.test(initials);

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
        $("<li>").remove()
        $("#scoreDisplay").empty();
        highScores = []
        localStorage.setItem("highScores", JSON.stringify(highScores))
    })
};

loadScores();
playTrivia();