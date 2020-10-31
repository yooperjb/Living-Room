
var books = {};

// When the read button is clicked
$("#read-button").on("click", function() {
    
    // clear out div contents, loadbooks, getrandomBook
    $("#content-cell").empty();
    $("#sectionContainer").hide();
    loadBooks();
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
            var bookAuthor = "";
            var bookSubject = data.subjects[0];
            var bookImage = data.formats["image/jpeg"];
            var bookURL = "";
            
            // check if author exists
            if (data.authors[0].name) {
                bookAuthor = data.authors[0].name;
            }
            else {
                bookAuthor = "No Author Given";
            }
            
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
            
            // book buttons
            var readButtonEl = $("<button>").text("Read").attr({id: "readBtn",class:"orange darken-4 z-depth-2 waves-effect waves-light hoverable"}).on("click", function(){
                window.open(bookURL, "_blank");
            });
            var saveButtonEl = $("<button>").text("Save").attr({id: "saveBtn",class:"orange darken-4 z-depth-2 waves-effect waves-light hoverable"}).on("click", function(){
                saveBook(bookTitle,bookURL);
            });
            
            var bookDivEl = $("<div>").attr("id", "bookBtnDiv").append(readButtonEl,saveButtonEl);

            var bookImageEl = $("<img>").attr("src", bookImage);
            
            // append all elements to content-cell div
            $("#content-cell").append(bookTitleEl,bookAuthorEl,bookSubjectEl, bookDivEl, bookImageEl);
            
        })
        .catch((error) => {
            var bookTitleEl = $("<h4>").text("Error, Please Try Again.");
            $("#content-cell").append(bookTitleEl);
            console.log(error);
        });
};

// Save book to localStorage
var saveBook = function(title,url) {
    
    books[title] = url;
    localStorage.setItem("books", JSON.stringify(books));
    loadBooks();
};

// load books from localStorage
var loadBooks = function() {
    books = JSON.parse(localStorage.getItem("books"));
    $("#bookshelf").empty();
    var bookShelfListEl = $("<ul>");
    
    if (!books) {
        books = {};
    }
    
    $.each(books, function(key,value){
        console.log(key,value);
        var bookItemEl = $("<li>").text(key);
        bookShelfListEl.append(bookItemEl);
    })

     $("#bookshelf").append(bookShelfListEl);
};