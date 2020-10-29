//var highScores = JSON.parse(localStorage.getItem("highScores")) || []

const api = {
    base: "https://opentdb.com/api.php",

};

var playTrivia = function () {
    fetch(`${api.base}?amount=3&type=multiple`)
        .then(function (trivia) {
            // request was successful
            if (trivia.ok) {
                return trivia.json()
                    .then
                    (showQuiz);
            } else {
                // document.querySelector(".error").textContent = "Error: " + weather.statusText;
                // document.querySelector(".status").style = "display: block";
                // setTimeout(function () {
                //     document.querySelector(".status").style = "display: none";
                // }, 2000);
            }
        })
        .catch(function (error) {

            // document.querySelector(".error").textContent = "Unable to connect to Open Weather Map";
            // document.querySelector(".status").style = "display: block";
            // setTimeout(function () {
            //     document.querySelector(".status").style = "display: none";
            // }, 2000);

        });
}

var showQuiz = function (trivia) {
    console.log(trivia.results)
    var trivia = trivia.results[index]
    console.log(trivia)
    document.getElementById("category").innerHTML = "Category:" + trivia.category
    document.getElementById("difficulty").innerHTML = "Difficulty:" + trivia.difficulty
    document.getElementById("question").innerHTML = "Question:" + trivia.question

    for (let i = 0; i < trivia.results.length; i++) {

        var button = document.createElement("button")
        button.textContent = trivia.results.correct_answer[i]
        var button = document.createElement("button")
        button.textContent = trivia.results.incorrect_answer[0][i]
        var button = document.createElement("button")
        button.textContent = trivia.results.incorrect_answer[1][i]
        var button = document.createElement("button")
        button.textContent = trivia.results.incorrect_answer[2][i]



        // button.addEventListener("click", function () {
        //     evaluateAnswer(i === question.results.correct_answer)
        // }
        document.getElementById("buttons").appendChild(button)
    }

}

var answserQuiz = function (trivia) {

}








// var showQuiz = function (trivia) {
//     console.log(trivia)
//     var question = trivia[index]

//     for (let i = 0; i < question.b.length; i++) {
//         var button = document.createElement("button")
//         button.textContent = question.results.question[i]
//         button.addEventListener("click", function () {
//             evaluateAnswer(i === question.results.correct_answer)
//         })
//         document.getElementById("tAnswer").appendChild(button)
//     }
// }




// var questions = [
//     {
//         q: "",
//         b: ["", "", "", ""],
//         a: ""
//     }
//     ,
//     {
//         q: "",
//         b: ["", "", "", ""],
//         a: ""
//     }
//     ,
//     {
//         q: "",
//         b: ["", "", "", ""],
//         a: ""
//     }
//     ,
// ]


playTrivia();