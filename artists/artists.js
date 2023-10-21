"use strict";
import { Artist } from "../objects.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedArtist;

window.addEventListener("load", start);

async function start() {
  updateGrid();
  document.querySelector("#artists").addEventListener("click", artistClicked);
  document
    .querySelector("#input-search")
    .addEventListener("keyup", inputSearchChanged);
  document
    .querySelector("#input-search")
    .addEventListener("search", inputSearchChanged);
}

async function updateGrid() {
  const artists = await getArtists();
  showArtists(artists);
}

async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data.map(
    (artistData) =>
      new Artist(artistData.name, artistData.image, artistData.genre)
  );
}

function showArtists(artists) {
  document.querySelector("#artists").innerHTML = "";
  for (const artist of artists) {
    artist.display();
  }
}

function artistClicked(event) {
  const artistElement = event.target.closest("article");
  if (artistElement) {
    const artists = Array.from(document.querySelectorAll("#artists article"));
    const selectedArtistIndex = artists.indexOf(artistElement);
    if (selectedArtistIndex !== -1) {
      selectedArtist = artists[selectedArtistIndex];

      const dialog = document.createElement("div");
      dialog.classList.add("dialog-window");
      dialog.innerHTML = /* html */ `
        <h2>${selectedArtist.querySelector("h1").textContent}</h2>
        <img src="${selectedArtist.querySelector("img").src}">
        <p>${selectedArtist.querySelector("p").textContent}</p>
        <button id="close-dialog">Close</button>
      `;

      dialog.querySelector("#close-dialog").addEventListener("click", () => {
        document.body.removeChild(dialog);
      });

      document.body.appendChild(dialog);
    }
  }
}

async function inputSearchChanged(event) {
  console.log("Searching");
  const query = event.target.value.toLowerCase();
  const artists = await getArtists();
  const filteredArtists = artists.filter((artist) =>
    artist.name.toLowerCase().includes(query)
  );
  showArtists(filteredArtists);
}
