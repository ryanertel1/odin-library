// const tableBody = document.querySelector('tbody');
const libraryContainer = document.querySelector('.library-container');
const myLibrary = [];
const bookInput = document.querySelector('.book-input');

function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}
Book.prototype.info = function() {
    return(`${this.title} by ${this.author}, ${this.pages}, ${this.status}`);
}

function removeAllBooks(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function generateTable() {
    // removeAllBooks(tableBody);
    removeAllBooks(libraryContainer);
    let i = 0;
    myLibrary.forEach(entry => {
        // const newTableRow = document.createElement('tr');
        // newTableRow.dataset.indexNumber = i;
        const newBook = document.createElement('div');
        newBook.classList.add('book-container');
        newBook.dataset.indexNumber = i;

        Object.values(entry).forEach(val => {
            if (typeof val !== 'boolean'){
                const newContent = document.createElement('text');
                newContent.textContent = val;
                newBook.appendChild(newContent);
            } else {
                const newContent = document.createElement('div');
                newContent.classList.add('read-button');
                console.log(val);
                if (val === true) {
                    newContent.classList.add('read-on');
                } else {
                    newContent.classList.remove('read-on');
                }
                newBook.appendChild(newContent);
            }
        });
        // tableBody.appendChild(newTableRow);
        libraryContainer.appendChild(newBook);
        i++; 
    });
}
function addBook(title, author, pages, status) {
    myLibrary.push(new Book(title, author, pages, status))
    generateTable();
}




bookInput.addEventListener('submit', (event) => {
    event.preventDefault();
    const inputTitle = document.getElementById('title').value;
    const inputAuthor = document.getElementById('author').value;
    const inputPages = document.getElementById('pages').value;
    const inputStatus = document.getElementById('status').checked;
    addBook(inputTitle, inputAuthor, inputPages, inputStatus)
    bookInput.reset();
});