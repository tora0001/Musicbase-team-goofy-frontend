"use strict";
import { Artist } from "../objects.js";
import * as ListRenderer from "../listrenderer.js";
import { ArtistRenderer } from "../artistrenderer.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedArtist;

window.addEventListener("load", start);

async function start() {
  showArtists();
  document.querySelector("#artists").addEventListener("click", artistClicked);
}

async function showArtists() {
  const artists = await getArtists();
  const artistList = ListRenderer.construct(
    artists,
    "#artists",
    ArtistRenderer,
    "name"
  );
  artistList.render();

  // Search event
  document.querySelector("#input-search").addEventListener("keyup", (event) => {
    const query = event.target.value;
    console.log("searching");
    artistList.search(query);
  });
}
async function getArtists() {
  const response = await fetch(`${endpoint}/artists`);
  const data = await response.json();
  return data;
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
