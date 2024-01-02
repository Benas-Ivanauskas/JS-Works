"use strict";

//slider
const slides = document.querySelectorAll(".slide");
const slideContainer = document.querySelector(".slider-container");
const leftBtn = document.querySelector(".slider__btn--left");
const rightBtn = document.querySelector(".slider__btn--right");

// slides.forEach((slide, i) => {
//   slide.style.transform = `translateX(${100 * i}%)`;
// });

let currentSlide = 0;
let maxSlide = slides.length;

//Functions
const goToSlide = function (slide) {
  slides.forEach((slides, i) => {
    slides.style.transform = `translateX(${100 * (i - slide)}%)`;
  });
};
goToSlide(0);

// //Events
rightBtn.addEventListener("click", function (e) {
  if (currentSlide === maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }
  goToSlide(currentSlide);
});

leftBtn.addEventListener("click", function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlide(currentSlide);
  } else if (e.key === "ArrowLeft") {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlide(currentSlide);
  }
});

//bugas, kai refreshini page, textas bega i sonus ir neina mygtuku nustumti toliau..Paieskoti problemos
