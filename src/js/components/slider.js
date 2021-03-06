// import Swiper, { Navigation } from 'swiper/core';

// // инициализируем кастомные модули
// Swiper.use([Navigation]);

// const voteSwiper = new Swiper('#vote-swiper', {
//   slidesPerView: 1,
//   touchRatio: 1,
//   direction: 'vertical',

//   navigation: {
//     nextEl: '.vote__swiper-button-next',
//     prevEl: '.vote__swiper-button-prev',
//   },
// });

// export { voteSwiper };

// Cамописный слайдер
const sliderInit = (classBEM) => {
  const mainSection = document.querySelector(`.${classBEM}`);

  // выходим, если элемент не найден
  if (!mainSection) {
    // throw new Error('В переданном селекторе нет слайдера');
    return;
  }

  const swiperContainer = mainSection.querySelector(`.${classBEM}__swiper-container`);
  const swiperWrapper = mainSection.querySelector(`.${classBEM}__swiper-wrapper`);
  const buttonSlidePrev = mainSection.querySelector(`.${classBEM}__swiper-button-prev`);
  const buttonSlideNext = mainSection.querySelector(`.${classBEM}__swiper-button-next`);

  const slides = mainSection.querySelectorAll(`.${classBEM}__swiper-slide`);
  const slideActiveClass = `${classBEM}__swiper-slide--active`;
  const buttonDisabledClass = 'button--disabled';
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

      setTranslateProperty();
    };
  });

  // сценарии
  const disableButton = (button) => {
    button.classList.add(buttonDisabledClass);
    button.setAttribute('disabled', true);
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
    setTranslateProperty();
    activateTabindex(slideIndex);
    addActiveClass(slideIndex);
  };

  disableButton(buttonSlidePrev);

  // выходим, если слайд один
  if (slides.length === 1) {
    disableButton(buttonSlideNext);

    return;
  }

  const onButtonSlidePrevClick = () => {
    doBeforeIndexChange();

    slideIndex--;

    if (slideIndex === 0) {
      disableButton(buttonSlidePrev);
    }

    if (slideIndex === slides.length - 2) {
      activateButton(buttonSlideNext);
    }

    doAfterIndexChange();
  };

  const onButtonSlideNextClick = () => {
    doBeforeIndexChange();

    slideIndex++;

    if (slideIndex === 1) {
      activateButton(buttonSlidePrev);
    }

    if (slideIndex === slides.length - 1) {
      disableButton(buttonSlideNext);
    }

    doAfterIndexChange();
  };

  buttonSlidePrev.addEventListener('click', onButtonSlidePrevClick);
  buttonSlideNext.addEventListener('click', onButtonSlideNextClick);
};

export { sliderInit };
