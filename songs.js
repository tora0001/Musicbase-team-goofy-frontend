"use strict";

// const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
const endpoint = "http://localhost:4000";

window.addEventListener("load", start);

async function start() {
   const songs = await getSongs();
   showSongs(songs);
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
        <p>${song.songName}</p>
        <button id= "btn-update" >Update</button>
        <button id= "btn-delete" >Delete</button>
    </article>`;
   document.querySelector("#songs").insertAdjacentHTML("beforeend", html);
}

function showSongs(songs) {
   document.querySelector("#songs").innerHTML = "";

   for (const song of songs) {
      showSong(song);
   }
}
