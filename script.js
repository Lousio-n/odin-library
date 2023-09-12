const mainContent = document.querySelector('#mainContent');
const myLibrary = [];

function Book(title, author, pages, status) {
    this.title = title
    this.author = author
    this.pages = pages
    this.status = status
}

function addBook(title, author, pages, status) {
    const bookToAdd = new Book(title, author, pages, status);
    myLibrary.push(bookToAdd);
}

addBook('lotr', 'tolkien', 55, 'yes');
addBook('asd', 'ssd', 23, 'no');


function showAllBooks() {
    myLibrary.forEach((book) => {
        const test = document.createElement('div');
        test.classList.add('testCard');
        test.textContent = `${book.title} by ${book.author} is ${book.pages} pages.`;
        mainContent.appendChild(test);
        console.log(book.author)
    })
}

showAllBooks();