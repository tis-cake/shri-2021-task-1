import { Abstract } from './abstract';

import { cropExtension } from '../../utils/common';

const CHART_MAX_HEIGHT = 70;

const createLeaderMarkup = (leader, index) => {
  const { name, avatar, valueText } = leader;

  const placeNumber = index + 1;

  const avatarCroppedName = cropExtension(avatar);

  return (
    `
      <li class="chart__leader people__item">
        <span class="people__img-wrap">
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
              src="assets/images/1x/person/${avatar}}"
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
      </li>
    `
  );
};

const createListLeadersMarkup = (leaders) => {
  return leaders
    .map((el, i) => createLeaderMarkup(el, i))
    .join('');
};

const createStatMarkup = (stat, maxValue) => {
  const { title, value, active } = stat;

  const activeClass = active
    ? 'chart__stat chart__stat--gold'
    : 'chart__stat';

  const height = `${Math.floor((value * CHART_MAX_HEIGHT) / maxValue)}%`;

  return (
    `
      <li class="${activeClass}" style="height: ${height}">
        <p class="chart__amount-commits subtitle">${title}</p>
        <p class="chart__sprint-number">${value}</p>
      </li>
    `
  );
};

const createListStatsMarkup = (stats) => {
  const statsReverse = [];
  let maxValue = 0;

  for (let i = 0; i < stats.length; i++) {
    if (maxValue < stats[i].value) {
      maxValue = stats[i].value;
    }
    statsReverse[i] = stats[(stats.length - 1) - i];
  }

  return statsReverse
    .map((el) => createStatMarkup(el, maxValue))
    .join('');
};

const createChartTemplate = (data) => {
  const { title, subtitle, values, users } = data;

  const listStatsMarkup = createListStatsMarkup(values);
  const listLeadersMarkup = createListLeadersMarkup(users);

  return (
    `
      <section class="chart container">
        <div class="board__text-wrap chart__text-wrap">
          <h1 class="board__title chart__title title">
            ${title}
          </h1>
          <h2 class="board__subtitle chart__subtitle">
            ${subtitle}
          </h2>
          <ul class="chart__list-stats">
            ${listStatsMarkup}
          </ul>
          <ul class="chart__list-leaders people people--row">
            ${listLeadersMarkup}
          </ul>
        </div>
      </section>
    `
  );
};

class Chart extends Abstract {
  getTemplate() {
    return createChartTemplate(this._data);
  }
}

export { Chart };
