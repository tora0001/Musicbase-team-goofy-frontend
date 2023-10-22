import { Song } from "../objects.js";
import * as ListRenderer from "../listrenderer.js";
import { SongRenderer } from "../songrenderer.js";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";
// const endpoint = "http://localhost:4000";

let selectedSong;

window.addEventListener("load", start);

async function start() {
  showSongs();
}

async function showSongs() {
  const songs = await getSongs();

  const songList = ListRenderer.construct(
    songs,
    "#songs",
    SongRenderer,
    "songName"
  );
  songList.render();

  //search event
  document.querySelector("#input-search").addEventListener("keyup", (event) => {
    const query = event.target.value;
    console.log("searchin");
    songList.search(query);
  });
}

async function getSongs() {
  const response = await fetch(`${endpoint}/songs`);
  const data = await response.json();
  return data;
}
