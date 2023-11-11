import page from '../node_modules/page/page.mjs';

import { authMiddleware } from './middlewares/authMiddleware.js';
import { renderNavigationMiddleware, renderContentMiddleware } from './middlewares/renderMiddleware.js';
import { dashboardView } from './views/dashboardView.js';
import { addView } from './views/addView.js';
import { detailsView } from './views/detailsView.js';
import { editView } from './views/editView.js';
import { homeView } from './views/homeView.js';
import { loginView } from './views/loginView.js';
import { logoutView } from './views/logoutView.js';
import { registerView } from './views/registerView.js';
import { deleteView } from './views/deleteView.js';


page(authMiddleware);
page(renderNavigationMiddleware);
page(renderContentMiddleware);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/logout', logoutView);
page('/dashboard', dashboardView);
page('/add', addView);
page('/facts/:factId', detailsView);
page('/facts/:factId/edit', editView);
page('/facts/:factId/delete', deleteView);

page.start();