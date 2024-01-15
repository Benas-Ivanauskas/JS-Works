import * as model from "./model.js";
import recipeView from "./views/recipeViews.js";
import SearchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";

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
    // resultsView.render(model.state.search.results);
    resultsView.render(model.getSearchResultsPage());
  } catch (err) {
    console.error(err);
  }
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  SearchView.addHandlerSearch(constrolSearchResults);
};
init();
