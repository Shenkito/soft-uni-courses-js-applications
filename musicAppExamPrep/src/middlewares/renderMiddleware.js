import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationView.js';

const headerElement = document.querySelector('.header-navigation');
const contentElement = document.querySelector('#main-content');

const renderContent = (templateResult) => {
    render(templateResult, contentElement);
}

export const renderNavigationMiddleware = (ctx, next) => {
    // TODO: Render navigation

    render(navigationView(ctx), headerElement) // това ще извика navigationView функцията , като ще се закачи за headerElement
    next();
};

export const renderContentMiddleware = (ctx, next) => { // Идеята на това е да закачи функция на контенкста(ctx) която да е на разположения за всички следващи хендлъри като например homeView при app.js
    ctx.render = renderContent;
    next()
}