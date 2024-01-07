"use strict";

//Lazy loading img
const imgTarget = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target;
      //replace src wtih data-src
      img.src = img.dataset.src;

      // After the image is loaded, remove the "lazy-img"
      img.addEventListener("load", function () {
        img.classList.remove("lazy__img");
        observer.unobserve(img);
      });
    }
  });
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0.5,
  // rootMargin: "-350px",
});

imgTarget.forEach((img) => imgObserver.observe(img));
