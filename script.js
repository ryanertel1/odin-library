const booksContainer = document.querySelector('.books-container');
const myLibrary = [];
const bookInput = document.querySelector('.book-input');

// Dom objects for book entry modal
const entryModal = document.querySelector('.entry-modal');
const addBtn = document.querySelector('.add-button');
const entryModalClose = document.getElementsByClassName('closeEntry')[0];
// Dom objects for book information modal
const bookModal = document.querySelector('.book-modal')
const bookModalClose = document.getElementsByClassName('closeBook')[0];

// function Book(title, author, pages, status) {
//     this.title = title;
//     this.author = author;
//     this.pages = pages;
//     this.status = status;
// }
// Book.prototype.info = function() {
//     return(`${this.title} by ${this.author}, ${this.pages}, ${this.status}`);
// }
class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

function removeAllBooks(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}
function generateTable() {
    removeAllBooks(booksContainer);
    let i = 0;
    myLibrary.forEach(entry => {
        const newBook = document.createElement('div');
        newBook.classList.add('book-info');
        newBook.dataset.indexNumber = i;

        Object.values(entry).forEach(val => {
            if (typeof val !== 'boolean'){
                const newContent = document.createElement('text');
                newContent.textContent = val;
                newBook.appendChild(newContent);
            } else {
                const newContent = document.createElement('div');
                newContent.classList.add('read-button');
                if (val === true) {
                    newContent.classList.add('read-on');
                } else {
                    newContent.classList.remove('read-on');
                }
                newBook.appendChild(newContent);
            }
        });
        booksContainer.appendChild(newBook);
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
    entryModal.style.display = 'none';
});

addBtn.onclick = function() {
    entryModal.style.display = 'block';
}
entryModalClose.onclick = function() {
    entryModal.style.display = 'none';
}
window.onclick = function(event) {
    if (event.target === entryModal) {
        entryModal.style.display = 'none';
    } else if(event.target === bookModal) {
        bookModal.style.display = 'none';
    }
}
bookModalClose.onclick = function() {
    bookModal.style.display = 'none';
}

booksContainer.addEventListener('click', (event) => {
    const currentStatus = myLibrary[event.target.dataset.indexNumber].status;
    if (currentStatus) {
        myLibrary[event.target.dataset.indexNumber].status = false;
    } else {
        myLibrary[event.target.dataset.indexNumber].status = true;
    }
    generateTable();
});