import View from "./view.js";
class BookmarksView extends View {
  _parentElement = document.querySelector(".bookmark__list");
  _errorMessage = `No bookmarks yet! Find recipe and bookmark it.`;
  _message = "";

  _generateMarkup() {
    // console.log(this._data);
    return this._data.map(this._generatemarkupPreview).join("");
  }

  _generatemarkupPreview(result) {
    return `
  <a class="preview__link" href="#${result.id}">
     <img class="found-recipes__img" src="${result.image}" alt="${result.title}" />
    <div class="recipe-information">
      <h2 class="pizza__name">${result.title}</h2>
      <h2 class="pizza__publisher">${result.publisher}</h2>
    </div>
  </a>
    `;
  }
}

export default new BookmarksView();

// Assuming you have the bookmarks container element with the class "bookmarks"
const bookmarksContainer = document.querySelector(".bookmarks");
