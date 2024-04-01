
fetch('api/fetch/events').then((res) => { return res.json() }).then((data) => {
	data.message.forEach(element => {
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
		document.getElementById("editContainer").innerHTML += container;
	});
});

