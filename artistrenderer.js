export const ArtistRenderer = {
   render(artist) {
      const html = /* html */ `
             <article>
                 <h1>${artist.name}</h1>
                <img src="${artist.image}">
                <p>Genre: ${artist.genre}</p>
            </article>`;
      return html;
   },
};
