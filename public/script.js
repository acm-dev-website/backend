const eventCardTemplate = document.querySelector("[event-card-template]");
const eventCardsContainer= document.querySelector(".event-cards");
const searchInput = document.querySelector("#search");

let events = [];

fetch("/raw/events/all")
  .then((res) => res.json())
  .then((data) => {
    events = data.map(event => {
        // Getting html divs where the text needs to go
        const card = eventCardTemplate.content.cloneNode(true).children[0];
        const headerDiv = card.querySelector("[data-header]");
        const descriptionDiv = card.querySelector("[data-description]");
        const dateDiv = card.querySelector("[data-date]");
        // Getting html divs for the buttons
        const editButton = card.querySelector("[edit-button]");
        const deleteButton = card.querySelector("[delete-button");

        // Putting text into cards
        headerDiv.textContent = event.name;
        descriptionDiv.textContent = event.description;
        dateDiv.textContent = new Date(event.date).toLocaleDateString('en-us');

        // Initilizing function calls for edit and delete buttons
        editButton.setAttribute("onclick", `openEditModal("${event._id}")`);
        deleteButton.setAttribute("onclick", `openDeleteModal("${event._id}")`);

        // Adding the new card to the html page
        eventCardsContainer.append(card);
        return {
          name: event.name,
          description: event.description,
          element: card,
          eventMongoID: event._id,
        };
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


/* MODAL STUFFS */

// Get the modals
const modal = document.getElementById("editModal");
const deleteModal = document.getElementById("deleteModal");
    
// Set up span elements for edit and delete modals
const editSpan = document.getElementById("editClose");
const deleteSpan = document.getElementById("deleteClose");
  
// Function to open the modals
function openEditModal(mongoID) {
  console.log("Edit Button clicked!");
  editModal.style.display = "block";
  console.log(mongoID)
}
function openDeleteModal(mongoID) {
  console.log("Delete button clicked!");
  deleteModal.style.display = "block";
  console.log(mongoID);
  // const something = await fetch(`raw/events/${mongoID}`);  <-- Now you just have to figure out how to do the fetch request
  // But It wont be exactly what I put there, that was just a guess
}
      
// Functions to close the modals
function closeEditModal() {
  modal.style.display = "none";
}
function closeDeleteModal() {
  deleteModal.style.display = "none";  
}
  
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