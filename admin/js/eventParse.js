window.onload = displayEvents();
let editContainer = document.getElementById('itemContainer');

function displayEvents() {
	fetch('api/fetch/events').then((res) => { return res.json() }).then((data) => {
		data.message.forEach(element => {
			addElement(element);
		});
	});
}

function searchElement() {
	let searchQuery = search.value;

	fetch('api/fetch/events?name=' + searchQuery).then((res) => { return res.json() }).then((data) => {
		editContainer.innerHTML = "";
		data.message.forEach(element => {
			addElement(element);
		});
	});
}

function addElement(element) {
	let container = `
	<div class="editItem">
		<img src="api/fetch/images/${element.imageName}" alt="" height="100" class="editImage" /> 
		<div class="editText">
			<h2>${element.name}</h2>
			<p>${element.description}</p>
			<p><b>${element.date}</b></p>
			<button class="editBtn" onclick="openEditModal('${element.name}', '${element.date}', 
														   '${element.description}', '${element.imageName}')" >Edit</button>
			<button class="editBtn deleteBtn" onclick="openDelModal('${element.name}', '${element.imageName}')" >Delete</button
		</div>
	</div>
`;
	editContainer.innerHTML += container;
}

const search = document.getElementById('search');
search.addEventListener('input', searchElement);
