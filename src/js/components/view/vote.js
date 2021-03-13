import { cropExtension } from '../../utils/common';
import { SELECTED_USER_EMOJI } from '../../consts';

const USER_COUNT_IN_SLIDE = 6;
const MOBILE_DESKTOP_DIFF = 2;

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

const createSlideMarkup = (slides, slideIndex, selectedUserId) => {
  console.log(slides);

  const extraOptions = { slideIndex, selectedUserId };

  const usersMarkup = slides
    .map((el) => {
      return createUserMarkup(el, extraOptions);
    })
    .join('');

  return (
    `
      <div class="vote__swiper-slide">
        <ul class="vote__list people">
          ${usersMarkup}
        </ul>
      </div>
    `
  );
};

const createSlidesMarkup = (data) => {
  const { users, selectedUserId } = data;

  const slidesCount = Math.ceil(users.length / USER_COUNT_IN_SLIDE);
  // const isEqualCountSlides = (users.length % USER_COUNT_IN_SLIDE === 0);

  const slides = [];

  for (let i = 0; i < slidesCount; i++) {
    const prevUserCount = i * USER_COUNT_IN_SLIDE;
    slides[i] = users.slice(prevUserCount, prevUserCount + USER_COUNT_IN_SLIDE);

    if (users.length <= USER_COUNT_IN_SLIDE) {
      break;
    }

    if (slides[i].length === USER_COUNT_IN_SLIDE) {
      const startExtraIndex = (i + 1) * USER_COUNT_IN_SLIDE;
      const endExtraIndex = (i + 1) * USER_COUNT_IN_SLIDE + MOBILE_DESKTOP_DIFF;

      const extraUsers = users.slice(startExtraIndex, endExtraIndex);
      slides[i].push(...extraUsers);
    }
  }

  const slidesMarkup = slides
    .map((el, i) => {
      return createSlideMarkup(el, i, selectedUserId);
    })
    .join('');

  return (
    `
      <div class="vote__swiper-wrapper">
        ${slidesMarkup}
      </div>
    `
  );
};

const createVoteTemplate = (data) => {
  const { title, subtitle } = data;

  const slidesMarkup = createSlidesMarkup(data);

  return (
    `
      <section class="vote container">
        <div class="board__text-wrap vote__text-wrap">
          <h1 class="board__title vote__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle vote__subtitle">
            ${subtitle}
          </h2>
        </div>

        <div class="vote__swiper-container" id="vote-swiper">
          <div class="vote__swiper-wrapper">
            ${slidesMarkup}
          </div>

          <button class="vote__swiper-button-prev button button--prev button--disabled" aria-label="Предыдущий слайд" disabled>
            <svg class="button__icon" width="64" height="64">
              <use xlink:href="assets/images/sprite.svg#button"></use>
            </svg>
          </button>

          <button class="vote__swiper-button-next button button--next" aria-label="Следующий слайд">
            <svg class="button__icon" width="64" height="64">
              <use xlink:href="assets/images/sprite.svg#button"></use>
            </svg>
          </button>
        </div>
      </section>
    `
  );
};

export { createVoteTemplate };
