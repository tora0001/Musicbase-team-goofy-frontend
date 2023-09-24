"use strict";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

window.addEventListener("load", start);

async function start() {
  updateGrid();

  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
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
         <h1>${artist.name}</h1>
        <img src="${artist.image}">
        <p>Genre: ${artist.genre}</p>
    </article>`;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);

  //   document.querySelector("#artists article:last-child #btn-update").addEventListener("click", () => updateArtist(artist));
  //   document.querySelector("#artists article:last-child #btn-delete").addEventListener("click", () => deleteArtist(artist.id));
}

function showArtists(artists) {
  document.querySelector("#artists").innerHTML = "";

  for (const artist of artists) {
    showArtist(artist);
  }
}

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data;
}

function showAlbum(album) {
  const html = /* html */ `
    <article>
         <h1>${album.albumName}</h1>
        <img src="${album.image}">
        <p>Release year: ${album.releaseYear}</p>
    </article>`;
  document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
}

function showAlbums(albums) {
  document.querySelector("#albums").innerHTML = "";

  for (const album of albums) {
    showAlbum(album);
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
