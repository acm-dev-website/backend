// const fragment = document.createDocumentFragment();

// i have shortened this code a little bit. 
// we can edit it further when it is time to handle images - must

fetch('api/fetch/events?type=gbm').then((res) => { return res.json() }).then((data) => {
	data.message.forEach(element => {
		// console.log(element);
		// let container = document.createElement('div');
		// container.className = 'eventContainer';

		// let title = document.createElement("h1");
		// title.textContent = element.name;

		// let description = document.createElement("p");
		// description.textContent = element.description;

		// // need to download image and append it as well - idk what images even exist.
		// // THIS WILL CRASH IF THE IMAGE DOES NOT EXIST
		// // THIS NEEDS TO BE HANDELED EITHER IN THE API ROUTE OR IN MONGO
		// let image = document.createElement("img");
		// image.src = './api/fetch/images/' + element.imageName;
		// image.alt = element.imageName;

		// let date = document.createElement('p');
		// date.textContent = element.date;
		// container.appendChild(title);
		// container.appendChild(description);
		// container.appendChild(date);
		// container.appendChild(image)
		// // append to fragement to avoid excessive repaints
		// fragment.appendChild(container);

		let container = `
			<div class="editItem">
				<img src="/js/acm.jpg" alt="acm" height="100" class="editImage" /> 
				<div class="editText">
					<h2>${element.name}</h2>
					<p>${element.description}</p>
					<p><b>${element.date}</b></p>
					<button class="editBtn">Edit</button>
					<button class="editBtn">Delete</button>
				</div>
			</div>
		`; 

		// <img src="/api/fetch/images/${element.imageName}" alt="${element.imageName}" />
		// this line will also be implemented in the editItem. however the behavior is 
		// undefined so i will leave it for now
		// i have also added a test image. please keep it until we implement the image thing

		document.getElementById("editContainer").innerHTML += container;
	});
	// append fragement to dom when all entries are ready
	// document.getElementById("editContainer").appendChild(fragment);
});

