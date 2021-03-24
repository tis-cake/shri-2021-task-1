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
