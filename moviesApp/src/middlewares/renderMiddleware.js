import { render, html } from '../../node_modules/lit-html/lit-html.js';
import { navigationTempalte } from '../views/navigationView.js';

const root = document.querySelector("#root");
const renderFunc = (ctx, templateResult) => { // след което функцията очаква templateResult`а , и ще направи HTML долу.
    let layout = html`
        <nav>
            ${navigationTempalte(ctx)}
        </nav>
        <main>
            ${templateResult}
        </main>
    `;

    render(layout, root)
};

export const renderMiddleware = (ctx, next) => { // закача функция за ctx(контекста) 

    ctx.render = renderFunc.bind(null, ctx); // на която bind'ваме ctx

    next();
}