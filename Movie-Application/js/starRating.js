export const starHtml = `
  <div class="stars-rating">
    <label class="star">★</label>
    <label class="star">★</label>
    <label class="star">★</label>
    <label class="star">★</label>
    <label class="star">★</label>
    <h3 id="rating-output">Rating is: 0/5</h3>
  </div>
`;

export function starRatingUpdate(movieID) {
  let output = document.querySelector("#rating-output");
  let stars = document.querySelectorAll(".star");

  const storedRating = localStorage.getItem(`rating_${movieID}`);
  if (storedRating) {
    const rating = parseInt(storedRating, 10);
    for (let i = 0; i < rating; i++) {
      stars[i].style.color = "red";
    }
    output.innerText = `Rating is: ${rating}/5`;
  }

  stars.forEach((star, index) => {
    star.addEventListener("click", function () {
      stars.forEach((s) => (s.style.color = "black"));

      for (let i = 0; i <= index; i++) {
        stars[i].style.color = "red";
      }

      const rating = index + 1;
      localStorage.setItem(`rating_${movieID}`, rating);

      output.innerText = `Rating is: ${rating}/5`;
    });
  });
}

//Previous code just for star rating set colors
// function starRatingUpdate() {
//   let output = document.querySelector("#rating-output");
//   let stars = document.querySelectorAll(".star");

//   stars.forEach((star, index) => {
//     star.addEventListener("click", function () {
//       // Reset all stars to default color
//       stars.forEach((s) => (s.style.color = "black"));

//       // Set the color of clicked star and all stars before it
//       for (let i = 0; i <= index; i++) {
//         stars[i].style.color = "red";
//       }
//       if (index + 1 === 1) {
//         output.innerText = "👎 Rating is: " + (index + 1) + "/5";
//       } else if (index + 1 === 2) {
//         output.innerText = "😟 Rating is: " + (index + 1) + "/5";
//       } else if (index + 1 === 3) {
//         output.innerText = "🙂 Rating is: " + (index + 1) + "/5";
//       } else if (index + 1 === 4) {
//         output.innerText = "😆 Rating is: " + (index + 1) + "/5";
//       } else if (index + 1 === 5) {
//         output.innerText = "😍 Rating is: " + (index + 1) + "/5";
//       }
//     });
//   });
// }
