// Fetches jokes from api //
var grabJoke = function () {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
            "accept": "application/json"
        }
    })
        .then(data => data.json())
        .then(obj => $("#fetchedJoke").text(obj.joke))
    console.log($("#fetchedJoke".text));
};

// Joke activity to make it visible //
$("#joke-button").on("click", function () {
    $("#content-cell").empty();
    // $("#quizContainer").hide();
    var jokeContainerEl = $("<div>").attr({ id: "jokeContainer", class: "jokeContainer" });
    var sectionContainerEl = $("<section>").attr({ id: "sectionContainer", class: "custom-content" });
    var jokeTextEl = $("<p>").attr({ id: "fetchedJoke" });

    var jokeButtonContainerEl = $("<div>").attr({ id: "joke-button-container" });

    var jokeButtonEl = $("<button>").text("Get Joke").attr({ id: "jokeButton", class: "jokeButton orange darken-4 z-depth-2 waves-effect waves-light hoverable" }).on("click", function () {
        grabJoke();
    });

    var closeJokeButtonEl = $("<button>").text("Exit").attr({ id: "closeJokeButton", class: "jokeButton orange darken-4 z-depth-2 waves-effect waves-light hoverable" }).on("click", function () {
        $("#content-cell").empty();
    });

    $("#sectionContainer").show();
    $("#content-cell").append(sectionContainerEl);
    sectionContainerEl.append(jokeContainerEl);
    jokeButtonContainerEl.append(jokeButtonEl, closeJokeButtonEl);
    jokeContainerEl.append(jokeTextEl, jokeButtonContainerEl);
    
    // jokeContainerEL.append(jokeTextEl, jokeButtonEl, closeJokeButtonEl);
    grabJoke();
});