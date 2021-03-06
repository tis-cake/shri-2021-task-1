const body = document.querySelector('body');
const themeToggle = body.querySelector('.colors-theme-toggle');
const darkClass = 'theme_dark';
const lightClass = 'theme_light';

const colorThemeInit = () => {
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains(darkClass)) {
      body.classList.remove(darkClass);
      body.classList.add(lightClass);
    } else {
      body.classList.remove(lightClass);
      body.classList.add(darkClass);
    }
  });
};

export { colorThemeInit };
