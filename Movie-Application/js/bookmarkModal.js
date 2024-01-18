const modal_bookmark = document.querySelector(".modal-bookmarks");
const modal_bookmark_open_btn = document.querySelector(
  ".bookmark-header__button"
);
const modal_bookmark_close_btn = document.querySelector(
  ".modal-bookmarks__close"
);
const overlay = document.querySelector(".overlay-bookmark");

modal_bookmark_open_btn.addEventListener("click", function (e) {
  e.preventDefault();
  modal_bookmark.classList.remove("hidden");
  overlay.classList.remove("hidden");
});

modal_bookmark_close_btn.addEventListener("click", function (e) {
  e.preventDefault();
  modal_bookmark.classList.add("hidden");
  overlay.classList.add("hidden");
});

overlay.addEventListener("click", function (e) {
  if (e.target === overlay) {
    modal_bookmark.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
