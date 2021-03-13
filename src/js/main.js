import '../less/style.less';
import './polyfills/focus-visible.min';

import { colorThemeInit } from './components/color-theme';
import { sliderInit } from './components/slider';

import { createLeadersTemplate } from './components/view/leaders';
import { createVoteTemplate } from './components/view/vote';

import { renderMarkup } from './utils/render';

import DATA from '../data/data.json';

const board = document.querySelector('.board');
// const leaders = createLeadersTemplate(DATA[0].data);
// const leaders = createLeadersTemplate(DATA[1].data);
// const leaders = createLeadersTemplate(DATA[3].data);
// const leaders = createLeadersTemplate(DATA[5].data);
// renderMarkup(board, leaders);

const vote = createVoteTemplate(DATA[2].data);
renderMarkup(board, vote);

colorThemeInit();
sliderInit('vote');
