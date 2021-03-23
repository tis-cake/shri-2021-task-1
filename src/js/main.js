import '../less/style.less';
import './polyfills/focus-visible.min';

import { BoardController } from './controllers/board';

const boardController = new BoardController();
boardController.init();
