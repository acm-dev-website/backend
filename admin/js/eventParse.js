window.onload = displayEvents();
let editContainer = document.getElementById('itemContainer');

function displayEvents() {
	fetch('http://localhost:3000/api/fetch/events').then((res) => { return res.json() }).then((data) => {
		data.message.forEach(element => {
			addElement(element);
		});
	});
}

function searchElement() {
	let searchQuery = search.value;

	fetch('http://localhost:3000/api/fetch/events?name=' + searchQuery).then((res) => { return res.json() }).then((data) => {
		editContainer.innerHTML = "";
		data.message.forEach(element => {
			addElement(element);
		});
	});
}

function randNum(max) {
	return Math.floor(Math.random() * max) + 1;
}

function addElement(element) {
	let id = randNum(100000);
	let container = `
	<div class="editItem" id=${id}>
		<img src="api/fetch/images/${element.imageName}" height="100" class="editImage" /> 
		<div class="editText">
			<h2>${element.name}</h2>
			<p>${element.description}</p>
			<p><b>${element.date}</b></p>
			<button class="editBtn" onclick="openEditModal('${element.name}', '${element.date}', '${element.time}', 
															'${element.description}', '${element.imageName}', '${id}',
															'${element.type}',  '${element.leader}', '${element.location}')" >Edit</button>
			<button class="editBtn deleteBtn" onclick="openDelModal('${element.name}', '${element.imageName}', '${id}')" >Delete</button
		</div>
	</div>
`;
	editContainer.innerHTML += container;
}

const search = document.getElementById('search');
search.addEventListener('input', searchElement);
