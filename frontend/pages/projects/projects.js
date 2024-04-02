// Get the respective ul elements to append project elements to
const curProjectList = document.getElementById("curProjectList");
fetchAndDisplay(curProjectList, 'testInfoList.json');

const pastProjectList = document.getElementById("pastProjectList");
fetchAndDisplay(pastProjectList, 'testInfoList.json');

// Parses project information from JSON file and displays it on page
function fetchAndDisplay(projectList, filename) {
    // Fetch JSON data from the external file
    fetch(filename)
        .then(response => response.json())
        .then(jsonData => {
            // Loop through each project in the JSON data and append to the ul element
            jsonData.message.forEach(project => {
                const projectElement = createProjectElement(project);
                projectList.appendChild(projectElement);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}

// Function to create HTML elements for each project
function createProjectElement(project) {
    // Create list element and assign projectElement class to it
    const li = document.createElement("li");
    li.classList.add("projectElement");
            
    // Create projectInfoBox div
    const divInfoBox = document.createElement("div");
    divInfoBox.classList.add("projectInfoBox");

    // Iterate through project properties and create <p> elements
    for (const prop in project) {
        if (project[prop]) {
            const p = document.createElement("p");
            const propName = prop.charAt(0).toUpperCase() + prop.slice(1);
            const className = `project${propName}`;

            // Check the class name and adjust inner HTML accordingly
            if (className === "projectName" || className === "projectDate") {
                p.classList.add(className);
                p.innerHTML = `<strong>${project[prop]}</strong>`;
            }
            else if (className === "projectLeaders" || className === "projectSchedule" || className === "projectDescription") {
                p.classList.add(className);
                
                if (className === "projectLeaders") {
                    p.innerHTML = `<strong>Led by:</strong> ${project[prop]}`;
                }
                else {
                    p.innerHTML = `<strong>${propName}:</strong> ${project[prop]}`;
                }
            }
            // Append formatted HTML to projectInfoBox
            divInfoBox.appendChild(p);
        }
    }

    // Append the projectInfoBox to the projectElement
    li.appendChild(divInfoBox);
            
    // Identify if an image was provided and append it to the projectElement
    if (project.imageName) {
        const img = document.createElement("img");
        img.classList.add("projectImage");
        img.src = `Graphics/${project.imageName}`;
        li.appendChild(img);
    }
            
    // Return completed list element
    return li;
}