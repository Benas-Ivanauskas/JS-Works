import * as model from "./model.js";
import recipeView from "./views/recipeViews.js";

//https://forkify-api.herokuapp.com/v2

const recipeContainer = document.querySelector(".current-recipe");

//Render spinner loader

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log(id);

    if (!id) return;

    // Render spinner loader
    recipeView.renderSpinner();

    //1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    console.error(err);
  }
};

["hashchange", "load"].forEach((event) =>
  window.addEventListener(event, controlRecipes)
);
// window.addEventListener("hashchange", showRecipe);
// window.addEventListener("load", showRecipe);
