// Get the respective ul elements to append workshop elements to
const ucWorkshopList = document.getElementById("ucWorkshopList");
fetchAndDisplay(ucWorkshopList, 'testInfoList.json');

const pastWorkshopList = document.getElementById("pastWorkshopList");
fetchAndDisplay(pastWorkshopList, 'testInfoList.json');

// Parses workshop information from JSON file and displays it on page
function fetchAndDisplay(workshopList, filename) {
    // Fetch JSON data from the external file
    fetch(filename)
        .then(response => response.json())
        .then(jsonData => {
            // Loop through each workshop in the JSON data and append to the ul element
            jsonData.message.forEach(workshop => {
                const workshopElement = createWorkshopElement(workshop);
                workshopList.appendChild(workshopElement);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Function to create HTML elements for each workshop
function createWorkshopElement(workshop) {
    // Create list element and assign workshopElement class to it
    const li = document.createElement("li");
    li.classList.add("workshopElement");
            
    // Create workshopInfoBox div
    const divInfoBox = document.createElement("div");
    divInfoBox.classList.add("workshopInfoBox");

    // Iterate through workshop properties and create <p> elements
    for (const prop in workshop) {
        if (workshop[prop]) {
            const p = document.createElement("p");
            const propName = prop.charAt(0).toUpperCase() + prop.slice(1);
            const className = `workshop${propName}`;

            // Check the class name and adjust inner HTML accordingly
            if (className === "workshopName" || className === "workshopDate") {
                p.classList.add(className);
                p.innerHTML = `<strong>${workshop[prop]}</strong>`;
            }
            else if (className === "workshopLeaders" || className === "workshopDescription" || className === "workshopType") {
                p.classList.add(className);
                
                if (className === "workshopLeaders") {
                    p.innerHTML = `<strong>Led by:</strong> ${workshop[prop]}`;
                }
                else {
                    p.innerHTML = `<strong>${propName}:</strong> ${workshop[prop]}`;
                }
            }
            // Append formatted HTML to workshopInfoBox
            divInfoBox.appendChild(p);
        }
    }

    // Append the workshopInfoBox to the workshopElement
    li.appendChild(divInfoBox);
            
    // Identify if an image was provided and append it to the workshopElement
    if (workshop.imageName) {
        const img = document.createElement("img");
        img.classList.add("workshopImage");
        img.src = `Graphics/${workshop.imageName}`;
        li.appendChild(img);
    }
            
    // Return completed list element
    return li;
}