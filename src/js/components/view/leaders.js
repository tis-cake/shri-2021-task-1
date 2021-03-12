// 1) Рендерим не больше 5.
// 2) Если есть выбранный пользователь:
// 2.1) добавить свой emoji;
// 2.2.1) если не попал в лидеры - добавить на 5 место (деск);
// 2.2.2) если не попал в лидеры - добавить в специальное контейнер на 1 месте (моб);

const MAX_USERS_COUNT = 5;
const LAST_INDEX = MAX_USERS_COUNT - 1;

const createUserNotIncludedMarkup = (user, index) => {
  const { name, avatar, valueText } = user;

  const placeNumber = index + 1;

  // for webp
  const avatarSlicedName = avatar.replace(/\.[^/.]+$/, '');

  return (
    `
      <span class="leaders__not-included-wrap people__not-included-wrap">
        <span class="people__img-wrap">
          <span class="people__emoji emoji">👍</span>
          <picture>
            <source
              type="image/webp"
              srcset="assets/images/1x/person/${avatarSlicedName}.webp 1x,
                      assets/images/2x/person/${avatarSlicedName}.webp 2x,
                      assets/images/3x/person/${avatarSlicedName}.webp 3x,
                      assets/images/4x/person/${avatarSlicedName}.webp 4x"
            >

            <img
              class="people__img"
              src="assets/images/1x/person/11.jpg"
              srcset="assets/images/2x/person/${avatar} 2x,
                      assets/images/3x/person/${avatar} 3x,
                      assets/images/4x/person/${avatar} 4x"
              alt="Место №${placeNumber}. ${name}"
            >
          </picture>
        </span>
        <span class="people__name">
          ${name}
        </span>
        <span class="people__commit-count caption">
          ${valueText}
        </span>

        <span class="leaders__stats-value leaders__stats-value--not-included title">
          ${placeNumber}
        </span>
      </span>
    `
  );
};

const createUserMarkup = (user, index, options) => {
  const { name, avatar, valueText } = user;
  const { emoji, selectedUserNotIncluded } = options;
  let { selectedUserIndex } = options;

  const selectedUserEmoji = '👍';
  const placeClassNumber = index + 1;
  let placeNumber = index + 1;

  let userNotIncludedMarkup;

  if (selectedUserNotIncluded) {
    if (index === 0) {
      userNotIncludedMarkup = createUserNotIncludedMarkup(selectedUserNotIncluded, selectedUserIndex);
    }

    if (index === LAST_INDEX) {
      placeNumber = selectedUserIndex + 1;
    }

    selectedUserIndex = LAST_INDEX;
  }

  const isWinnerEmoji = (index === 0) ? emoji : '';
  const isSelectedUserEmoji = (index !== 0 && index === selectedUserIndex) ? selectedUserEmoji : '';

  // for webp
  const avatarSlicedName = avatar.replace(/\.[^/.]+$/, '');

  return (
    `
      <li class="leaders__item leaders__item--${placeClassNumber} people__item">
        <span class="people__img-wrap">
          <span class="people__emoji emoji">${isWinnerEmoji}${isSelectedUserEmoji}</span>
          <picture>
            <source
              type="image/webp"
              srcset="assets/images/1x/person/${avatarSlicedName}.webp 1x,
                      assets/images/2x/person/${avatarSlicedName}.webp 2x,
                      assets/images/3x/person/${avatarSlicedName}.webp 3x,
                      assets/images/4x/person/${avatarSlicedName}.webp 4x"
            >

            <img
              class="people__img"
              src="assets/images/1x/person/${avatar}"
              srcset="assets/images/2x/person/${avatar} 2x,
                      assets/images/3x/person/${avatar} 3x,
                      assets/images/4x/person/${avatar} 4x"
              alt="Место №${placeNumber}. ${name}"
            >
          </picture>
        </span>
        <span class="people__name">
          ${name}
        </span>
        <span class="people__commit-count caption">
          ${valueText}
        </span>
        <p class="leaders__stats">
          <span class="leaders__stats-value title">
            ${placeNumber}
          </span>

          ${userNotIncludedMarkup ? `
            ${userNotIncludedMarkup}
          ` : ''}

        </p>
      </li>
    `
  );
};

const createUsersMarkup = (data) => {
  const { emoji, users, selectedUserId } = data;

  let usersMarkup = users;
  let selectedUserIndex;
  let selectedUserNotIncluded;

  if (selectedUserId !== null && selectedUserId !== undefined) {
    selectedUserIndex = users.findIndex((user) => user.id === selectedUserId);
  }

  if (selectedUserIndex > LAST_INDEX) {
    selectedUserNotIncluded = users[selectedUserIndex];
  }

  if (users.length > MAX_USERS_COUNT) {
    usersMarkup = users.slice(0, MAX_USERS_COUNT);
  }

  if (selectedUserNotIncluded) {
    usersMarkup = usersMarkup.slice(0, LAST_INDEX);
    usersMarkup.push(selectedUserNotIncluded);
  }

  const extraOptions = { emoji, selectedUserIndex, selectedUserNotIncluded };

  return usersMarkup
    .map((el, i) => {
      return createUserMarkup(el, i, extraOptions);
    })
    .join('');
};

const createLeadersTemplate = (data) => {
  const { title, subtitle } = data;

  const usersMarkup = createUsersMarkup(data);

  return (
    `
      <section class="leaders container">
        <div class="board__text-wrap leaders__text-wrap">
          <h1 class="board__title leaders__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle leaders__subtitle">
            ${subtitle}
          </h2>
        </div>

        <ul class="leaders__list people">
          ${usersMarkup}
        </ul>
    `
  );
};

export { createLeadersTemplate };
