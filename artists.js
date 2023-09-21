"use strict";

// const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
const endpoint = "http://localhost:4000";

window.addEventListener("load", start);

async function start() {
   const artists = await getArtists();
   showArtists(artists);
}

async function updateGrid() {
   const artists = await getArtists();
   showArtists(artists);
}
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

   document.querySelector("#artists article:last-child #btn-delete").addEventListener("click", () => deleteArtist(artist.id));
}

function showArtists(artists) {
   document.querySelector("#artists").innerHTML = "";

   for (const artist of artists) {
      showArtist(artist);
   }
}

async function deleteArtist(id) {
   const response = await fetch(`${endpoint}/artists/${id}`, {
      method: "DELETE",
   });
   if (response.ok) {
      console.log("artist deleted");
      updateGrid();
   }
}
