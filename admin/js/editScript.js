// Get the modals
let editModal = document.getElementById("editModal");
let deleteModal = document.getElementById('deleteModal');
  
// Set up span elements for edit and delete modals
let editSpan = document.getElementById("editClose");
let deleteSpan = document.getElementById("deleteClose");

let currentEventName = null;
let currentEventDate = null;
let currentEventTime = null;
let currentEventDesc= null;
let currentEventImgName = null;

let editDelSubmit = document.getElementById("ebtn");

// editDelSubmit.addEventListener("click", function(event){
//     delEvent(event);
// });

function initEditPlaceHolders(){
    var editableInputs = document.getElementsByClassName("edit-placeholder");

    for (var i = 0; i < editableInputs.length; i++) {
        var field = editableInputs[i];

        if (field.name === "name"){
            field.value = currentEventName;
        } else if (field.name === "description"){
            field.value = currentEventDesc;
        } else if (field.name === "date"){
            field.value = currentEventDate;
        } else if (field.name === "time"){
            field.value = currentEventTime;
        }
    }
}

// Function to open the modals
function openDelModal(elemName, elemImgName) {
    console.log("Delete button clicked!");
    currentEventName = elemName;
    currentEventImgName = elemImgName;
    deleteModal.style.display = "block";
}

// ADD TIME
function openEditModal(elemName, elemDate, elemDesc, elemImgName) {
    console.log("Edit Button clicked!");
    console.log(111);
    currentEventName = elemName;
    currentEventDate = elemDate;
    //currentEventTime = elemTime;
    currentEventDesc= elemDesc;
    currentEventImgName = elemImgName;
    initEditPlaceHolders();
    editModal.style.display = "block";   
}
      

function delEvent(e) {
    e.preventDefault();
    if (!currentEventName) {
        console.error('No event ID to delete.');
        return;
    }
   
    fetch(`http://localhost:3000/admin/delete?eventName=${currentEventName}&imgName=${currentEventImgName}`, {
        method: 'DELETE',
        //body: {name : currentEventName}
    })
    .then((res) => {
        if (res.ok) {
            // Remove the event card from UI
            const eventCard = document.querySelector(`.editItem[data-id="${currentEventName}"]`);
            if (eventCard) {
                eventCard.remove();
            }
            closeModal('delete');
        } else {
            throw 'Failed to delete event';
        }
    })
    .catch((error) => {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
    })
    .finally(() => {
        currentEventId = null;
        currentEventName = null;
        currentEventDate = null;
        //currentEventTime = null;
        currentEventDesc= null;
        currentEventImgName = null;
    });
}

// Function to close the modals
function closeModal(modalType) {
    if (modalType === 'edit'){
        editModal.style.display = "none";
        currentEventName = null;
        currentEventDate = null;
        //currentEventTime = null;
        currentEventDesc= null;
        currentEventImgName = null;
    } else if (modalType === 'delete'){
        deleteModal.style.display = "none";
        currentEventName = null;
        currentEventImgName = null;
    }
}
  
// When the user clicks on x button, close the modal
editSpan.onclick = () => {
    closeModal('edit');
}

deleteSpan.onclick = () => {
    closeModal('delete');
}
    
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == editModal){
        closeModal('edit');
    } else if (event.target == deleteModal){
        closeModal('delete');
    }
};


function toggleDiv() {
    let selectedOption = document.getElementById('actions').value;
    let createDiv = document.getElementById('create');
    let editDiv = document.getElementById('edit');

    switch(selectedOption) {
        case 'create':
            createDiv.classList.remove('hidden');
            editDiv.classList.add('hidden');
            break;
        case 'edit':
            createDiv.classList.add('hidden');
            editDiv.classList.remove('hidden');
            break;
        default:
            createDiv.classList.remove("hidden");
            editDiv.classList.add("hidden");
            break;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    toggleDiv();

});

window.onload = function(){
    toggleDiv();
}
