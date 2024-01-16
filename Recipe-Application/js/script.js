import * as model from "./model.js";
import recipeView from "./views/recipeViews.js";
import SearchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import bookmarksView from "./views/bookmarksView.js";

//https://forkify-api.herokuapp.com/v2

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    // console.log(id);

    if (!id) return;

    // Render spinner loader
    recipeView.renderSpinner();

    //1. Loading recipe
    await model.loadRecipe(id);

    //2. Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const constrolSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    //1)Getting search query
    const query = SearchView.getQuery();
    if (!query) return;
    //2) Load search data results
    await model.loadSearchResultus(query);

    //3) Render results
    resultsView.render(model.state.search.results);

    //Visible only 10 results
    // resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.error(err);
  }
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  //Update the recipe view
  recipeView.render(model.state.recipe);
};

const controlAddBookMark = function () {
  //1) add/Remove bookmark
  if (!model.state.recipe.bookmarks) {
    model.addBookMark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }
  //2)Update recipe view
  recipeView.render(model.state.recipe);
  //3)Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const controlBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookMark(controlAddBookMark);
  SearchView.addHandlerSearch(constrolSearchResults);
  bookmarksView.addHandlerRender(controlBookmarks);
};
init();

//open modal
const openAddRecipeModal = document.querySelector(".nav__btn--add-recipe");
const closeAddRecipeModal = document.querySelector(".modal__close--btn");
const addRecipeModal = document.querySelector(".add-recipe-box");
const addRecipeOverlay = document.querySelector(".overlay");

const openModal = function () {
  addRecipeModal.classList.remove("hidden");
  addRecipeOverlay.classList.remove("hidden");
};
const closeModal = function () {
  addRecipeModal.classList.add("hidden");
  addRecipeOverlay.classList.add("hidden");
};

openAddRecipeModal.addEventListener("click", openModal);
closeAddRecipeModal.addEventListener("click", closeModal);

document.body.addEventListener("mousedown", function (e) {
  if (e.target === addRecipeOverlay) {
    closeModal();
  }
});
