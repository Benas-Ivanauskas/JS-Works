export const renderLoader = function () {
  const searchContainer = document.querySelector(".search");
  const loaderMarkup = `<div class="loader"></div>`;
  searchContainer.innerHTML = loaderMarkup;

  setTimeout(() => {
    if (searchContainer.innerHTML === loaderMarkup) {
      const errorMessage = `<div><p class="loader-message">⛔⛔🤚 No movies found! Try another movie!</p></div>`;
      searchContainer.innerHTML = errorMessage;
    }
  }, 3000);
};

renderLoader();
