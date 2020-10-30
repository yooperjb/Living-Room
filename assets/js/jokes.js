var jokeButton = document.querySelector("#jokeButton");
var displayJoke = document.querySelector("#fetchedJoke");
var openJoke = document.querySelector("#joke-button");
var closeJokeBtn = document.querySelector("#closeJokeButton");

// Fetches jokes from api //
jokeButton.addEventListener("click", grabJoke);

function grabJoke() {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
            "accept": "application/json"
        }
    })
        .then(data => data.json())
        .then(obj => displayJoke.innerHTML = obj.joke)
};
// Close the joke section //
closeJokeBtn.addEventListener("click", closeJoke);

function closeJoke() {
    // document.getElementById("sectionContainer").style.visibility = "hidden";
    $("#sectionContainer").hide();
};

// Joke activity to make it visible //
openJoke.addEventListener("click", visibleJoke);

function visibleJoke() {
    $("#content-cell").empty();

    document.getElementById("sectionContainer").style.visibility = "visible";
    $("#sectionContainer").show();
};

document.addEventListener("DOMContentLoaded", grabJoke);