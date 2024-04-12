/**
 * Validates the input in the event page form fields.
* @param {Event} e
 */

let editSubmit = document.getElementById("ebtn");

editSubmit.addEventListener("click", function(event){
    submitEvent(event);
});


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