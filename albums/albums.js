"use strict";
import { Album } from "../objects.js";
import * as ListRenderer from "../listrenderer.js";
import { AlbumRenderer } from "../albumrenderer.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedAlbum;

window.addEventListener("load", start);

async function start() {
   const albums = await getAlbums();

   document.querySelector("#albums").addEventListener("click", albumClicked);
   document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
   document.querySelector("#input-search").addEventListener("search", inputSearchChanged);

   console.log(albums);

   const albumList = ListRenderer.construct(albums, "#albums", AlbumRenderer);
   albumList.render();
}

async function getAlbums() {
   const response = await fetch(`${endpoint}/albums`);
   const data = await response.json();
   return data;
}

function albumClicked(event) {
   const albumElement = event.target.closest("article");
   if (albumElement) {
      const albums = Array.from(document.querySelectorAll("#albums article"));
      const selectedAlbumIndex = albums.indexOf(albumElement);
      if (selectedAlbumIndex !== -1) {
         selectedAlbum = albums[selectedAlbumIndex];

         const dialog = document.createElement("div");
         dialog.classList.add("dialog-window");
         dialog.innerHTML = /* html */ `
        <h2>${selectedAlbum.querySelector("h1").textContent}</h2>
        <img src="${selectedAlbum.querySelector("img").src}">
        <p>${selectedAlbum.querySelector("p").textContent}</p>
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
   const albums = await getAlbums();
   const filteredAlbums = albums.filter((album) => album.albumName.toLowerCase().includes(query));
   showAlbums(filteredAlbums);
}
