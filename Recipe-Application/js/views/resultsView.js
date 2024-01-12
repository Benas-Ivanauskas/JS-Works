import View from "./view.js";
class ResultsView extends View {
  _parentElement = document.querySelector(".found-recipes");
  _errorMessage = `No recipes found for your query! Please try again! ⛔🤚`;
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

export default new ResultsView();
