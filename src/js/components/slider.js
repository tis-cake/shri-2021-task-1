import { swipeInit } from './swipe';

const sliderInit = (classBEM) => {
  const mainSection = document.querySelector(`.${classBEM}`);

  // выходим, если элемент не найден
  if (!mainSection) {
    return;
  }

  const swiperContainer = mainSection.querySelector(`.${classBEM}__swiper-container`);
  const swiperWrapper = mainSection.querySelector(`.${classBEM}__swiper-wrapper`);
  const buttonSlidePrev = mainSection.querySelector(`.${classBEM}__swiper-button-prev`);
  const buttonSlideNext = mainSection.querySelector(`.${classBEM}__swiper-button-next`);

  const slideActiveClass = `${classBEM}__swiper-slide--active`;
  const slideHidingClass = `${classBEM}__swiper-slide--hiding`;
  const buttonDisabledClass = 'button--disabled';
  const slideHiding = mainSection.querySelector(`.${slideHidingClass}`);

  const slides = [...mainSection.querySelectorAll(`.${classBEM}__swiper-slide`)];
  slides[0].classList.add(slideActiveClass);

  let slideIndex = 0;
  let swiperHeight = swiperContainer.offsetHeight;
  // отрицательное значение прячет слайдер вверх
  const slideTransitionSignPolarity = -1;

  const setTranslateProperty = () => {
    const translateProperty = `translateY(${slideTransitionSignPolarity * slideIndex * swiperHeight}px)`;
    swiperWrapper.style.transform = translateProperty;
  };

  // отслеживаем ресайз окна
  // !NB: debounce не добавляю, так как ресайз в
  // инструментах разработчика не важен для пользователя
  document.addEventListener('DOMContentLoaded', () => {
    window.onresize = () => {
      swiperHeight = swiperContainer.offsetHeight;

      changeSlidesBecauseSlideHiding();
      setTranslateProperty();
    };
  });

  // сценарии
  const disableButton = (button) => {
    button.classList.add(buttonDisabledClass);
    button.setAttribute('disabled', 'disabled');
  };

  const activateButton = (button) => {
    button.classList.remove(buttonDisabledClass);
    button.removeAttribute('disabled');
  };

  const disableTabindex = (slideIndexPrev) => {
    const buttons = slides[slideIndexPrev].querySelectorAll('.people__link');
    for (const button of buttons) {
      button.setAttribute('tabindex', -1);
    }
  };

  const activateTabindex = (slideIndexCurrent) => {
    const buttons = slides[slideIndexCurrent].querySelectorAll('.people__link');
    for (const button of buttons) {
      button.setAttribute('tabindex', 0);
    }
  };

  const removeActiveClass = (slideIndexPrev) => {
    slides[slideIndexPrev].classList.remove(slideActiveClass);
  };

  const addActiveClass = (slideIndexCurrent) => {
    slides[slideIndexCurrent].classList.add(slideActiveClass);
  };

  // группируем сценарии
  const doBeforeIndexChange = () => {
    disableTabindex(slideIndex);
    removeActiveClass(slideIndex);
  };

  const doAfterIndexChange = () => {
    activateTabindex(slideIndex);
    addActiveClass(slideIndex);
  };

  const checkIndexForButtonSlidePrev = () => {
    if (slideIndex === 0) {
      disableButton(buttonSlidePrev);
    }

    if (slideIndex === slides.length - 2) {
      activateButton(buttonSlideNext);
    }
  };

  const checkIndexForButtonSlideNext = () => {
    if (slideIndex === 1) {
      activateButton(buttonSlidePrev);
    }

    if (slideIndex === slides.length - 1) {
      disableButton(buttonSlideNext);
    }
  };

  // переключаем слайды
  const togglePrevSlide = () => {
    doBeforeIndexChange();

    slideIndex--;

    checkIndexForButtonSlidePrev();
    setTranslateProperty();
    doAfterIndexChange();
  };

  const toggleNextSlide = () => {
    doBeforeIndexChange();

    slideIndex++;

    checkIndexForButtonSlideNext();
    setTranslateProperty();
    doAfterIndexChange();
  };

  disableButton(buttonSlidePrev);

  // выходим, если слайд один
  if (slides.length === 1) {
    disableButton(buttonSlideNext);

    return;
  }

  buttonSlidePrev.addEventListener('click', togglePrevSlide);
  buttonSlideNext.addEventListener('click', toggleNextSlide);

  // актуально только если количество слайдов на телефоне и десктопе различается
  function changeSlidesBecauseSlideHiding() {
    if (slideHiding) {
      const isHidingSlideInSlides = (slides[slides.length - 1].classList.contains(slideHidingClass));
      const isDisplayNone = (getComputedStyle(slideHiding).display === 'none');

      if (slideHiding.classList.contains(slideActiveClass)) {
        doBeforeIndexChange();
        slideIndex--;
        doAfterIndexChange();
      }

      if (isHidingSlideInSlides && isDisplayNone) {
        // console.log('добавлен в массив и скрыт');
        slides.splice(slides.length - 1, 1);
      }

      if (!isHidingSlideInSlides && !isDisplayNone) {
        // console.log('не добавлен в массив и показан');
        slides.push(slideHiding);
      }

      checkIndexForButtonSlidePrev();
      checkIndexForButtonSlideNext();
    }
  }

  changeSlidesBecauseSlideHiding();

  const sliderOptions = {
    swiperContainer,
    buttonSlidePrev,
    buttonSlideNext,
    toggleNextSlide,
    togglePrevSlide,
  };

  swipeInit(sliderOptions);
};

export { sliderInit };
