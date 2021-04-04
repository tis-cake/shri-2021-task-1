import { renderMarkup } from '../utils/render';

const head = document.querySelector('head');
const fonts = '<link rel="preconnect" href="https://fonts.gstatic.com"><link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">';
renderMarkup(head, fonts, 'afterbegin');
