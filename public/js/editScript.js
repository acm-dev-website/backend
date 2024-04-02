// Get the modals
let editModal = document.getElementById("editModal");
let deleteModal = document.getElementById('deleteModal');
  
// Set up span elements for edit and delete modals
let editSpan = document.getElementById("editClose");
let deleteSpan = document.getElementById("deleteClose");
let currentEventId = null;

// Function to open the modals
function openModal(modalType, eventId) {
    if (modalType === 'edit') {
        console.log("Edit Button clicked!");
        editModal.style.display = "block";
    } else if (modalType === 'delete') {
        console.log("Delete button clicked!");
        console.log(eventId);
        currentEventId = eventId;
        console.log(currentEventId);
        deleteModal.style.display = "block";
    }
}

function delEvent() {
    if (!currentEventId) {
        console.error('No event ID to delete.');
        return;
    }

    fetch(`/admin/delete?id=${currentEventId}`, {
        method: 'DELETE',
    })
    .then((res) => {
        if (res.ok) {
            // Remove the event card from UI
            const eventCard = document.querySelector(`.editItem[data-id="${currentEventId}"]`);
            if (eventCard) {
                eventCard.remove();
            }
            closeModal('delete');
        } else {
            throw new Error('Failed to delete event');
        }
    })
    .catch((error) => {
        console.error('Error deleting event:', error);
        alert('Failed to delete event. Please try again.');
    })
    .finally(() => {
        currentEventId = null; // Reset the currentEventId after deletion
    });
}

// Function to close the modals
function closeModal(modalType) {
    if(modalType === 'edit') {
        editModal.style.display = "none";
    } else if (modalType === 'delete') {
        deleteModal.style.display = "none";
        currentEventId = null;
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

document.addEventListener('DOMContentLoaded', function() {
    toggleDiv();
});

window.onload = function() {
    toggleDiv();
}
