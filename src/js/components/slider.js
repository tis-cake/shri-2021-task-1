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
    // console.log('В переданном селекторе нет слайдера');
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
  let slideTransitionSignPolarity = -1;
  let swiperHeight = swiperContainer.offsetHeight;

  const setTranslateProperty = () => {
    const translateProperty = `translateY(${slideTransitionSignPolarity * slideIndex * swiperHeight}px)`;
    // const translateProperty = `translate3d(0px, ${slideTransitionSignPolarity * slideIndex * swiperHeight}px, 0px)`;

    swiperWrapper.style.transform = translateProperty;
  };

  document.addEventListener('DOMContentLoaded', () => {
    window.onresize = () => {
      swiperHeight = swiperContainer.offsetHeight;
      slideTransitionSignPolarity = -1;

      console.log(swiperWrapper.style.transform);
      setTranslateProperty();
    };
  });

  const disabledButton = (button) => {
    button.classList.add(buttonDisabledClass);
    button.setAttribute('disabled', true);
  };

  const activeButton = (button) => {
    button.classList.remove(buttonDisabledClass);
    button.removeAttribute('disabled');
  };

  const disabledTabindex = (slideIndexPrev) => {
    const buttons = slides[slideIndexPrev].querySelectorAll('.people__link');
    for (const button of buttons) {
      button.setAttribute('tabindex', -1);
    }
  };

  const activeTabindex = (slideIndexCurrent) => {
    const buttons = slides[slideIndexCurrent].querySelectorAll('.people__link');
    for (const button of buttons) {
      button.setAttribute('tabindex', 0);
    }
  };

  disabledButton(buttonSlidePrev);

  // выходим, если слайд один
  if (slides.length === 1) {
    disabledButton(buttonSlideNext);

    return;
  }

  const changeSlide = () => {
    // console.log(`${slideIndex} сейчас`);

    setTranslateProperty();

    for (const slide of slides) {
      slide.classList.remove(slideActiveClass);
    }

    slides[slideIndex].classList.add(slideActiveClass);
  };

  const onButtonSlidePrevClick = () => {
    disabledTabindex(slideIndex);
    slideIndex--;

    slideTransitionSignPolarity = -1;

    if (slideIndex === 0) {
      disabledButton(buttonSlidePrev);
    }

    if (slideIndex === slides.length - 2) {
      activeButton(buttonSlideNext);
    }

    changeSlide();
    activeTabindex(slideIndex);
  };

  const onButtonSlideNextClick = () => {
    disabledTabindex(slideIndex);
    slideIndex++;

    slideTransitionSignPolarity = -1;

    if (slideIndex === 1) {
      activeButton(buttonSlidePrev);
    }

    if (slideIndex === slides.length - 1) {
      disabledButton(buttonSlideNext);
    }

    changeSlide();
    activeTabindex(slideIndex);
  };

  buttonSlidePrev.addEventListener('click', onButtonSlidePrevClick);
  buttonSlideNext.addEventListener('click', onButtonSlideNextClick);
};

export { sliderInit };
