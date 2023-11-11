import page from '../node_modules/page/page.mjs';

import { addSession } from './middlewares/session.js';
import { addRender } from './middlewares/render.js';

import { logout } from './api/user.js';

import { dashboardPage } from './views/dashboard.js';
import { addPage } from './views/add.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';

// С това като напишем в console на браузъра await api.getRecent() или др , ще ни покаже дали сме взели правилно данните (т.е нещо като тест по време на разработка)
// import * as api from './api/comments.js'; // като искаме да тестваме нещо за user (виж screenshots) и променяме api/нещо.js
// window.api = api;

page(addSession);
page(addRender);

page('/', homePage);
page('/dashboard', dashboardPage);
page('/add', addPage)
page('/login', loginPage);
page('/register', registerPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage);
page('/logout', onLogout);

page.start()

function onLogout(ctx) {
    logout();
    ctx.page.redirect('/');
}