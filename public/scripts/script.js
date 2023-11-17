const eventCardTemplate = document.querySelector("[event-card-template]");
const eventCardsContainer = document.querySelector(".event-cards");
const searchInput = document.querySelector("#events-search-bar");

let events = [];

function getEvents() {
  const eventDivs = [...document.querySelector(".event-cards").children];
  eventDivs.forEach((div) => {
    const name = div.querySelector(".header").innerText;
    const description = div.querySelector(".description").innerText;
    const date = div.querySelector(".date").innerText;
    const mongoID = div.querySelector(".mongoID").innerText;
    events.push({
      name: name,
      description: description,
      date: new Date(date),
      mongoID: mongoID,
      div: div,
    });
  });
}

getEvents();

// Event for whenever changes whats in the search bar
searchInput.addEventListener("input", (e) => {
  const value = e.target.value.toLowerCase();
  events.forEach((event) => {
    const isHidden = !(
      event.name.toLowerCase().includes(value) ||
      event.description.toLowerCase().includes(value)
    );
    event.div.classList.toggle("hide", isHidden);
  });
});
