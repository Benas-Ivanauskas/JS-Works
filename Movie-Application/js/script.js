import { renderLoader } from "./loader.js";
import { API_KEY, URL_SEARCH, URL_CURRENT } from "./congif.js";

const searchContainer = document.querySelector(".search");

const clearContainers = () => {
  searchContainer.innerHTML = "";
  currentMoviesContainer.innerHTML = "";
};

const loadMovies = async function (movie) {
  try {
    const response = await fetch(`${URL_SEARCH}${API_KEY}&s=${movie}`);
    const data = await response.json();
    if (!response.ok)
      throw new Error(`Not working! ${data.Error} ${response.status}`);

    clearContainers();

    if (!data.Search || data.Search.length === 0) {
      // No movies found
      renderLoader();
      return;
    }

    data.Search.map((movie) => {
      const html = `
    
      <a class="movies-link" href="#${movie.imdbID}">
            <div class="search-movies-container">
              <img
                class="search__image"
                src="${movie.Poster}"
                alt="movie-image"
              />
              <div class="search__description">
                <p><strong>${movie.Title}</strong></p>
                <p>Movie type - ${movie.Type}</p>
                <p>Realease - ${movie.Year}y.</p>
              </div>
            </div>
          </a>
      `;

      searchContainer.insertAdjacentHTML("afterbegin", html);
    });
  } catch (err) {
    console.error(err);
    renderLoader();
  }
};

loadMovies("ben");

const searchInput = document.querySelector(".search__input");

function searchMoviesInput() {
  const inputValue = searchInput.value;
  loadMovies(inputValue);
  searchInput.value = "";
}

document.body.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    searchMoviesInput();
  }
});

const searchButton = document.querySelector(".search__button");
searchButton.addEventListener("click", function (e) {
  e.preventDefault();
  const inputValue = searchInput.value;
  loadMovies(inputValue);
  searchInput.value = "";
});

const currentMoviesContainer = document.querySelector(
  ".current-movies-container"
);

const currentMovie = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;
    const response = await fetch(`${URL_CURRENT}${id}&apikey=${API_KEY}`);
    const data = await response.json();
    if (!response.ok) throw new Error(`${data.Error} ${response.status}`);
    const movie = {
      poster: data.Poster,
      title: data.Title,
      genre: data.Genre,
      runtime: data.Runtime,
      year: data.Year,
      writer: data.Writer,
      ID: data.imdbID,
      plot: data.Plot,
      country: data.Country,
    };

    const html = `
          <img
            class="current__image"
            src="${movie.poster}"
            alt="current-movie-image"
          />
          <h1 class="current-movie__title">${movie.title}</h1>
          <div class="current-movie__description">
            <p><strong>Genre</strong>: ${movie.genre}</p>
            <p><strong>Created</strong>: ${movie.country}. <strong>Writer</strong>: ${movie.writer}</p>
            <p><strong>Movie runtime</strong>: ${movie.runtime}</p>
          </div>
          <p class="current-movie__plot">
          <strong>Plot</strong>:
            ${movie.plot}
          </p>
    `;
    currentMoviesContainer.innerHTML = "";
    currentMoviesContainer.insertAdjacentHTML("afterbegin", html);
  } catch (err) {
    console.error(err);
  }
};

currentMovie();

window.addEventListener("hashchange", currentMovie);
window.addEventListener("load", currentMovie);

document.addEventListener("click", function (event) {
  if (event.target.classList.contains("movies-link")) {
    currentMovie();
  }
});
