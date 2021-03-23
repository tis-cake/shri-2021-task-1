import { Leaders } from '../components/view/leaders';
import { Vote } from '../components/view/vote';
import { Chart } from '../components/view/chart';
import { Diagram } from '../components/view/diagram';
import { Activity } from '../components/view/activity';

import { Router } from '../components/router';

import { render, remove } from '../utils/render';

const board = document.querySelector('.board');
let renderedComponent = false;

const SlidesFunctions = {
  activity: (data) => {
    const activityComponent = new Activity(data);
    render(board, activityComponent.getElement());

    renderedComponent = activityComponent;
  },

  chart: (data) => {
    const chartComponent = new Chart(data);
    render(board, chartComponent.getElement());

    renderedComponent = chartComponent;
  },

  diagram: (data) => {
    const diagramComponent = new Diagram(data);
    render(board, diagramComponent.getElement());

    renderedComponent = diagramComponent;
  },

  leaders: (data) => {
    const leadersComponent = new Leaders(data);
    render(board, leadersComponent.getElement());

    renderedComponent = leadersComponent;
  },

  vote: (data) => {
    const voteComponent = new Vote(data);
    render(board, voteComponent.getElement());

    voteComponent.initSlider();
    // const sliderComponent = new Slider(voteComponentElement);
    // sliderComponent.init();

    renderedComponent = voteComponent;
  },
};

const renderTemplate = (alias, data) => {
  if (renderedComponent) {
    remove(renderedComponent);
  }

  const templateFunction = SlidesFunctions[alias];
  templateFunction(data);
};

class BoardController {
  constructor() {
    this._renderTemplate = renderTemplate;
    this._routerComponent = new Router(this._renderTemplate);
  }

  init() {
    this._routerComponent.init();
    window.renderTemplate = this._renderTemplate;
  }
}

export { BoardController };

// const SearchParams = {
//   SLIDE: 'slide',
//   THEME: 'theme',
//   SLIDE_DEFAULT: DefaultSetupOptions.SLIDE_DEFAULT,
//   THEME_DEFAULT: DefaultSetupOptions.THEME_DEFAULT,
// };

// let currentSlide = SearchParams.SLIDE_DEFAULT;
// let currentTheme = SearchParams.THEME_DEFAULT;

// // let slideAlias = Object.values(DATA[`${currentSlide}`])[0];
// // let slideData = Object.values(DATA[`${currentSlide}`])[1];
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
//     // const isThemeExisting = (themeColors.some((color) => color === themeValue));
//     const isThemeExisting = (Object.values(ThemeColors).some((color) => color === themeValue));

//     if (isSlideExisting) {
//       if (currentSlide !== slideValue) {
//         currentSlide = slideValue;

//         [slideAlias, slideData] = Object.values(DATA[`${currentSlide}`]);
//         renderTemplate(slideAlias, slideData);
//       }
//     }

//     if (isThemeExisting) {
//       if (currentTheme !== themeValue) {
//         // console.log(currentTheme, themeValue)

//         currentTheme = themeValue;

//         changeColorTheme();
//       }
//     }
//   }
// });
