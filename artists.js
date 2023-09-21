"use strict";

// const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
const endpoint = "http://localhost:4000";

let selectedArtist;

window.addEventListener("load", start);

async function start() {
   updateGrid();

   document.querySelector("#form-create-artist").addEventListener("submit", createArtist);
   document.querySelector("#form-update-artist").addEventListener("submit", updateClicked);
}

async function updateGrid() {
   const artists = await getArtists();
   showArtists(artists);
}

// read data

async function getArtists() {
   const response = await fetch(`${endpoint}/artists`);
   const data = await response.json();
   return data;
}

function showArtist(artist) {
   const html = /* html */ `
    <article>
        <img src="${artist.image}">
        <p>${artist.name}</p>
        <button id= "btn-update" >Update</button>
        <button id= "btn-delete" >Delete</button>
    </article>`;
   document.querySelector("#artists").insertAdjacentHTML("beforeend", html);

   document.querySelector("#artists article:last-child #btn-update").addEventListener("click", () => updateArtist(artist));
   document.querySelector("#artists article:last-child #btn-delete").addEventListener("click", () => deleteArtist(artist.id));
}

function showArtists(artists) {
   document.querySelector("#artists").innerHTML = "";

   for (const artist of artists) {
      showArtist(artist);
   }
}

// create artist

async function createArtist(event) {
   event.preventDefault();
   const elements = document.querySelector("#form-create-artist").elements;

   const artist = {
      name: elements.name.value,
      image: elements.image.value,
      genre: elements.genre.value,
   };

   const json = JSON.stringify(artist);
   const response = await fetch(`${endpoint}/artists`, {
      method: "POST",
      body: json,
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (response.ok) {
      console.log("artist added");
      updateGrid();
   }
}

// update artist

function updateArtist(artist) {
   selectedArtist = artist;

   const update = document.querySelector("#form-update-artist");
   update.name.value = artist.name;
   update.image.value = artist.image;
   update.genre.value = artist.genre;

   console.log(selectedArtist);

   document.querySelector("#dialog-update-artist").showModal();
}

async function updateClicked(event) {
   console.log("test");
   event.preventDefault();
   const elements = document.querySelector("#form-update-artist").elements;

   const artist = {
      name: elements.name.value,
      image: elements.image.value,
      genre: elements.genre.value,
   };

   const json = JSON.stringify(artist);
   const response = await fetch(`${endpoint}/artists/${selectedArtist.id}`, {
      method: "PUT",
      body: json,
      headers: {
         "Content-Type": "application/json",
      },
   });

   if (response.ok) {
      console.log("artist updated");
      updateGrid();
   }

   document.querySelector("#dialog-update-artist").close();
}

// delete artist

async function deleteArtist(id) {
   const response = await fetch(`${endpoint}/artists/${id}`, {
      method: "DELETE",
   });
   if (response.ok) {
      console.log("artist deleted");
      updateGrid();
   }
}
