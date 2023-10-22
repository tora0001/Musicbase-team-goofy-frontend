export const AlbumRenderer = {
   render(album) {
      const html = /* html */ `
            <article>
                <h1>${album.albumName}</h1>
                <img src="${album.image}">
                <p>Release year: ${album.releaseYear}</p>
            </article>`;
      return html;
   },
};
