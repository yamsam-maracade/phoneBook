function Contact(firstName, lastName, phoneNumber) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
}

Contact.prototype.fullName = function () {
  return this.firstName + " " + this.lastName;
};

function AddressBook() {
  this.contacts = [];
}

AddressBook.prototype.addContact = function (contact) {
  this.contacts.push(contact);
};


function Place(location, landmarks, season, notes) {
  this.location = location;
  this.landmarks = landmarks;
  this.season = season;
  this.notes = notes;
}

Place.prototype.details = function () {
  return `
    <h3>${this.location}</h3>
    <p><strong>Landmarks:</strong> ${this.landmarks}</p>
    <p><strong>Season:</strong> ${this.season}</p>
    <p><strong>Notes:</strong> ${this.notes}</p>
  `;
};

function PlaceList() {
  this.places = [];
}

PlaceList.prototype.addPlace = function (place) {
  this.places.push(place);
};

const addressBook = new AddressBook();
const placeList = new PlaceList();

function displayContacts() {
  const ul = document.getElementById("contact-list");
  ul.innerHTML = "";

  addressBook.contacts.forEach(function (contact) {
    const li = document.createElement("li");
    li.textContent = contact.fullName() + " - " + contact.phoneNumber;
    ul.appendChild(li);
  });
}

function displayPlaces() {
  const ul = document.getElementById("places-list");
  ul.innerHTML = "";

  placeList.places.forEach(function (place) {
    const li = document.createElement("li");
    li.textContent = place.location;
    li.addEventListener("click", function () {
      document.getElementById("place-details").innerHTML = place.details();
    });
    ul.appendChild(li);
  });
}

document.getElementById("contact-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const contact = new Contact(
    document.getElementById("first-name").value,
    document.getElementById("last-name").value,
    document.getElementById("phone-number").value
  );

  addressBook.addContact(contact);
  displayContacts();
  this.reset();
});

document.getElementById("place-form").addEventListener("submit", function (event) {
  event.preventDefault();

  const place = new Place(
    document.getElementById("location").value,
    document.getElementById("landmarks").value,
    document.getElementById("season").value,
    document.getElementById("notes").value
  );

  placeList.addPlace(place);
  displayPlaces();
  this.reset();
});