console.log('afaf');
let localnotes;
if (localStorage.getItem('notes'))
    localnotes = JSON.parse(localStorage.getItem('notes'));
else localnotes = [];

let noteList = document.getElementById('notes');

let textarea = document.getElementById('addText');
let title = document.getElementById('addTitle');
let addbtn = document.getElementById('addBtn');
// let delbtn=document.getElementsByClassName("delBtn");

refresh();

addBtn.addEventListener('click', addnote);

function addnote(e) {
    localnotes.push({ title: title.value, value: textarea.value });
    localStorage.setItem('notes', JSON.stringify(localnotes));
    textarea.value = '';
    title.value = '';
    refresh();
}

function refresh() {
    if (localnotes.length == 0)
        noteList.innerHTML = `<p style="color:rgb(150,150,150)">No notes yet. Click on 'Add Note' to create a new one...<p>`;
    else {
        noteList.innerHTML = '';
        localnotes.forEach((element, index) => {
            noteList.innerHTML += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.value} </p>
                <button class="btn btn-primary delBtn" id="delBtn${
                    index + 1
                }" onclick="delnote(this.id)">Delete Note</button>
            </div>
        </div>`;
        });
    }

    // delbtn=document.getElementsByClassName("delBtn");
    // Array.from(delbtn).forEach((ele)=>{ele.addEventListener("click", delnote);})
}

// Array.from(delbtn).forEach((ele)=>{ele.addEventListener("click", delnote);})

function delnote(id) {
    let eleNo = id.match(/\d+/)[0];
    localnotes.splice(eleNo - 1, 1);
    localStorage.setItem('notes', JSON.stringify(localnotes));

    refresh();
}

let searchbar = document.getElementById('searchBar');
let searchbtn = document.getElementById('searchBtn');

searchbar.addEventListener('input', function () {
    noteList.innerHTML = '';
    localnotes.forEach((element, index) => {
        if (
            element.value
                .toLowerCase()
                .includes(searchbar.value.toLowerCase()) ||
            element.title.toLowerCase().includes(searchbar.value.toLowerCase())
        ) {
            noteList.innerHTML += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${element.title}</h5>
                    <p class="card-text">${element.value} </p>
                    <button class="btn btn-primary delBtn" id="delBtn${
                        index + 1
                    }" onclick="delnote(this.id)"">Delete Note</button>
                </div>
            </div>`;
        }
    });

    if (noteList.innerHTML == '')
        noteList.innerHTML = `<p style="color:rgb(150,150,150)">No note matches with your search keyword...<p>`;
});
// searchbar.addEventListener("blur", function(){
//     refresh();
// })
