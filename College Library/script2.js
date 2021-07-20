console.log('second script');

// Constructor
class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

let booklist = [];
if (localStorage.getItem('books'))
    booklist = JSON.parse(localStorage.getItem('books'));

//Display

class Display {
    clear() {
        let libraryform = document.getElementById('libraryForm');
        libraryform.reset();
    }

    add(newbook) {
        booklist.push(newbook);
        localStorage.setItem('books', JSON.stringify(booklist));
        let tbody = document.getElementById('tableBody');
        let uistr = `<tr>
                        <td>${newbook.name}</td>
                        <td>${newbook.author}</td>
                        <td>${newbook.type}</td>
                    </tr>
        `;
        tbody.innerHTML += uistr;
    }

    validate(book) {
        let myreg = /\w{3,}/;
        return myreg.test(book.name) && myreg.test(book.author);
    }

    show(type, note, mess) {
        let message = document.getElementById('message');
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
        <strong>${note} </strong> ${mess}
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
        <span aria-hidden="true">×</span>
        </button>
    </div>`;

        setTimeout(() => {
            message.innerHTML = '';
        }, 2000);
    }
}

// Add book

let libraryform = document.getElementById('libraryForm');
libraryform.addEventListener('submit', function (e) {
    e.preventDefault();
    let name = document.getElementById('bookName');
    let author = document.getElementById('author');
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) type = fiction.value;
    if (programming.checked) type = programming.value;
    if (cooking.checked) type = cooking.value;

    let newbook = new Book(name.value, author.value, type);
    let display = new Display();
    if (display.validate(newbook)) {
        display.clear();
        display.add(newbook);
        display.show(
            'success',
            'Success',
            'Your book has been successfully added to the library'
        );
    } else {
        display.show('danger', 'Error', 'Please enter a valid book detail.');
    }

    console.log('success');
});
