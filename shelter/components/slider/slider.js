let currentPosition = 0;

export function runSlider() {
  const rightArrow = document.querySelector("[data-target='arrow-right']");
  const leftArrow = document.querySelector("[data-target='arrow-left']");

  rightArrow.addEventListener("click", () => {
    setPosition(currentPosition - 100);
  });

  leftArrow.addEventListener("click", () => {
    setPosition(currentPosition + 100);
  });
}

function setPosition(position) {
  const slides = document.querySelectorAll("[data-target='slider-card']");
  const slidesLength = slides.length - 1;

  if (position > 0) {
    return false;
  }

  if (position < -slidesLength * 100) {
    return false;
  }

  currentPosition = position;
  slides.forEach(
    (slide) => (slide.style.transform = `translateX(${position}%)`)
  );
  return currentPosition;
}
