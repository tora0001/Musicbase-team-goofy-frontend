"use strict";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";

window.addEventListener("load", start);

async function start() {
  const artists = await getSongs();
  showArtists(artists);
}

// async function getArtists() {
//   const response = await fetch(`${endpoint}/artists`);
//   const data = await response.json();
//   return data;
// }

// async function getAlbums() {
//   const response = await fetch(`${endpoint}/albums`);
//   const data = await response.json();
//   return data;
// }

async function getSongs() {
  const response = await fetch(`${endpoint}/songs`);
  const data = await response.json();
  return data;
}

function showSong(song) {
  const html = /* html */ `
    <article>
        <img src="${song.image}">
        <p>${song.name}</p>
        <button id= "btn-update" >Update</button>
        <button id= "btn-delete" >Delete</button>
    </article>`;
  document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
}

function showArtists(artists) {
  document.querySelector("#artists").innerHTML = "";

  for (const artist of artists) {
    showArtist(artist);
  }
}
