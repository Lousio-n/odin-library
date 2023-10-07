const mainContainer = document.querySelector('.mainContainer');
const bookShelf = document.querySelector('.bookShelf')
const bookForm = document.getElementById("bookForm")
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

bookForm.addEventListener('submit', createBookData);

function createBookData(event) {
    event.preventDefault();
    const bookFormData = new FormData(event.target);

    const bookFormObj = {};
    bookFormData.forEach((value, key) => (bookFormObj[key] = value));
    addBook(bookId, bookFormObj.bookTitle, bookFormObj.bookAuthor, bookFormObj.bookPages, bookFormObj.bookStatus);
    showAllBooks();
    bookForm.reset();
}


function removeBook(id) {
    myLibrary.forEach((book) => {
        if (book.id === +id) {
            const idx = myLibrary.indexOf(book);
            myLibrary.splice(idx, 1);
        }
    })
    showAllBooks();
}

function changeBookStatus(id, status) {
    myLibrary.forEach((book) => {
        if (book.id === +id) {
            book.status = status;
        }
    })
}

function generateBookCard(book) {
    const bookCard = document.createElement('div');
    const bookTitle = document.createElement('p');
    const bookAuthor = document.createElement('p');
    const bookPages = document.createElement('p');
    const changeReadStatus = document.createElement('button');
    const deleteBookButton = document.createElement('button');
    bookCard.classList.add('bookCard')
    bookCard.id = book.id;
    changeReadStatus.className = 'changeReadStatus'
    deleteBookButton.className = 'deleteBook';

    if (book.status === "on") {
        changeReadStatus.id = 'bookRead';
        changeReadStatus.style.backgroundColor = "green";
        changeReadStatus.textContent = "Finished Reading";
    } else {
        changeReadStatus.id = 'bookNotRead';;
        changeReadStatus.style.backgroundColor = "red";
        changeReadStatus.textContent = "Not Read";
    }

    deleteBookButton.textContent = "Delete Book";
    bookTitle.textContent = `Title: ${book.title}`;
    bookAuthor.textContent = `Author: ${book.author}`;
    bookPages.textContent = `Pages: ${book.pages}`;

    changeReadStatus.addEventListener('click', (event) => {
        let status;
        if (event.target.id === 'bookRead') {
            event.target.id = 'bookNotRead'
            status = 'off';
            event.target.style.backgroundColor = "red";
            event.target.textContent = "Not Read";
        } else {
            event.target.id = 'bookRead'
            status = 'on';
            event.target.style.backgroundColor = "green";
            event.target.textContent = "Finished Reading";
        }
        changeBookStatus(event.currentTarget.parentNode.id, status)

    })

    deleteBookButton.addEventListener('click', (event) => {
        removeBook(event.currentTarget.parentNode.id);
    })

    bookCard.append(bookTitle, bookAuthor, bookPages, changeReadStatus, deleteBookButton);

    bookShelf.append(bookCard);
}

function showAllBooks() {
    bookShelf.replaceChildren();
    myLibrary.forEach((book) => {
        generateBookCard(book);
    })
}