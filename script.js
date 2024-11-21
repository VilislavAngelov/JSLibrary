const myLibrary = [];

function Book(bookName, author, pagesNum, isRead) {
    this.bookName = bookName;
    this.author = author;
    this.pagesNum = pagesNum;
    this.isRead = isRead;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("name1", "author1", 287, true);
const book2 = new Book("name2", "author2", 423, true);
const book3 = new Book("name3", "author3", 687, false);
const book4 = new Book("name4", "author4", 2387, true);
const book5 = new Book("name5", "author5", 457, false);

const container = document.querySelector(".container")

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

function showLibrary() {
    container.innerHTML = '';
    myLibrary.forEach((book) => {
        const bookCard = document.createElement("div");
        
        const createTag = (tag, text) => {
            const htmlTag = document.createElement(tag);
            htmlTag.textContent = text;
            bookCard.appendChild(htmlTag);
        }

        createTag('h3', book.bookName);
        createTag('h4', book.author);
        createTag('p', book.pagesNum);
        createTag('p', book.isRead);

        container.appendChild(bookCard);
    })
}

showLibrary();

const modal = document.querySelector("dialog");
const showButton = document.querySelector(".addBook");
const closeButton = document.querySelector("dialog button");
const submitButton = document.getElementById("bookSubmit");

showButton.addEventListener("click", () => {
    modal.showModal();
})

closeButton.addEventListener("click", () => {
    modal.close();
})

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pagesNum').value;
    let readStatus;

    if ( document.querySelector('input[name="readTrue"]:checked').value != null) {
        readStatus = document.querySelector('input[name="readTrue"]:checked').value
    } else if (document.querySelector('input[name="readFalse"]:checked').value != null) {
        readStatus = document.querySelector('input[name="readFalse"]:checked').value
    }
    
    const newBook = new Book(title, author, pages, readStatus);
    addBookToLibrary(newBook);
    showLibrary();

    modal.close();
})

