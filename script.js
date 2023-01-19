'use strict'

let addBoxContainerEl = document.getElementById('addBoxContainer');
let cardContainerEl = document.getElementById('cardContainer');
let spreadsheetEl = document.getElementById('spreadsheet');
let saveFormTitleEl = document.getElementById('saveFormTitle');
let saveFormContentEl = document.getElementById('saveFormContent');
let editFormInputTagEl = document.getElementById('editFormInputTag');
let editFormTextAreaTagEl = document.getElementById('editFormTextAreaTag');
let headingEl = document.getElementById("heading")
let redMsgEl = document.getElementById('redMsgSave');
let redMsgEditEl = document.getElementById('redMsgEdit')

// Global Variable
let dataFromLocalStorage = JSON.parse(localStorage.getItem('arrData'))

let arrData = []

if (dataFromLocalStorage) {
    arrData = dataFromLocalStorage;
    insertCards();
}
let tempID

// function area

function showNewForm() {
    spreadsheetEl.style.display = 'block';
    addBoxContainerEl.style.display = 'None';
    cardContainerEl.style.display = 'None';
    headingEl.style.display = 'none';
    document.getElementById('saveForm').classList.remove('hideMessage');
}

function hideNewForm() {
    spreadsheetEl.style.display = 'None';
    addBoxContainerEl.style.display = 'flex';
    cardContainerEl.style.display = 'flex'; document.getElementById('saveForm').classList.add('hideMessage');
    headingEl.style.display = 'block';
}

function showEditForm(a) {
    tempID = a;
    spreadsheetEl.style.display = 'block';
    addBoxContainerEl.style.display = 'None';
    cardContainerEl.style.display = 'None';
    document.getElementById('EditForm').classList.remove('hideMessage');
    headingEl.style.display = 'none';

    arrData.forEach(b => {
        if (b.DataId === tempID) {
            editFormInputTagEl.value = b.title;
            editFormTextAreaTagEl.value = b.content;
        }
    })
}

function hideEditForm() {
    spreadsheetEl.style.display = 'None';
    addBoxContainerEl.style.display = 'flex';
    cardContainerEl.style.display = 'flex'; document.getElementById('EditForm').classList.add('hideMessage');
    headingEl.style.display = 'block';
}

function saveNewData() {

    if (!saveFormTitleEl.value) {
        redMsgEl.style.display = 'block'
    } else {
        redMsgEl.style.display = 'none'
        let RandomeID = new Date().valueOf();
        let obj = {
            DataId : RandomeID,
            title: saveFormTitleEl.value,
            content : saveFormContentEl.value
        };
        arrData.push(obj)
        saveFormTitleEl.value = null;
        saveFormContentEl.value = null;
        closeSpredSheet()
    }
}

function closeSpredSheet() {
    hideNewForm()
    hideEditForm()
    if (arrData) {
        localStorage.setItem('arrData', JSON.stringify(arrData));
    } else {
        localStorage.removeItem('arrData')
    }
    insertCards()
}

function showCard(a) {
    let newElement = document.createElement('div');
    cardContainerEl.appendChild(newElement);
    newElement.innerHTML = `<div class="card">
            
    <div class="row2">
        <div class="row1">
            <div class="cardTitle">Title</div>
            <div class="xbox" onclick="deleteCard(${a.DataId})">x<div class="xhideMessage">close</div> </div>
        </div>
        
        <div class="cardTitleData">${a.title}</div>
    </div>

    <div class="row3">
        <div class="contant">Content</div>
        <div class="cardContentData">${a.content}</div>
    </div>

    <div class="row4">
        <button class="editSaveBtn" onclick="showEditForm(${a.DataId})">edit</button>
    </div>

</div> `
}

function correctData() {
    if (!editFormInputTagEl.value) {
        redMsgEditEl.style.display = 'block';
    } else {
        redMsgEditEl.style.display = 'none';
        arrData.forEach(a => {
            if (a.DataId === tempID) {
                a.title = editFormInputTagEl.value;
                a.content = editFormTextAreaTagEl.value;
            }
        })
        closeSpredSheet()
        tempID = undefined;
        
        if (arrData) {
            localStorage.setItem('arrData', JSON.stringify(arrData));
        } else {
            localStorage.removeItem('arrData')
        }    
    }
    
}

function deleteCard(a) {
    let index = arrData.findIndex(x => x.DataId === a)
    arrData.splice(index, 1);
    if (arrData.length != 0) {
        localStorage.setItem('arrData', JSON.stringify(arrData));
    } else {
        localStorage.clear('arrData')
    }
    insertCards()
}

function insertCards() {
    cardContainerEl.innerHTML = null;
    arrData.forEach(a => {
        showCard(a)
    })
}