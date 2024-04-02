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

function randNum(max) {
    return Math.floor(Math.random() * max) + 1;
}

function addElement(element) {
	let time = convertTime(element.time);
	let id = randNum(100000);
	let container = `
	<div class="editItem" id="${id}">
		<img src="http://localhost:3000/api/fetch/images/${element.imageName}" alt="acm" height="100" class="editImage" /> 
		<div class="editText">
			<h2>${element.name}</h2>
			<p>${element.description}</p>
			<p><b>${element.date}</b> at <b>${time}</b></p>
			<button class="editBtn" onclick="openModal('edit', '${element.name}', '${id}')" >Edit</button>
			<button class="editBtn deleteBtn" onclick="openModal('delete', '${element.name}', '${id}')" >Delete</button>
		</div>
	</div>
`;
	editContainer.innerHTML += container;
}

function convertTime(time24) {
	const [hours, minutes] = time24.split(':').map(Number);
	const period = hours < 12 ? 'AM' : 'PM';
	const hours12 = hours % 12 || 12;

	return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
}

const search = document.getElementById('search');
search.addEventListener('input', searchElement);
