
// get random book from gutenberg projects
var getRandomBook = function(){

    // get random number in range of books
    randNum = Math.floor(Math.random()*63485);
    console.log(randNum);

    // fetch book from gutendex api
    fetch("https://gutendex.com/books/"+randNum)
        .then(response => response.json())
        .then(data => {
            var bookTitle = data.title;
            var bookAuthor = data.authors[0].name;
            var bookSubject = data.subjects[0];
            var bookImage = data.formats["image/jpeg"];
            var bookURL = ""
            
            if (data.formats["text/html"]){
                bookURL = data.formats["text/html"];
            }
            else if (data.formats["text/plain"]) {
                bookURL = data.formats["text/plain"];
            }
            else {
                bookURL = data.formats["text/plain; charset=utf-8"];
            }
            
            console.log(data);
            console.log("Title: ",bookTitle);
            console.log("Author: ", bookAuthor);
            console.log("Subject: ", bookSubject);
            console.log("Image: ", bookImage);
            console.log("BookURL: ", bookURL);
            
        })
        .catch((error) => {
            console.log("We got an error");
        });
}
getRandomBook();