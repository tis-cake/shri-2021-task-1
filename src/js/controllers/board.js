import { Leaders } from '../components/view/leaders';
import { Vote } from '../components/view/vote';
import { Chart } from '../components/view/chart';
import { Diagram } from '../components/view/diagram';
import { Activity } from '../components/view/activity';

import { Router } from '../components/router';

import { render, remove } from '../utils/render';

let board = document.querySelector('.board');
let renderedComponent = false;
let renderedTemplate = false;

const htmlEl = document.querySelector('html');

const SlidesFunctionsTemplate = {
  activity: (data) => new Activity(data).getTemplate(),
  chart: (data) => new Chart(data).getTemplate(),
  diagram: (data) => new Diagram(data).getTemplate(),
  leaders: (data) => new Leaders(data).getTemplate(),
  vote: (data) => new Vote(data).getTemplate(),
};

const renderTemplate = (alias, data) => {
  renderedTemplate = true;

  htmlEl.classList.remove('leaders');
  if (alias === 'leaders') {
    htmlEl.classList.add('leaders');
  }

  const templateFunction = SlidesFunctionsTemplate[alias];
  const templateMarkup = templateFunction(data);

  return (
    `
      <div class="board">
        ${templateMarkup}
      </div>
    `
  );
};

// актуально, если мы рендерим в DOM не разметку, а компонент
const SlidesFunctionsRender = {
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

    renderedComponent = voteComponent;
  },
};

const renderSlide = (alias, data) => {
  if (renderedTemplate) {
    board = document.querySelector('.board');
    board.innerHTML = '';

    renderedTemplate = false;
  }

  if (renderedComponent) {
    remove(renderedComponent);
  }

  const slideRenderFunction = SlidesFunctionsRender[alias];
  slideRenderFunction(data);
};

class BoardController {
  constructor() {
    this._renderSlide = renderSlide;
    this._renderTemplate = renderTemplate;
    this._routerComponent = new Router(this._renderTemplate);
  }

  init() {
    this._routerComponent.init();
    window.renderTemplate = this._renderTemplate;
  }
}

export { BoardController };
