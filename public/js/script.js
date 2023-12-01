/**
 * 
 * Validates the input in the event page form fields.
 * @param {Event} e
 *
 */
function submitEvent(e) {
  e.preventDefault();
  // Remove whitespace
  let name = document.getElementById("name").value.trim();
  let date = document.getElementById("date").value;
  let description = document.getElementById("description").value.trim();
  
  // Check for empty fields
  if (!name || !date || !description) {
    alert("Please fill out all fields before submitting!");
    return;
  }

  alert("Event Added!");
  document.getElementById("event_form").submit();
}