import { ThemeColors, DefaultSetupOptions, faviconsPaths } from '../consts';
import { renderMarkup } from '../utils/render';

const defaultClass = `theme_${DefaultSetupOptions.THEME_DEFAULT}`;
const primaryClass = `theme_${ThemeColors.PRIMARY}`;
const secondaryClass = `theme_${ThemeColors.SECONDARY}`;

const head = document.querySelector('head');
const faviconsTemplate = faviconsPaths.join('');
renderMarkup(head, faviconsTemplate);

const body = document.querySelector('body');
body.classList.add(defaultClass);

const favicons = document.querySelectorAll('.favicon');
const faviconMsapplication = document.querySelector('.favicon-msapplication');

let isDefaultTheme = true;

const changeFavicon = () => {
  let oldColor;
  let newColor;

  if (isDefaultTheme) {
    oldColor = `${ThemeColors.PRIMARY}`;
    newColor = `${ThemeColors.SECONDARY}`;
  } else {
    oldColor = `${ThemeColors.SECONDARY}`;
    newColor = `${ThemeColors.PRIMARY}`;
  }

  for (const favicon of favicons) {
    favicon.href = favicon.href.replace(`${oldColor}`, `${newColor}`);
  }

  faviconMsapplication.content = faviconMsapplication.content.replace(`${oldColor}`, `${newColor}`);

  isDefaultTheme = !isDefaultTheme;
};

// проверяем - соответствуют ли фавиконки дефолтной цветовой теме
const isDefaultThemeFavicons = Boolean(favicons[0].href.match(new RegExp(`${DefaultSetupOptions.THEME_DEFAULT}`)));
if (!isDefaultThemeFavicons) {
  isDefaultTheme = false;
  changeFavicon();
}

const changeColorTheme = () => {
  if (isDefaultTheme) {
    body.classList.remove(primaryClass);
    body.classList.add(secondaryClass);
  } else {
    body.classList.remove(secondaryClass);
    body.classList.add(primaryClass);
  }

  changeFavicon();
};

export { changeColorTheme };
