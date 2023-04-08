let currentPosition = 0;

export function runSlider() {
  const rightArrow = document.querySelector("[data-target='arrow-right']");
  const leftArrow = document.querySelector("[data-target='arrow-left']");

  rightArrow.addEventListener("click", () => {
    setPosition(currentPosition - getOffsetByScreenWidth());
  });

  leftArrow.addEventListener("click", () => {
    setPosition(currentPosition + getOffsetByScreenWidth());
  });
}

function getOffsetByScreenWidth() {
  const screenWidth = document.body.clientWidth;

  if (screenWidth <= 500) {
    return 100;
  }

  if (screenWidth <= 860) {
    return 200;
  }

  return 300;
}

function setPosition(position) {
  const slides = document.querySelectorAll("[data-target='slider-card']");
  const slidesLength = slides.length - 1;

  if (position > 0) {
    position = -slidesLength * 100;
  }

  if (position < -slidesLength * 100) {
    position = 0;
  }

  currentPosition = position;
  slides.forEach(
    (slide) => (slide.style.transform = `translateX(${position}%)`)
  );
  return currentPosition;
}
