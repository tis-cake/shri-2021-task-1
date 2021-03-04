import '../less/style.less';
import Swiper from './libs/swiper-bundle.min';

const body = document.querySelector('body');
const themeToggle = document.querySelector('.colors-theme-toggle');
const dark = 'theme_dark';
const light = 'theme_light';

themeToggle.addEventListener('click', () => {
  if (body.classList.contains(dark)) {
    body.classList.remove(dark);
    body.classList.add(light);
  } else {
    body.classList.remove(light);
    body.classList.add(dark);
  }
});

let developerSwiper = new Swiper('#developer-swiper', {
  slidesPerView: '1',
  // spaceBetween: 25,
  touchRatio: 1,
  direction: 'vertical',

  navigation: {
    nextEl: '.vote__swiper-button-next',
    prevEl: '.vote__swiper-button-prev',
  },

  // breakpoints: {
  //   756: {
  //     slidesPerView: '4',
  //     spaceBetween: 30,
  //   },
  //   550: {
  //     slidesPerView: '3',
  //     spaceBetween: 30,
  //   },
  // },
});
