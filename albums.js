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
  const albums = await getAlbums();
  showAlbums(albums);
}

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data;
}

function showAlbum(album) {
  const html = /* html */ `
    <article>
        <img src="${album.image}">
        <p>${album.albumName}</p>
        <button id= "btn-update" >Update</button>
        <button id= "btn-delete" >Delete</button>
    </article>`;
  document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
}

function showAlbums(albums) {
  document.querySelector("#albums").innerHTML = "";

  for (const album of albums) {
    showAlbum(album);
  }
}

//search function

async function inputSearchChanged(event) {
  console.log("Searching");
  const query = event.target.value.toLowerCase();
  const albums = await getAlbums();
  const filteredAlbums = albums.filter((album) => album.albumName.toLowerCase().includes(query));
  showAlbums(filteredAlbums);
}
