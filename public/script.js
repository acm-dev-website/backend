const eventCardTemplate = document.querySelector("[event-card-template]");
const eventCardsContainer= document.querySelector(".event-cards");
const searchInput = document.querySelector("#search");

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
var modal = document.getElementById("editModal");
var deleteModal = document.getElementById("deleteModal");
    
// Get all the buttons that open the modals
var editBtns = document.querySelectorAll(".btn.edit-button");
var deleteBtns = document.querySelectorAll("[data-button-type='delete']");
  
// Set up span elements for edit and delete modals
var editSpan = document.getElementById("editClose");
var deleteSpan = document.getElementById("deleteClose");
  
// Function to open the modals
function openEditModal() {
  console.log("Edit Button clicked!");
  editModal.style.display = "block";
}
function openDeleteModal() {
  console.log("Delete button clicked!");
  deleteModal.style.display = "block";
}
      
// Function to close the modals
function closeEditModal() {
  modal.style.display = "none";
}
function closeDeleteModal() {
  deleteModal.style.display = "none";
}
  
// Attach click event handlers to all edit and delete buttons
editBtns.forEach(function (editBtn) {
  editBtn.onclick = openEditModal;
});
deleteBtns.forEach(function (deleteBtn) {
  deleteBtn.onclick = openDeleteModal;
});
  
// When the user clicks on x button, close the modal
editSpan.onclick = closeEditModal;
deleteSpan.onclick = closeDeleteModal;
    
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == editModal) {
      closeEditModal();
  } else if (event.target == deleteModal) {
      closeDeleteModal();
  }
};