"use strict";
//https://forkify-api.herokuapp.com/v2

const recipeContainer = document.querySelector(".current-recipe");

//Render spinner loader
const renderSpinner = function () {
  const markup = `
    <div class="spinner">
      <img src="svg/tube-spinner.svg">
    </div>
  `;
  recipeContainer.innerHTML = "";
  recipeContainer.insertAdjacentHTML("afterbegin", markup);
};

const showRecipe = async function () {
  try {
    // Render spinner loader
    renderSpinner(recipeContainer);
    //1. Loading recipe
    const response = await fetch(
      `https://forkify-api.herokuapp.com/api/v2/recipes/5ed6604591c37cdc054bcc13`
    );
    const data = await response.json();

    if (!response.ok) throw new Error(`${data.message} (${response.status})`);

    let recipe = data.data.recipe;
    recipe = {
      id: recipe.id,
      title: recipe.title,
      publisher: recipe.publisher,
      sourceUrl: recipe.source_url,
      image: recipe.image_url,
      servings: recipe.servings,
      cookingTime: recipe.cooking_time,
      ingredients: recipe.ingredients,
    };
    console.log(recipe.ingredients);

    const x = recipe.ingredients
      .map((ingredient, i) => {
        return `${i + 1}${ingredient.quantity} ${ingredient.unit} ${
          ingredient.description
        }`;
      })
      .join("/n");

    console.log(x);

    //2. Rendering recipe
    const html = `
    <img src="${recipe.image}">
    <h1 class="recipe__title">${recipe.title}</h1>
    <div class="recipe__information-container">
     <p class="recipe__cookingTime"> <i class="fa fa-clock-o" style="font-size:20px"></i>${
       recipe.cookingTime
     } minutes </p>
     <div class="recipe__servings">
       <p class="recipe__servings"><i class='fa fa-user'></i> ${
         recipe.servings
       }</p>
       <button class="btn__add"><span class="symbol">+</span></button>
       <button class="btn__add"><span class="symbol">-</span></button>
     </div>
     <button class="btn__bookMark"><i class="fa fa-bookmark-o" style="font-size:25px"></i></button>
    </div>

    <div class="recipe-ingredients-container">
       <h1 class="recipe__ingredients">RECIPE INGREDIENTS</h1>
       <div class="recipe__list">
      ${recipe.ingredients
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
         recipe.publisher
       }</strong> Please check out<br> directions at their website.</p>
       <button class="directions__btn href="${
         recipe.sourceUrl
       } target="_blank"">Directions</button>
     </div>
    `;
    recipeContainer.innerHTML = "";
    recipeContainer.insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    console.error(err);
  }
};

showRecipe();
