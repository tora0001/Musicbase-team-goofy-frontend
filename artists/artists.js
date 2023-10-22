"use strict";
import { Artist } from "../objects.js";
import * as ListRenderer from "../listrenderer.js";
import { ArtistRenderer } from "../artistrenderer.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedArtist;

window.addEventListener("load", start);

async function start() {
   const artists = await getArtists();

   document.querySelector("#artists").addEventListener("click", artistClicked);
   document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
   document.querySelector("#input-search").addEventListener("search", inputSearchChanged);

   const artistList = ListRenderer.construct(artists, "#artists", ArtistRenderer);
   artistList.render();
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

async function inputSearchChanged(event) {
   console.log("Searching");
   const query = event.target.value.toLowerCase();
   const artists = await getArtists();
   const filteredArtists = artists.filter((artist) => artist.name.toLowerCase().includes(query));
   showArtists(filteredArtists);
}
