const swipeInit = (slider) => {
  const {
    swiperContainer,
    buttonSlidePrev,
    buttonSlideNext,
    toggleNextSlide,
    togglePrevSlide,
  } = slider;

  const images = swiperContainer.querySelectorAll('img');

  images.forEach((image) => {
    image.ondragstart = () => false;
  });

  let xDown = null;
  let yDown = null;

  function onSwipeStart(evt) {
    const isButtonNavigation = (evt.target === buttonSlidePrev || evt.target === buttonSlideNext);
    // const isPeopleLink = (evt.target.tagName === 'A' || evt.target.tagName === 'BUTTON');

    if (isButtonNavigation) {
      return;
    }

    xDown = evt.clientX;
    yDown = evt.clientY;

    swiperContainer.addEventListener('pointermove', onSwipeMove, false);
    swiperContainer.addEventListener('pointerup', onSwipeUp, false);
  }

  function onSwipeMove(evt) {
    const isButtonPrevDisabled = (buttonSlidePrev.getAttribute('disabled'));
    const isButtonNextDisabled = (buttonSlideNext.getAttribute('disabled'));

    if (!xDown || !yDown) {
      return;
    }

    const xUp = evt.clientX;
    const yUp = evt.clientY;

    const xDiff = xDown - xUp;
    const yDiff = yDown - yUp;

    if (Math.abs(xDiff) < Math.abs(yDiff)) {
      if (yDiff > 0 && !isButtonNextDisabled) {
        toggleNextSlide();
      } else if (yDiff < 0 && !isButtonPrevDisabled) {
        togglePrevSlide();
      }
    }

    xDown = null;
    yDown = null;
  }

  function onSwipeUp() {
    swiperContainer.removeEventListener('pointerup', onSwipeUp);
    swiperContainer.removeEventListener('pointermove', onSwipeMove);
  }

  swiperContainer.addEventListener('pointerdown', onSwipeStart, false);
};

export { swipeInit };
