export const SongRenderer = {
   render(song) {
      const html = /* html */ `
        <article>
            <h1>${song.songName}</h1>
            <p>${song.length} Minutes</p>
        </article>`;
      return html;
   },
};
