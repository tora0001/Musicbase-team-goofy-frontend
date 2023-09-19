"use strict";

const endpoint = "https://team-goofy-musicbase.azurewebsites.net";

window.addEventListener("load", start);

async function start() {
  const albums = await getAlbums();
  showAlbums(albums);
}

// async function getArtists() {
//   const response = await fetch(`${endpoint}/artists`);
//   const data = await response.json();
//   return data;
// }

async function getAlbums() {
  const response = await fetch(`${endpoint}/albums`);
  const data = await response.json();
  return data;
}

// async function getSongs() {
//   const response = await fetch(`${endpoint}/songs`);
//   const data = await response.json();
//   return data;
// }

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
