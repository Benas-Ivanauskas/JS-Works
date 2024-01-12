import View from "./view.js";

class RecipeView extends View {
  _parentElement = document.querySelector(".current-recipe");
  _errorMessage = `💥💥💥 --- We could not find that recipe. Please try another one!`;
  _message = "";

  addHandlerRender(handler) {
    ["hashchange", "load"].forEach((event) =>
      window.addEventListener(event, handler)
    );
    // window.addEventListener("hashchange", showRecipe);
    // window.addEventListener("load", showRecipe);
  }

  _generateMarkup() {
    return `
    <img src="${this._data.image}">
    <h1 class="recipe__title">${this._data.title}</h1>
    <div class="recipe__information-container">
     <p class="recipe__cookingTime"> <i class="fa fa-clock-o" style="font-size:20px"></i>${
       this._data.cookingTime
     } minutes </p>
     <div class="recipe__servings">
       <p class="recipe__servings"><i class='fa fa-user'></i> ${
         this._data.servings
       }</p>
       <button class="btn__add"><span class="symbol">+</span></button>
       <button class="btn__add"><span class="symbol">-</span></button>
     </div>
     <button class="btn__bookMark"><i class="fa fa-bookmark-o" style="font-size:25px"></i></button>
    </div>

    <div class="recipe-ingredients-container">
       <h1 class="recipe__ingredients">RECIPE INGREDIENTS</h1>
       <div class="recipe__list">
      ${this._data.ingredients
        .map((ing, i) => {
          return `<ul>${i + 1}) ${ing.quantity} ${ing.unit} ${
            ing.description
          }</ul> `;
        })
        .join("")}
      </div>
      </div>
     <div class="recipe__directions">
       <h1 >HOW TO COOK IT</h1>
       <p class="recipe-directions--text">This recipe was carefully designed and tested by <strong>${
         this._data.publisher
       }</strong> Please check out<br> directions at their website.</p>
       <button class="directions__btn" onclick="window.open('${
         this._data.sourceUrl
       }', '_blank')"
       } target="_blank"">Directions</button>
     </div>
    `;
  }
}

export default new RecipeView();
