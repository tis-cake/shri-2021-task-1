const body = document.querySelector('body');
const themeToggle = body.querySelector('.colors-theme-toggle');
const darkClass = 'theme_dark';
const lightClass = 'theme_light';

let isDefaultTheme = true;

const favicons = document.querySelectorAll('.favicon');
const faviconMsapplication = document.querySelector('.favicon-msapplication');

const changeFavicon = () => {
  let oldColor;
  let newColor;

  if (isDefaultTheme) {
    oldColor = 'dark';
    newColor = 'light';
  } else {
    oldColor = 'light';
    newColor = 'light';
  }

  for (const favicon of favicons) {
    favicon.href = favicon.href.replace(`${oldColor}`, `${newColor}`);
  }

  faviconMsapplication.content = faviconMsapplication.content.replace(`${oldColor}`, `${newColor}`);

  isDefaultTheme = !isDefaultTheme;
};

const colorThemeInit = () => {
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains(darkClass)) {
      body.classList.remove(darkClass);
      body.classList.add(lightClass);
    } else {
      body.classList.remove(lightClass);
      body.classList.add(darkClass);
    }

    changeFavicon();
  });
};

export { colorThemeInit };
