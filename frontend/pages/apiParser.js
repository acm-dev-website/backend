//event list is the list you want to append to
//type is | event | project | workshop
export function apiFetch (eventList, type){
    //index --> value
    //key  --> value
    const template = `http://localhost:3000/api/fetch/`
    const urls = new Map([
        ['events',template+'events'],
        ['projects',template+'projects'],
        ['workshops',template+'workshops']
    ]);
    fetch(urls.get(type))
        .then(response => response.json())
        .then(jsonData => {
            // Loop through each event in the JSON data and append to the ul element
            console.log(jsonData);
            jsonData.message.forEach(event => {
                const template = `
                <li class="eventElement">
                    <div class="eventInfoBox">
                        <p class="eventName">
                            <strong>${event.name}</strong>
                        </p>
                        <p class="eventDate">
                            <strong>${event.date}</strong>
                        </p>
                        <p class="eventDescription">
                            <strong>Description:</strong>
                            "${event.description}"
                        </p>
                    </div>
                    <img class="eventImage" src="http://localhost:3000/api/fetch/images/${event.imageName}">
                </li>`;
                eventList.insertAdjacentHTML("beforeend",template);
            });
        })
        .catch(error => console.error('Error fetching JSON:', error));
}