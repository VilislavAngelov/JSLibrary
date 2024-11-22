let myLibrary = [];

let bookNum = 0;

function Book(bookName, author, pagesNum, isRead) {
  this.bookNum = bookNum;
  this.bookName = bookName;
  this.author = author;
  this.pagesNum = pagesNum;
  this.isRead = isRead;
  bookNum++;
}

Book.prototype.setRead = function () {
  this.isRead = !this.isRead;
};

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const book1 = new Book("name1", "author1", 287, true);
const book2 = new Book("name2", "author2", 423, true);
const book3 = new Book("name3", "author3", 687, false);
const book4 = new Book("name4", "author4", 2387, true);
const book5 = new Book("name5", "author5", 457, false);

const container = document.querySelector(".container");

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);

function showLibrary() {
  container.innerHTML = "";
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("bookCard");

    bookCard.setAttribute("data-id", book.bookNum);

    addSpan();

    bookCard.appendChild(addSpan());

    const createTag = (tag, text) => {
      const htmlTag = document.createElement(tag);
      htmlTag.textContent = text;
      bookCard.appendChild(htmlTag);
    };

    let readStatus;

    if (book.isRead) {
      readStatus = "Read";
    } else {
      readStatus = "Not Read";
    }

    createTag("h3", book.bookName);
    createTag("h4", book.author);
    createTag("p", `Number of pages: ${book.pagesNum}`);
    createTag("button", `Status: ${readStatus}`);

    container.appendChild(bookCard);
  });
}

showLibrary();

const modal = document.querySelector("dialog");
const showButton = document.querySelector(".addBook");
const closeButton = document.querySelector("dialog button");
const submitButton = document.getElementById("bookSubmit");

showButton.addEventListener("click", () => {
  modal.showModal();
});

closeButton.addEventListener("click", () => {
  modal.close();
});

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const form = document.getElementById("bookForm");
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pagesNum").value;
  let readStatus;
  const readTrue = document.querySelector('input[name="readTrue"]:checked');
  const readFalse = document.querySelector('input[name="readFalse"]:checked');

  if (readTrue?.value === "True") {
    readStatus = true;
  } else {
    readStatus = false;
  }

  const newBook = new Book(title, author, pages, readStatus);
  addBookToLibrary(newBook);
  showLibrary();
  form.reset();

  modal.close();
});

function addSpan() {
  const span = document.createElement("span");
  span.innerHTML = `
    <svg width="25px" height="25px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M5.29289 5.29289C5.68342 4.90237 6.31658 4.90237 6.70711 5.29289L12 10.5858L17.2929 5.29289C17.6834 4.90237 18.3166 4.90237 18.7071 5.29289C19.0976 5.68342 19.0976 6.31658 18.7071 6.70711L13.4142 12L18.7071 17.2929C19.0976 17.6834 19.0976 18.3166 18.7071 18.7071C18.3166 19.0976 17.6834 19.0976 17.2929 18.7071L12 13.4142L6.70711 18.7071C6.31658 19.0976 5.68342 19.0976 5.29289 18.7071C4.90237 18.3166 4.90237 17.6834 5.29289 17.2929L10.5858 12L5.29289 6.70711C4.90237 6.31658 4.90237 5.68342 5.29289 5.29289Z" fill="#0F1729"/>
    </svg>`;

  span.classList.add("removeBook");

  return span;
}

document.addEventListener("click", function (event) {
  if (event.target.closest(".removeBook")) {
    const bookCard = event.target.closest(".bookCard");
    const bookId = bookCard.getAttribute("data-id");
    let tempArr = myLibrary.filter((book) => `${book.bookNum}` !== bookId);
    console.log(bookId);
    myLibrary = tempArr;
    console.log(tempArr);
    bookCard.remove();
  }
});

document.addEventListener("click", (e) => {
  if (e.target.matches(".bookCard button")) {
    const bookCard = e.target.closest(".bookCard");
    const bookId = bookCard.getAttribute("data-id");
    const bookRead = myLibrary.find((book) => `${book.bookNum}` == bookId);
    bookRead.setRead();
    showLibrary();
  }
});
