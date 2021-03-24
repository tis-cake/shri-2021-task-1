import '../less/style.less';
import './polyfills/focus-visible.min';

import { BoardController } from './controllers/board';

new BoardController().init();
