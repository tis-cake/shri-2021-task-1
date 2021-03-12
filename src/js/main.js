import '../less/style.less';
import './polyfills/focus-visible.min';

import { colorThemeInit } from './components/color-theme';
import { sliderInit } from './components/slider';

import { createLeadersTemplate } from './components/view/leaders';

import { renderMarkup } from './utils/render';

import DATA from '../data/data.json';

colorThemeInit();
sliderInit('vote');

const board = document.querySelector('.board');
// const leaders = createLeadersTemplate(DATA[0].data);
// const leaders = createLeadersTemplate(DATA[1].data);
// const leaders = createLeadersTemplate(DATA[3].data);
const leaders = createLeadersTemplate(DATA[5].data);

renderMarkup(board, leaders);
