import { RenderPosition } from '../consts';

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  if (place === RenderPosition.BEFOREBEGIN) { container.before(element); }
  if (place === RenderPosition.AFTERBEGIN) { container.prepend(element); }
  if (place === RenderPosition.BEFOREEND) { container.append(element); }
  if (place === RenderPosition.AFTEREND) { container.after(element); }
};

const renderMarkup = (container, template, place = RenderPosition.BEFOREEND) => {
  container.insertAdjacentHTML(place, template);
};

export { render, renderMarkup };
