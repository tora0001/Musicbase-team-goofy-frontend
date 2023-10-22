import { Song } from "../objects.js";
import * as ListRenderer from "../listrenderer.js";
import { SongRenderer } from "../songrenderer.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedSong;

window.addEventListener("load", start);

async function start() {
   const songs = await getSongs();

   document.querySelector("#input-search").addEventListener("keyup", inputSearchChanged);
   document.querySelector("#input-search").addEventListener("search", inputSearchChanged);

   const songList = ListRenderer.construct(songs, "#songs", SongRenderer);
   songList.render();
}

async function getSongs() {
   const response = await fetch(`${endpoint}/songs`);
   const data = await response.json();
   return data;
}

async function inputSearchChanged(event) {
   console.log("Searching");
   const query = event.target.value.toLowerCase();
   const songs = await getSongs();
   const filteredSongs = songs.filter((song) => song.songName.toLowerCase().includes(query));
   showSongs(filteredSongs);
}
