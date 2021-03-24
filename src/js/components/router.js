import DATA from '../../data/data.json';

import { ThemeColors, DefaultSetupOptions } from '../consts';
import { changeColorTheme } from './color-theme';

const SearchParams = {
  SLIDE: 'slide',
  THEME: 'theme',
  SLIDE_DEFAULT: DefaultSetupOptions.SLIDE_DEFAULT,
  THEME_DEFAULT: DefaultSetupOptions.THEME_DEFAULT,
};

let currentSlide = SearchParams.SLIDE_DEFAULT;
let currentTheme = SearchParams.THEME_DEFAULT;

class Router {
  constructor(renderSlide) {
    this._hash = (
      `/?${SearchParams.SLIDE}=${SearchParams.SLIDE_DEFAULT}&${SearchParams.THEME}=${SearchParams.THEME_DEFAULT}`
    );

    this._renderSlide = renderSlide;
    this._changeColorTheme = changeColorTheme;

    this._onHashChange = this._onHashChange.bind(this);
  }

  init() {
    const [slideAlias, slideData] = Object.values(DATA[`${currentSlide}`]);
    this._renderSlide(slideAlias, slideData);

    window.location.hash = this._hash;
    window.addEventListener('hashchange', this._onHashChange);
  }

  _onHashChange() {
    const hashParam = window.location.hash;

    const slideValue = hashParam.match(/slide=([\w]*)/)[1];
    const themeValue = hashParam.match(/theme=([\w]*)/)[1];

    if (slideValue && themeValue) {
      const isSlideExisting = (slideValue < DATA.length);
      const isThemeExisting = (Object.values(ThemeColors).some((color) => color === themeValue));
      // const isThemeExisting = (themeColors.some((color) => color === themeValue));

      if (isSlideExisting) {
        if (currentSlide !== slideValue) {
          currentSlide = slideValue;

          const [slideAlias, slideData] = Object.values(DATA[`${currentSlide}`]);
          this._renderSlide(slideAlias, slideData);
        }
      }

      if (isThemeExisting) {
        if (currentTheme !== themeValue) {
          currentTheme = themeValue;

          this._changeColorTheme();
        }
      }
    }
  }
}

export { Router };
