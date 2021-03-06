import '../less/style.less';
import './polyfills/focus-visible.min';

import { colorThemeInit } from './components/color-theme';
import { sliderInit } from './components/slider';
// import { voteSwiper } from './components/slider';

colorThemeInit();
sliderInit('vote');
