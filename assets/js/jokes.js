// Fetches jokes from api //
var grabJoke = function() {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
            "accept": "application/json"
        }
    })
        .then(data => data.json())
        .then(obj => $("#fetchedJoke").text(obj.joke))
        console.log($("#fetchedJoke".text));
};

// Exit the joke section //
$("#closeJokeButton").click(function () {
    $("#sectionContainer").hide();
});

// Joke activity to make it visible //
$("#joke-button").click(function () {
    $("#content-cell").empty();
   
    var jokeContainerEL = $("<div>").attr({ id: "jokeContainer", class: "jokeContainer" });
    var sectionContainerEL = $("<section>").attr({ id: "sectionContainer", class: "custom-content" });
    var jokeTextEl = $("<p>").attr({ id:"fetchedJoke"});
    var jokeButtonEl = $("<button>").text("Get Joke").attr({ id: "jokeButton", class: "jokeButton orange darken-4 z-depth-2 waves-effect waves-light hoverable" });
    var closeJokeButtonEl = $("<button>").text("Exit").attr({ id: "closeJokeButton", class: "jokeButton orange darken-4 z-depth-2 waves-effect waves-light hoverable" });
    $("#sectionContainer").show();
    $('#sectionContainer').css('display', 'flex');
    $("#content-cell").append(sectionContainerEL);
    sectionContainerEL.append(jokeContainerEL);
    jokeContainerEL.append(jokeTextEl, jokeButtonEl, closeJokeButtonEl);
    grabJoke();
});

// Go to the next joke //
$("#jokeButton").click(grabJoke);