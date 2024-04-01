const eventCardTemplate = document.querySelector("[event-card-template]");
const eventCardsContainer= document.querySelector(".event-cards");
const searchInput = document.getElementById('search');

let events = [];

fetch("./raw/events")
    .then((res) => res.json())
    .then((data) => {
        events = data.map(event => {
            // Getting card template and datafield pointers
            const card = eventCardTemplate.content.cloneNode(true).children[0];
            const header = card.querySelector("[data-header]");
            const description = card.querySelector("[data-description]");
            const date = card.querySelector("[data-date]");
            const id = card.querySelector("[data-id]");
            const eventId = event._id;

            // Filling the text from the json
            header.textContent = event.name;
            description.textContent = event.description;
            date.textContent = new Date(event.date).toLocaleDateString('en-us');

            // Adding the cards to the div for holding cards
            eventCardsContainer.append(card);
            return {
                name: event.name,
                description: event.description,
                date: event.date,
                eventId : eventId,
                element: card,
            }
        });
  });

// Event for whenever changes whats in the search bar
searchInput.addEventListener("input", (e) => {
    const value = e.target.value.toLowerCase();
        events.forEach(event => {
        const isHidden = !(event.name.toLowerCase().includes(value)
        || event.description.toLowerCase().includes(value));
        event.element.classList.toggle("hide", isHidden);
    });
})

// Get the modals
let editModal = document.getElementById("editModal");
let deleteModal = document.getElementById('deleteModal');
    
// Get all the buttons that open the modals
let editBtns = document.querySelectorAll(".btn.edit-button");
  
// Set up span elements for edit and delete modals
let editSpan = document.getElementById("editClose");
let deleteSpan = document.getElementById("deleteClose");

  
// Function to open the modals
function openModal(modalType) {
    if(modalType === 'edit') {
        console.log("Edit Button clicked!");
        editModal.style.display = "block";
    } else if(modalType === 'delete') {
        console.log("Delete button clicked!");
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
    let contain = document.getElementsByClassName('container');

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