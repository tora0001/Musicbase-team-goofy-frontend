class Artist {
   constructor(name, image, genre) {
      this.name = name;
      this.image = image;
      this.genre = genre;

      this.artistsContainer = document.querySelector("#artists");
   }

   // Metode til at vise kunstnerens oplysninger i griddet
   display() {
      const html = /* html */ `
      <article>
        <h1>${this.name}</h1>
        <img src="${this.image}">
        <p>Genre: ${this.genre}</p>
      </article>`;
      this.artistsContainer.insertAdjacentHTML("beforeend", html);
   }
}

// class Album {
//    constructor(albumName, image, releaseYear) {
//       this.albumName = albumName;
//       this.image = image;
//       this.releaseYear = releaseYear;

//       // this.albumContainer = document.querySelector("#albums");
//    }

//    //   // Metode til at vise albummets oplysninger i grid
//    //   display() {
//    //     const html = /* html */ `
//    //       <article>
//    //         <h1>${this.albumName}</h1>
//    //         <img src="${this.image}">
//    //         <p>Release year: ${this.releaseYear}</p>
//    //       </article>`;
//    //     this.albumContainer.insertAdjacentHTML("beforeend", html);
//    //   }
// }

class Album {
   constructor(object) {
      this.albumName = object.albumName;
      this.image = object.image;
      this.releaseYear = object.releaseYear;
   }
}

export { Artist, Album };
