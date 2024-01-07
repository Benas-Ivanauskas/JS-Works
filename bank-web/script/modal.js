"use strict";

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const modalOpenBtn = document.querySelectorAll(".modal__open");
const modalCloseBtn = document.querySelector(".modal__close");

const modalOpen = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const modalClose = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

modalOpenBtn.forEach((btn) => btn.addEventListener("click", modalOpen));
for (let i = 0; i < modalOpenBtn.length; i++)
  modalOpenBtn[i].addEventListener("click", modalOpen);
modalCloseBtn.addEventListener("click", modalClose);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    modalClose();
  }
});

document.addEventListener("mousedown", function (e) {
  if (e.target === overlay) {
    modal.classList.add("hidden");
    overlay.classList.add("hidden");
  }
});
