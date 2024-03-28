const fragment = document.createDocumentFragment();

fetch('api/fetch/events?type=gbm').then((res) => { return res.json() }).then((data) => {
	data.message.forEach(element => {
		console.log(element);
		let container = document.createElement('div');
		container.className = 'eventContainer';

		let title = document.createElement("h1");
		title.textContent = element.name;

		let description = document.createElement("p");
		description.textContent = element.description;

		// need to download image and append it as well - idk what images even exist.
		// THIS WILL CRASH IF THE IMAGE DOES NOT EXIST
		// THIS NEEDS TO BE HANDELED EITHER IN THE API ROUTE OR IN MONGO
		let image = document.createElement("img");
		image.src = './api/fetch/images/'+element.imageName;
		image.alt = element.imageName;

		let date = document.createElement('p');
		date.textContent = element.date;
		container.appendChild(title);
		container.appendChild(description);
		container.appendChild(date);
		container.appendChild(image)
		// append to fragement to avoid excessive repaints
		fragment.appendChild(container);
	});
	// append fragement to dom when all entries are ready
	document.getElementById("events").appendChild(fragment);
});