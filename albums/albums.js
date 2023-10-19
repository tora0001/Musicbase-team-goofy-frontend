"use strict";

class Album {
  constructor(albumName, image, releaseYear) {
    this.albumName = albumName;
    this.image = image;
    this.releaseYear = releaseYear;
  }

  // Metode til at vise kunstnerens oplysninger i grid
  display() {
    const html = /* html */ `
      <article>
        <h1>${this.albumName}</h1>
        <img src="${this.image}">
        <p>Release year: ${this.releaseYear}</p>
      </article>`;
    document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
  }
}

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedAlbum;

window.addEventListener("load", start);

async function start() {
  updateGrid();

  document.querySelector("#albums").addEventListener("click", albumClicked);
  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
}

async function updateGrid() {
  const albums = await getAlbums();
  showAlbums(albums);
}

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data.map((albumData) => new Album(albumData.albumName, albumData.image, albumData.releaseYear));
}

function showAlbums(albums) {
  document.querySelector("#albums").innerHTML = "";
  for (const album of albums) {
    album.display();
  }
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
