// Get the modals
let editModal = document.getElementById("editModal");
let deleteModal = document.getElementById('deleteModal');
  
// Set up span elements for edit and delete modals
let editSpan = document.getElementById("editClose");
let deleteSpan = document.getElementById("deleteClose");

  
// Function to open the modals
function openModal(modalType, elementId) {
    if(modalType === 'edit') {
        console.log("Edit Button clicked!");
        console.log(elementId);
        editModal.style.display = "block";
    } else if(modalType === 'delete') {
        console.log("Delete button clicked!");
        console.log(elementId);
        deleteModal.style.display = "block";
    }
}
      
// Function to close the modals
function closeModal(modalType) {
    if(modalType === 'edit') {
        editModal.style.display = "none";
    } else if (modalType === 'delete') {
        deleteModal.style.display = "none";
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
    if (event.target == editModal) {
        closeModal('edit');
    } else if (event.target == deleteModal) {
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

window.onload = () => {
    toggleDiv();
}
