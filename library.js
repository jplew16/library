let library = [];

function bookActions() {
}
bookActions.prototype.readToggle = function(readText) {
    this.read = !this.read;
    readText.textContent = capitalize((this.read).toString());
}

function book(title, author, genre, medium, read = false) {
    this.title = title;
    this.author = author;
    this.genre = genre;
    this.medium = medium;
    this.read = read;
}

book.prototype = Object.create(bookActions.prototype);


book.prototype.displayBook = function() {
    let i = 0;
    let card = document.createElement('ul');
    card.classList.add('card');
    card.setAttribute('data-index', library.length - 1);
    document.body.append(card);
    
    for (let key in this) {
        if (i == 0) {
            addTitle(card, this[key]);
            i++;
            continue;
        } else {
            addMeta(card, key, this[key].toString());
            i++;
            if (i == 5) break;
        }
    }
    addActions(card);
}

function populateStorage() {
    localStorage.setItem('library', library);
}
function extractStorage() {
    if (localStorage.length > 0) {
        localStorage.getItem('library');
        showBooks();
    } else {
        return;
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
    let readText = card.querySelector('.meta-read');
    library[index].readToggle(readText);
}
function addMeta(card, metaLabels, metaData, metaKeys, meta) {
    meta = document.createElement('li');
    metaKeys = document.createElement('li');
    metaKeys.textContent = capitalize(metaLabels);
    card.append(metaKeys);
    
    metaKeys.classList.add('keys');
    meta.classList.add(`meta-${metaLabels}`);
    meta.textContent = capitalize(metaData);
    card.append(meta);
    }
function capitalize(string) {
    return string.replace(
        string.charAt(0), 
        string.charAt(0).toUpperCase()
        );
}

// let newBook = Object.create(book.prototype);
function makeBook() {
    let newBook = new book('The Old Man and The Sea', 
    'Ernest Hemingway', 'fiction', 'paperback');

    library.push(newBook);
}
function showBooks() {
    for (let i = 0; i < library.length; i++) {
        library[i].displayBook();
    }
}


makeBook();
showBooks();