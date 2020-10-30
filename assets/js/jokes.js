var jokeButton = document.querySelector("#jokeButton");
var displayJoke = document.querySelector("#fetchedJoke");
var openJoke = document.querySelector("#joke-button");
var closeJokeBtn = document.querySelector("#closeJokeButton");

// Fetches jokes from api //
jokeButton.addEventListener("click", grabJoke);

<<<<<<< HEAD
function grabJoke(){
    fetch("https://icanhazdadjoke.com/", {
        headers:{
            "accept": "application/json"
        }
    })
    .then(data=> data.json())
    .then(obj => displayJoke.innerHTML = obj.joke)
=======
function grabJoke() {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
            "accept": "application/json"
        }
    })
        .then(data => data.json())
        .then(obj => displayJoke.innerHTML = obj.joke)
>>>>>>> develop
};
// Close the joke section //
closeJokeBtn.addEventListener("click", closeJoke);

<<<<<<< HEAD
function closeJoke(){
=======
function closeJoke() {
>>>>>>> develop
    document.getElementById("sectionContainer").style.visibility = "hidden";
};

// Joke activity to make it visible //
openJoke.addEventListener("click", visibleJoke);

<<<<<<< HEAD
function visibleJoke(){
=======
function visibleJoke() {
>>>>>>> develop
    document.getElementById("sectionContainer").style.visibility = "visible";
};

document.addEventListener("DOMContentLoaded", grabJoke);