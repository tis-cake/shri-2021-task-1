import '../less/style.less';

const body = document.querySelector('body');
const themeToggle = document.querySelector('.colors-theme-toggle');
const dark = 'theme_dark';
const light = 'theme_light';

themeToggle.addEventListener('click', () => {
  if (body.classList.contains(dark)) {
    body.classList.remove(dark);
    body.classList.add(light);
  } else {
    body.classList.remove(light);
    body.classList.add(dark);
  }
});
