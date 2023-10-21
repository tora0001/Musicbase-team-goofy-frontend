class Artist {
  constructor(name, image, genre) {
    this.name = name;
    this.image = image;
    this.genre = genre;
  }

  // Metode til at vise kunstnerens oplysninger i griddet
  display() {
    const html = /* html */ `
      <article>
        <h1>${this.name}</h1>
        <img src="${this.image}">
        <p>Genre: ${this.genre}</p>
      </article>`;
    document.querySelector("#artists").insertAdjacentHTML("beforeend", html);
  }
}

class Album {
  constructor(albumName, image, releaseYear) {
    this.albumName = albumName;
    this.image = image;
    this.releaseYear = releaseYear;
  }

  // Metode til at vise kunstnerens oplysninger i grid
  display() {
    const html = /* html */ `
      <article>
        <h1>${this.albumName}</h1>
        <img src="${this.image}">
        <p>Release year: ${this.releaseYear}</p>
      </article>`;
    document.querySelector("#albums").insertAdjacentHTML("beforeend", html);
  }
}

export { Artist, Album };
