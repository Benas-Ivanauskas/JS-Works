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
