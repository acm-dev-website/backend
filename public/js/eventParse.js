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
		<img src="/js/acm.jpg" alt="acm" height="100" class="editImage" /> 
		<div class="editText">
			<h2>${element.name}</h2>
			<p>${element.description}</p>
			<p><b>${element.date}</b></p>
			<button class="editBtn" onclick="openModal('edit')" >Edit</button>
			<button class="editBtn deleteBtn" onclick="openModal('delete')" >Delete</button>
		</div>
	</div>
`;
	editContainer.innerHTML += container;
}

const search = document.getElementById('search');
search.addEventListener('input', searchElement);
