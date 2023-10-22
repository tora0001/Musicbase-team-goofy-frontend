export function construct(list, container, itemRenderer, searchProperty) {
  const ListRenderer = {
    container: document.querySelector(container),
    itemRenderer: itemRenderer,
    items: list,
    searchResults: list,
    searchProperty: searchProperty,

    render() {
      this.container.innerHTML = "";
      for (const item of list) {
        const html = this.itemRenderer.render(item);
        this.container.insertAdjacentHTML("beforeend", html);
      }
    },

    search(query) {
      const searchTerm = query.toLowerCase();
      this.searchResults = this.items.filter((item) => {
        return item[this.searchProperty].toLowerCase().includes(searchTerm);
      });

      // Render kun med det der er søgt på
      this.container.innerHTML = "";
      for (const item of this.searchResults) {
        const html = this.itemRenderer.render(item);
        this.container.insertAdjacentHTML("beforeend", html);
      }
    },
  };
  return ListRenderer;
}
