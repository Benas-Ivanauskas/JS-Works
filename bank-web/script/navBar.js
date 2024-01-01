"use strict";

const nav = document.querySelector(".nav");
const s1 = document.querySelector("#section--1");

//NavBar Fade animation
nav.addEventListener("mouseover", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((element) => {
      if (element !== link) element.style.opacity = 0.5;
    });
    logo.style.opacity = 0.5;
  }
});

nav.addEventListener("mouseout", function (e) {
  if (e.target.classList.contains("nav__link")) {
    const link = e.target;
    const siblings = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    siblings.forEach((element) => {
      //checking if current element not linked itself
      if (element !== link) element.style.opacity = 1;
    });
    logo.style.opacity = 1;
  }
});

//Navbar page scroll to sections animation

//this method is not the best one, better use event delegation with common parent in which elements we are intrested.
//Try it later with event delegation...
// document.querySelectorAll(".nav__link").forEach((e) => {
//   e.addEventListener("click", function (e) {
//     e.preventDefault();
//     const id = e.target.getAttribute("href");
//     // console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//   });
// });

//Evenet delegation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    // console.log("Link");
    const id = e.target.getAttribute("href");
    // console.log(id);
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

//Navbar when reaches section1 sticky navigation
const s1Height = 100;
const initalCoords = s1.getBoundingClientRect();
// console.log(initalCoords);
window.addEventListener("scroll", function (e) {
  // console.log(window.scrollY);
  if (window.scrollY > initalCoords.top - s1Height) {
    nav.classList.add("sticky");
    nav.style.opacity = 0.85;
  } else nav.classList.remove("sticky");
});
