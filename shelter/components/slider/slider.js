export function runSlider() {
  const slides = document.querySelectorAll("[data-target='slider-card']");

  slides.forEach((slide, indx) => {
    slide.style.transform = `translateX(${indx * 100}%)`;
  });

  let curSlide = 0;
  const maxSlide = slides.length - 1;
  const rightArrow = document.querySelector("[data-target='arrow-right']");
  const leftArrow = document.querySelector("[data-target='arrow-left']");

  rightArrow.addEventListener("click", () => {
    if (curSlide === maxSlide) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });

  leftArrow.addEventListener("click", () => {
    if (curSlide === 0) {
      curSlide = maxSlide;
    } else {
      curSlide--;
    }

    slides.forEach((slide, indx) => {
      slide.style.transform = `translateX(${100 * (indx - curSlide)}%)`;
    });
  });
}
