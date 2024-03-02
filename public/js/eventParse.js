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

		let date = document.createElement('p');
		date.textContent = element.date;

		container.appendChild(title);
		container.appendChild(description);
		container.appendChild(date);
		// append to fragement to avoid excessive repaints
		fragment.appendChild(container);
	});
	// append fragement to dom when all entries are ready
	document.getElementById("events").appendChild(fragment);
});