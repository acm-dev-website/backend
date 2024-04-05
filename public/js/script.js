/**
 * Validates the input in the event page form fields.
* @param {Event} e
 */
function submitEvent(e) {
    e.preventDefault();

    let name = document.getElementById("name").value.trim();
    let date = document.getElementById("date").value;
    let description = document.getElementById("description").value.trim();
    let imageInput = document.getElementById("image");
    let startTime = document.getElementById("start-time").value;
    let endTime = document.getElementById("end-time").value;
    let imageFile = imageInput.files[0]; // Get the selected image file

    // Check for empty fields
    if (!name || !date || !description) {
        alert("Please fill out all fields before submitting!");
        return;
    }
    console.log(date + " hi");
    console.log(startTime);
    console.log(endTime);
    let startHour = Number.parseInt(startTime.slice(0, 2));
    let endHour = Number.parseInt(endTime.slice(0, 2));
    
    if (endHour - startHour < 1) {
        alert("Times are invalid (event must end at least an hour after it starts).");
        return;
    }

    let formData = new FormData();
    formData.append("name", name);
    formData.append("date", date);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("description", description);
    formData.append("image", imageFile);

    alert("Event Added!");

    document.getElementById("event_form").submit();
}