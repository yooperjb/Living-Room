

// When the read button is clicked
$("#read-button").on("click", function() {
    
    // clear out div contents
    $("#content-cell").empty();
    $("#sectionContainer").hide();
    getRandomBook();
});

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
            var bookURL = "";
            
            // check for different book formats
            if (data.formats["text/html"]){
                bookURL = data.formats["text/html"];
            }
            else if (data.formats["text/plain"]) {
                bookURL = data.formats["text/plain"];
            }
            else if (data.formats["text/plain; charset=utf-8"]) {
                bookURL = data.formats["text/plain; charset=utf-8"];
            }
            else if (data.formats["text/html; charset=iso-8859-1"]) {
                bookURL = data.formats["text/html; charset=iso-8859-1"];
            }
            
            // create elements for displaying book info
            var bookTitleEl = $("<h4>").text(bookTitle);
            var bookAuthorEl = $("<p>").text("Author: " +bookAuthor);
            var bookSubjectEl = $("<p>").text(bookSubject);
            var bookURLLinkEl = $("<a>").attr({href: bookURL, target: "_blank"}).text("Read Book");
            var bookURLEl = $("<h4>").append(bookURLLinkEl);
            var bookImageEl = $("<img>").attr("src", bookImage);
            $("#content-cell").append(bookTitleEl,bookAuthorEl,bookSubjectEl, bookURLEl, bookImageEl);
            
        })
        .catch((error) => {
            bookTitleEl.text("Error, Please Try Again.");
        });
};