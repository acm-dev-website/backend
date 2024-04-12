let currentEventName = null;
let currentEventDate = null;
let currentEventTime = null;
let currentEventDesc= null;
let currentEventImgName = null;
let currentEventId = null;

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
function openDelModal(elemName, elemImgName, elemId) {
    console.log("Delete button clicked!");
    currentEventName = elemName;
    currentEventImgName = elemImgName;
    currentEventId = elemId;
    deleteModal.style.display = "block";
}

// ADD TIME
function openEditModal(elemName, elemDate, elemDesc, elemImgName, elemId) {
    console.log("Edit Button clicked!");
    currentEventName = elemName;
    currentEventDate = elemDate;
    //currentEventTime = elemTime;
    currentEventDesc= elemDesc;
    currentEventImgName = elemImgName;
    currentEventId = elemId;
    initEditPlaceHolders();
    editModal.style.display = "block";   
}
      

function delEvent() {
    // e.preventDefault();
    if (!currentEventName) {
        console.error('No event ID to delete.');
        return;
    }
   
    fetch(`admin/delete?eventName=${currentEventName}&imgName=${currentEventImgName}`, {
        method: 'DELETE',
        //body: {name : currentEventName}
    })
    .then((res) => {
        if (res.ok) {
            // Remove the event card from UI
            const eventCard = document.getElementById(currentEventId);
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
        currentEventId = null;
        //currentEventTime = null;
        currentEventDesc= null;
        currentEventImgName = null;
    } else if (modalType === 'delete'){
        deleteModal.style.display = "none";
        currentEventName = null;
        currentEventId = null;
        currentEventImgName = null;
    }
}

function toggleDiv(toggling = 'None') {
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

    if(toggling === 'edit') {
        createDiv.classList.add('hidden');
        createDiv.classList.remove('hidden');
    }
}

function submitEvent(e) {
    e.preventDefault();

    let editFlag = 0;
    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value.trim();
    let imageInput = document.getElementById("image");
    let imageFile = imageInput.files[0]; // Get the selected image file

    if (!name){
        name = document.getElementById("eName").value.trim();
        date = document.getElementById("eDate").value;
        description = document.getElementById("eDescription").value.trim();
        imageInput = document.getElementById("eImage");
        imageFile = imageInput.files[0];
        editFlag = 1;
    }

    if (!name || !date || !description) {
        alert("Please fill out all fields before submitting!");
        return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("image", imageFile);

    alert("Event Added!");

    if (editFlag){
        document.getElementById("edit_event_form").submit();
    } else {
        document.getElementById("event_form").submit();
    }
}

// Get the modals
let editModal = document.getElementById("editModal");
let deleteModal = document.getElementById('deleteModal');
  
// Set up span elements for edit and delete modals
let editSpan = document.getElementById("editClose");
let deleteSpan = document.getElementById("deleteClose");

// get elems for onclick events
let editSubmit = document.getElementById("ebtn");
let editDelSubmit = document.getElementById("ebtn");

// onclick events and domcontent event handling
editSubmit.addEventListener("click", function(event){
    submitEvent(event);
});

editDelSubmit.addEventListener("click", function(){
    delEvent();
});

document.addEventListener('DOMContentLoaded', function() {
    toggleDiv()
});

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

window.onload = function(){
    toggleDiv();
}
