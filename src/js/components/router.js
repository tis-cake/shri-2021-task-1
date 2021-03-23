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
  constructor(renderTemplate) {
    this._hash = (
      `/?${SearchParams.SLIDE}=${SearchParams.SLIDE_DEFAULT}&${SearchParams.THEME}=${SearchParams.THEME_DEFAULT}`
    );

    this._renderTemplate = renderTemplate;
    this._changeColorTheme = changeColorTheme;

    this._onHashChange = this._onHashChange.bind(this);
  }

  init() {
    const [slideAlias, slideData] = Object.values(DATA[`${currentSlide}`]);
    this._renderTemplate(slideAlias, slideData);

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
          this._renderTemplate(slideAlias, slideData);
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

// let slideAlias = Object.values(DATA[`${currentSlide}`])[0];
// let slideData = Object.values(DATA[`${currentSlide}`])[1];
// let [slideAlias, slideData] = Object.values(DATA[`${currentSlide}`]);
// renderTemplate(slideAlias, slideData);

// window.location.hash = (
//   `/?${SearchParams.SLIDE}=${SearchParams.SLIDE_DEFAULT}&${SearchParams.THEME}=${SearchParams.THEME_DEFAULT}`
// );

// window.addEventListener('hashchange', () => {
//   const hashParam = window.location.hash;

//   const slideValue = hashParam.match(/slide=([\w]*)/)[1];
//   const themeValue = hashParam.match(/theme=([\w]*)/)[1];

//   if (slideValue && themeValue) {
//     const isSlideExisting = (slideValue < DATA.length);
//     const isThemeExisting = (Object.values(ThemeColors).some((color) => color === themeValue));
//     // const isThemeExisting = (themeColors.some((color) => color === themeValue));

//     if (isSlideExisting) {
//       if (currentSlide !== slideValue) {
//         currentSlide = slideValue;

//         [slideAlias, slideData] = Object.values(DATA[`${currentSlide}`]);
//         renderTemplate(slideAlias, slideData);
//       }
//     }

//     if (isThemeExisting) {
//       if (currentTheme !== themeValue) {
//         currentTheme = themeValue;

//         changeColorTheme();
//       }
//     }
//   }
// });

// const currentURL = document.location.href;
// const url = new URL(currentURL);
// url.searchParams.set(SearchParams.SLIDE, SearchParams.SLIDE_DEFAULT);
// url.searchParams.set(SearchParams.THEME, SearchParams.THEME_DEFAULT);
// window.history.pushState(null, null, url.href);
