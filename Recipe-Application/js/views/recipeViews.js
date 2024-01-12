class RecipeView {
  #parentElement = document.querySelector(".current-recipe");
  #data;

  render(data) {
    this.#data = data;
    const markup = this.#generateMarkup();
    this.#clear();
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  }

  #clear() {
    this.#parentElement.innerHTML = "";
  }

  renderSpinner = function () {
    const markup = `
      <div class="spinner">
        <img src="svg/tube-spinner.svg">
      </div>
    `;
    this.#parentElement.innerHTML = "";
    this.#parentElement.insertAdjacentHTML("afterbegin", markup);
  };

  #generateMarkup() {
    return `
    <img src="${this.#data.image}">
    <h1 class="recipe__title">${this.#data.title}</h1>
    <div class="recipe__information-container">
     <p class="recipe__cookingTime"> <i class="fa fa-clock-o" style="font-size:20px"></i>${
       this.#data.cookingTime
     } minutes </p>
     <div class="recipe__servings">
       <p class="recipe__servings"><i class='fa fa-user'></i> ${
         this.#data.servings
       }</p>
       <button class="btn__add"><span class="symbol">+</span></button>
       <button class="btn__add"><span class="symbol">-</span></button>
     </div>
     <button class="btn__bookMark"><i class="fa fa-bookmark-o" style="font-size:25px"></i></button>
    </div>

    <div class="recipe-ingredients-container">
       <h1 class="recipe__ingredients">RECIPE INGREDIENTS</h1>
       <div class="recipe__list">
      ${this.#data.ingredients
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
         this.#data.publisher
       }</strong> Please check out<br> directions at their website.</p>
       <button class="directions__btn href="${
         this.#data.sourceUrl
       } target="_blank"">Directions</button>
     </div>
    `;
  }
}

export default new RecipeView();
