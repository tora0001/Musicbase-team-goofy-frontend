"use strict";

class Song {
  constructor(songName, length) {
    this.songName = songName;
    this.length = length;
  }

  // Metode til at vise kunstnerens oplysninger i griddet
  display() {
    const html = /* html */ `
      <article>
        <h1>${this.songName}</h1>
        <p>${this.length} Minutes</p>
      </article>`;
    document.querySelector("#songs").insertAdjacentHTML("beforeend", html);
  }
}

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedSong;

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
  return data.map((songData) => new Song(songData.songName, songData.length));
}

function showSongs(songs) {
  document.querySelector("#songs").innerHTML = "";
  for (const song of songs) {
    song.display();
  }
}

async function inputSearchChanged(event) {
  console.log("Searching");
  const query = event.target.value.toLowerCase();
  const songs = await getSongs();
  const filteredSongs = songs.filter((song) => song.songName.toLowerCase().includes(query));
  showSongs(filteredSongs);
}
