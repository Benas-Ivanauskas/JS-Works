"use strict";

const btnScrollTo = document.querySelector(".header--btn");
const section1 = document.querySelector("#section--1");

btnScrollTo.addEventListener("click", function (e) {
  // const s1Coords = section1.getBoundingClientRect();
  // console.log(s1Coords);
  section1.scrollIntoView({ behavior: "smooth" });
});
