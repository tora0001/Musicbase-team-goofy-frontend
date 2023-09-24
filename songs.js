"use strict";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

window.addEventListener("load", start);

async function start() {
  updateGrid();

  document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
  document.querySelector("#input-search").addEventListener("search", inputSearchChanged);
}

async function updateGrid() {
  const songs = await getSongs();
  showSongs(songs);
}

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

async function inputSearchChanged(event) {
  console.log("Searching");
  const query = event.target.value.toLowerCase();
  const songs = await getSongs();
  const filteredSongs = songs.filter((song) => song.songName.toLowerCase().includes(query));
  showSongs(filteredSongs);
}
