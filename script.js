const mainContainer = document.querySelector('.mainContainer');
const bookShelf = document.querySelector('.bookShelf')
const myLibrary = [];
let bookId = 1;

function Book(id, title, author, pages, status) {
    this.id = id
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addBook(id, title, author, pages, status) {
    const bookToAdd = new Book(id, title, author, pages, status);
    myLibrary.push(bookToAdd);
    bookId++
}

addBook(bookId, 'lotr', 'tolkien', 55, true);
addBook(bookId, 'asd', 'ssd', 23, false);


function showAllBooks() {
    myLibrary.forEach((book) => {
        const id = `book${book.id}`;

        const lable = document.createElement('lable');
        lable.setAttribute("for", id);

        const checkbox = document.createElement('input');
        checkbox.type = "checkbox";
        checkbox.name = "readStatus";
        checkbox.value = book.status
        checkbox.className = id;

        if (book.status === true) checkbox.checked = true;

        lable.appendChild(checkbox);
        lable.appendChild(document.createTextNode("Read Status"));
        
        const bookCard = document.createElement('div');
        bookCard.classList.add('bookCard');
        bookCard.textContent = `Title: ${book.title} Author: ${book.author} Pages: ${book.pages}`;
        bookCard.appendChild(lable);

        bookShelf.appendChild(bookCard);
    })
}

showAllBooks();