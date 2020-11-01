// Fetches jokes from api //
function grabJoke() {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
            "accept": "application/json"
        }
    })
        .then(data => data.json())
        .then(obj => $("#fetchedJoke").text(obj.joke))
        
};

// Exit the joke section //
$("#closeJokeButton").click(function () {
    $("#sectionContainer").hide();
});

// Joke activity to make it visible //
$("#joke-button").click(function () {
    $("#content-cell").empty();
    $("#sectionContainer").show();
    $('#sectionContainer').css('display', 'flex');
    grabJoke();
});

// Go to the next joke //
$("#jokeButton").click(grabJoke);