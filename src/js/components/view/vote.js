import { Abstract } from './abstract';
import { Slider } from '../slider/slider';

import { cropExtension } from '../../utils/common';
import { SELECTED_USER_EMOJI } from '../../consts';

const USER_COUNT_IN_SLIDE_MOBILE = 8;
const USER_COUNT_IN_SLIDE_DESKTOP = 6;

const sliceUsersIntoSlides = (users, userCountInSlide) => {
  const slides = [];
  const slidesCount = Math.ceil(users.length / userCountInSlide);

  for (let i = 0; i < slidesCount; i++) {
    const prevUserCount = i * userCountInSlide;
    slides[i] = users.slice(prevUserCount, prevUserCount + userCountInSlide);
  }

  return slides;
};

const createUserMarkup = (user, options) => {
  const { id, name, avatar } = user;
  const { slideIndex, selectedUserId } = options;

  const avatarCroppedName = cropExtension(avatar);

  const isSelectedUser = (id === selectedUserId);

  const isSelectedUserEmoji = isSelectedUser
    ? SELECTED_USER_EMOJI
    : '';

  const userClass = isSelectedUser
    ? 'vote__item vote__item--active'
    : 'vote__item';

  const tabindexValue = (slideIndex === 0)
    ? 0
    : -1;

  return (
    `
      <li class="${userClass} people__item">
        <button class="people__link" tabindex="${tabindexValue}">
          <span class="people__img-wrap">
            <span class="people__emoji emoji">${isSelectedUserEmoji}</span>
            <picture>
              <source
                type="image/webp"
                srcset="assets/images/1x/person/${avatarCroppedName}.webp 1x,
                        assets/images/2x/person/${avatarCroppedName}.webp 2x,
                        assets/images/3x/person/${avatarCroppedName}.webp 3x,
                        assets/images/4x/person/${avatarCroppedName}.webp 4x"
              >

              <img
                class="people__img"
                src="assets/images/1x/person/1.jpg"
                srcset="assets/images/2x/person/${avatar} 2x,
                        assets/images/3x/person/${avatar} 3x,
                        assets/images/4x/person/${avatar} 4x"
                alt="${name}"
              >
            </picture>
          </span>
          <span class="people__name">
            ${name}
          </span>
        </button>
      </li>
    `
  );
};

const createSlideMarkup = (minSetSlides, maxSetSlides, slideIndex, selectedUserId) => {
  const extraOptions = { slideIndex, selectedUserId };

  const slideClass = (maxSetSlides)
    ? 'vote__slider-slide slider__slide'
    : 'vote__slider-slide slider__slide--hiding';

  const usersMarkupMinSet = minSetSlides
    .map((el) => createUserMarkup(el, extraOptions))
    .join('');

  let usersMarkupMaxSet = '';

  if (maxSetSlides) {
    usersMarkupMaxSet = maxSetSlides
      .map((el) => createUserMarkup(el, extraOptions))
      .join('');
  }

  return (
    `
      <div class="${slideClass}">
        <ul class="vote__list vote__list--min people">
          ${usersMarkupMinSet}
        </ul>
        <ul class="vote__list vote__list--max people">
          ${usersMarkupMaxSet}
        </ul>
      </div>
    `
  );
};

const createSlidesMarkup = (data) => {
  const { users, selectedUserId, offset } = data;

  if (offset) {
    const offsetEl = users.splice(offset, 1);
    users.unshift(...(offsetEl));
  }

  const slides = [];
  const slidesMobile = sliceUsersIntoSlides(users, USER_COUNT_IN_SLIDE_MOBILE);
  const slidesDesktop = sliceUsersIntoSlides(users, USER_COUNT_IN_SLIDE_DESKTOP);

  let minSetSlides;
  let maxSetSlides;

  if (USER_COUNT_IN_SLIDE_MOBILE < USER_COUNT_IN_SLIDE_DESKTOP) {
    minSetSlides = slidesMobile;
    maxSetSlides = slidesDesktop;
  } else {
    minSetSlides = slidesDesktop;
    maxSetSlides = slidesMobile;
  }

  for (let i = 0; i < minSetSlides.length; i++) {
    slides[i] = createSlideMarkup(minSetSlides[i], maxSetSlides[i], i, selectedUserId);
  }

  return slides.join('');
};

const createVoteTemplate = (data) => {
  const { title, subtitle } = data;

  const slidesMarkup = createSlidesMarkup(data);

  return (
    `
      <section class="vote slider container" id="vote-slider">
        <div class="board__text-wrap vote__text-wrap">
          <h1 class="board__title vote__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle vote__subtitle">
            ${subtitle}
          </h2>
        </div>

        <div class="vote__slider-container slider__container">
          <div class="vote__slider-wrapper slider__wrapper">
            ${slidesMarkup}
          </div>

          <button class="vote__slider-button-prev slider__button-prev button button--prev" aria-label="Предыдущий слайд" disabled>
            <svg class="button__icon" width="64" height="64">
              <use xlink:href="assets/images/sprite.svg#button"></use>
            </svg>
          </button>

          <button class="vote__slider-button-next slider__button-next button button--next" aria-label="Следующий слайд">
            <svg class="button__icon" width="64" height="64">
              <use xlink:href="assets/images/sprite.svg#button"></use>
            </svg>
          </button>
        </div>
      </section>
    `
  );
};

class Vote extends Abstract {
  constructor(data) {
    super(data);

    this._sliderComponent = new Slider(this.getElement());
  }

  getTemplate() {
    return createVoteTemplate(this._data);
  }

  removeElement() {
    super.removeElement();

    this._sliderComponent.destroy();
    this._sliderComponent = null;
  }

  initSlider() {
    this._sliderComponent.init();
  }
}

export { Vote };
