"use strict";
import { Artist, Album } from "../objects.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedArtist;
let selectedAlbum;

window.addEventListener("load", start);

async function start() {
  updateGrid();

  document.querySelector("#albums").addEventListener("click", albumClicked);
  document.querySelector("#artists").addEventListener("click", artistClicked);
}

// read data

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

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data.map(
    (albumData) =>
      new Album(albumData.albumName, albumData.image, albumData.releaseYear)
  );
}

function showAlbums(albums) {
  document.querySelector("#albums").innerHTML = "";
  for (const album of albums) {
    album.display();
  }
}

async function updateGrid() {
  const songs = await getSongs();
  showSongs(songs);
  const artists = await getArtists();
  showArtists(artists);
  const albums = await getAlbums();
  showAlbums(albums);
}

async function getSongs() {
  const response = await fetch(`${endpoint}/songs`);
  const data = await response.json();
  return data;
}

function showSong(song) {
  const html = /* html */ `
    <article>
        <h1>${song.songName}</h1>
        <p>Duration: <b>${song.length}</b> minutes</p>
    </article>`;
  document.querySelector("#songs").insertAdjacentHTML("beforeend", html);
}

function showSongs(songs) {
  document.querySelector("#songs").innerHTML = "";

  for (const song of songs) {
    showSong(song);
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
