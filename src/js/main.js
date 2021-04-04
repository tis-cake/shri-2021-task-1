import '../less/style.less';
import './polyfills/focus-visible.min';
import './components/fonts';

import { BoardController } from './controllers/board';

new BoardController().init();
