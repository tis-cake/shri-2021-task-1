const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

const ThemeColors = {
  PRIMARY: 'light',
  SECONDARY: 'dark',
};

const DefaultSetupOptions = {
  SLIDE_DEFAULT: 8,
  THEME_DEFAULT: ThemeColors.PRIMARY,
};

const SELECTED_USER_EMOJI = '👍';

const faviconsPaths = [
  `<link class="favicon" rel="apple-touch-icon" sizes="57x57" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-57x57.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="60x60" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-60x60.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="72x72" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-72x72.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="76x76" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-76x76.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="114x114" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-114x114.pn,g">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="120x120" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-120x120.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="144x144" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-144x144.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="152x152" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-152x152.png">`,
  `<link class="favicon" rel="apple-touch-icon" sizes="180x180" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/apple-icon-180x180.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="192x192"  href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/android-icon-192x192.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="32x32" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/favicon-32x32.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="96x96" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/favicon-96x96.png">`,
  `<link class="favicon" rel="icon" type="image/png" sizes="16x16" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/favicon-16x16.png">`,
  `<link class="favicon" rel="manifest" href="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/manifest.json">`,
  '<meta name="msapplication-TileColor" content="#ffffff">',
  `<meta class="favicon-msapplication" name="msapplication-TileImage" content="assets/favicon/${DefaultSetupOptions.THEME_DEFAULT}/ms-icon-144x144.png">`,
  '<meta name="theme-color" content="#ffffff">',
];

export {
  RenderPosition,
  ThemeColors,
  DefaultSetupOptions,

  SELECTED_USER_EMOJI,

  faviconsPaths,
};
