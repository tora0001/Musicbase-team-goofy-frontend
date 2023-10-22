class Artist {
   constructor(object) {
      this.name = object.name;
      this.image = object.image;
      this.genre = object.genre;
   }
}

class Album {
   constructor(object) {
      this.albumName = object.albumName;
      this.image = object.image;
      this.releaseYear = object.releaseYear;
   }
}

class Song {
   constructor(object) {
      this.songName = object.songName;
      this.length = object.length;
   }
}

export { Artist, Album, Song };
