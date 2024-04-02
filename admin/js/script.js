/**
 * Validates the input in the event page form fields.
* @param {Event} e
 */
function submitEvent(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value.trim();
    let time = document.getElementById("timeInput").value;
    let imageInput = document.getElementById("image");
    let imageFile = imageInput.files[0]; // Get the selected image file

    // Check for empty fields
    if (!name || !date || !description || !time) {
        alert("Please fill out all fields before submitting!");
        return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("description", description);
    formData.append("time", time);
    formData.append("image", imageFile);

    alert("Event Added!");


    document.getElementById("event_form").submit();


}