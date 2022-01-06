let library = [];

function bookActions() {

}
bookActions.prototype.readToggle = function (readData) {
    this['Read Status'] = !this['Read Status'];
    readData.textContent = capitalize(
        (insertReadText(this['Read Status'])));
}
function book([title, author, genre, medium, read = false]) {
    this['Title'] = title;
    this['Author'] = author;
    this['Genre'] = genre;
    this['Medium'] = medium;
    this['Read Status'] = read;
}
let displayBook = function (book) {
    let i = 0;
    let card = document.createElement('ul');
    card.classList.add('card');
    card.setAttribute('data-index', library.length - 1);
    document.body.append(card);

    for (let key in book) {
        if (i == 0) {
            addTitle(card, book[key]);
            i++;
            continue;
        } else {
            addMeta(card, key, book[key]);
            i++;
            if (i == 5) break;
        }
    }
    addActions(card);
}
book.prototype = Object.create(bookActions.prototype);

function insertReadText(readData) {
    if (readData === true) {
        return readData = 'Read'
    }
    else {
        return readData = 'Not Read';
    }
}

function addTitle(card, obj, meta) {
    meta = document.createElement('h2');
    meta.classList.add('title');

    card.append(meta);
    meta.textContent = obj;
}
function addActions(card) {
    let parent = document.createElement('div');
    let del = document.createElement('button');
    let read = document.createElement('button');

    parent.classList.add('buttons-parent');
    del.textContent = 'Remove';
    del.id = 'remove';
    read.textContent = 'Read';
    read.id = 'read';
    card.append(parent);
    parent.append(del, read);
    addListeners(del, read);
}
function addListeners(del, read) {
    del.addEventListener('click', rmBook);
    read.addEventListener('click', readBook);
}
let rmBook = (e) => {
    let card = e.target.closest('.card');
    let index = card.dataset.index;

    library.splice(index, 1);
    card.remove();
}
let readBook = (e) => {
    let card = e.target.closest('.card');
    let index = card.dataset.index;
    let readData = card.querySelector('.meta-read-status');
    library[index].readToggle(readData);
}
function addMeta(card, metaLabels, metaData, metaKeys, meta) {
    meta = document.createElement('li');
    metaKeys = document.createElement('li');
    metaKeys.textContent = metaLabels;
    card.append(metaKeys);

    metaKeys.classList.add('keys');
    if (metaLabels === 'Read Status') {
        meta.classList.add('meta-read-status');
        meta.textContent = insertReadText(metaData);
    } else {
        meta.classList.add('meta-' + metaLabels.toLowerCase());
        meta.textContent = capitalize(metaData);
    }
    card.append(meta);

}
function capitalize(string) {
    return string.replace(
        string.charAt(0),
        string.charAt(0).toUpperCase()
    );
}
let form = document.querySelector('#book-input');
form.addEventListener('submit', function (event) {
    let newBook = [];
    for (let i = 0; i < 6; i++) {
        if (i < 4) {
            newBook.push(event.target.elements[i].value);
        }
        else if (i >= 4 && event.target.elements[i].checked === true) {
            newBook.push(!!event.target.elements[i].value);
        } else {
            continue;
        }
    }
    makeBook(newBook);
    let inputs = document.querySelectorAll("input[type='text']");
    inputs.forEach((input) => {
        input.value = '';
    });
    event.preventDefault();
});
const newBkBtn = document.querySelector('button.add-book');
const cancelBtn = document.querySelector('.cancel-btn');

const toggleForm = function () {
    let form = document.querySelector('div.book-form');
    form.classList.toggle('active');
};
cancelBtn.addEventListener('click', toggleForm);
newBkBtn.addEventListener('click', toggleForm);

function makeBook(bookData) {
    let newBook = new book(bookData);
    library.push(newBook);
    displayBook(library[library.length - 1]);
}
